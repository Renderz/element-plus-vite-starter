import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import qs from 'qs';
import { cloneDeep } from 'lodash-es';
import download from 'downloadjs';
import { parse, compile } from 'path-to-regexp';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { AxiosCanceler } from './axiosCancel';
import { ContentTypeEnum, RequestEnum } from './types';
import type { Result, Options, Params } from './types';

// const style =
//   'display: block;width: 100%;height: 100%;opacity: 0.4;filter: alpha(opacity=40);background: #FFF;position: fixed;top: 0;left: 0;z-index: 2000;';

const template =
  '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner" style="top: 50%;right: 50%"><div class="spinner-icon"></div></div>';

NProgress.configure({
  template,
});

export class Requex<T = any> {
  private axiosInstance: AxiosInstance;
  private readonly options: Options;
  private readonly params?: Params;

  constructor(options: Options<T>, params?: Params<T>, customizeInstance?: (instance: AxiosInstance) => void) {
    this.options = options;
    this.params = params;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
    if (typeof customizeInstance === 'function') {
      customizeInstance(this.axiosInstance);
    }
  }

  /**
   * @description 添加默认的interceptors, 比如cancel
   */
  setupInterceptors() {
    const axiosCanceler = new AxiosCanceler();

    this.axiosInstance.interceptors.request.use((config) => {
      axiosCanceler.addPending(config);
      return config;
    });

    this.axiosInstance.interceptors.response.use((res) => {
      res && axiosCanceler.removePending(res.config);
      return res;
    });
  }

  /**
   * @description URL转换逻辑，包括模板替换
   */
  private transformURL(options: Options) {
    let url = options.url || '';
    let data = options.data;
    let domain = '';

    const urlMatch = url?.match(/[a-zA-z]+:\/\/[^/]*/);

    if (urlMatch) {
      [domain] = urlMatch;
      url = url?.slice(domain.length);
    }

    const match = parse(url);
    url = compile(url)(data);
    // only replace pattern when matched
    if (match.length > 1) {
      const cloneData = cloneDeep(data);
      match.forEach((item) => {
        if (item instanceof Object && item.name in cloneData) {
          delete cloneData[item.name];
        }
      });
      data = cloneData;
    }
    url = domain + url;

    options.url = url;
    options.data = data;
  }

  /**
   * @description Data转换逻辑
   */
  private transformData(options: Options) {
    const headers = options.headers;

    if (options.contentType === 'FORM_DATA' && options.method?.toLocaleUpperCase() !== RequestEnum.GET) {
      const formData = new window.FormData();

      if (options.data) {
        Object.keys(options.data).forEach((key) => {
          const value = options.data![key];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              formData.append(key, item);
            });
            return;
          }

          formData.append(key, value);
        });
      }

      options.data = formData;
      options.method = RequestEnum.POST;
    }

    if (
      options.contentType === 'FORM_URLENCODED' &&
      Reflect.has(options, 'data') &&
      options.method?.toUpperCase() !== RequestEnum.GET
    ) {
      options.data = qs.stringify(options.data, { arrayFormat: 'brackets' });
      headers!['content-type'] = ContentTypeEnum.FORM_URLENCODED;
    }

    if (Reflect.has(options, 'data') && options.method?.toUpperCase() === 'GET') {
      options.params = options.data;
      delete options.data;
    }
  }

  /**
   * @description 请求后流程
   */
  private afterResponse<R = T>(res: AxiosResponse<R>, options: Options): Result<R> {
    const { data, status } = res;

    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error('HTTP Request has no return value');
    }

    const isAttachment: boolean = res.headers['content-disposition']?.indexOf('attachment') >= 0;

    const contentType = res.headers?.['Content-Type'] || res.headers?.['content-type'];

    const isHtml: boolean = contentType?.indexOf('text/html') >= 0;

    const ret: Result<R> = {
      success: false,
      data,
      status,
    };

    /**
     * 返回文件下载
     */
    if (isAttachment) {
      const filename = decodeURIComponent(res.headers['content-disposition']?.split('filename=')[1]);
      const contentType = res.headers['content-type'];
      download(data as any, filename, contentType);

      ret.success = true;
      return ret;
    }

    /**
     * 返回页面
     */
    if (isHtml) {
      ret.success = true;
      ret.data = undefined;
      return ret;
    }

    /**
     * 使用外部判断逻辑判断success
     */
    if (typeof options.isSuccess === 'function') {
      const success = options.isSuccess(data);
      ret.success = success;
    }

    return ret;
  }

  /**
   * @description 发送请求
   */
  async request<D = any, R = T>(opts: Options<R, D>, pars?: Params<R, D>): Promise<Result<R>> {
    const options = Object.assign({}, this.options, cloneDeep(opts));
    const params = Object.assign({}, this.params, cloneDeep(pars));

    options.data = options.data || params.extraData;

    this.transformURL(options);
    this.transformData(options);

    try {
      const response = await this.axiosInstance.request<R, AxiosResponse<R>, D>(options);

      const { data } = response;

      if (!data) {
        // return '[HTTP] Request has no return value';
        throw new Error('HTTP Request has no return value');
      }

      const ret = this.afterResponse<R>(response, options);

      if (ret.success && typeof params.onSuccess === 'function') {
        params?.onSuccess(ret.data, ret.status, options);
      } else if (!ret.success && typeof params.onFail === 'function') {
        params?.onFail(ret.data, ret.status, options);
      }

      return ret;
    } catch (e) {
      if (e instanceof axios.Cancel) {
        const status = '(canceled)';

        if (typeof params.onFail === 'function') {
          params?.onFail({}, status, options);
        }

        return {
          success: false,
          status,
        };
      }

      if (axios.isAxiosError(e)) {
        // rewrite error message from axios in here
        const { response } = e as AxiosError<R>;

        if (!response) {
          throw e;
        }

        if (typeof params?.onFail === 'function') {
          params?.onFail(response.data, response.status, options);
        }

        return {
          success: false,
          data: response.data,
          status: response.status,
        };
      }

      throw e;
    }
  }
}
