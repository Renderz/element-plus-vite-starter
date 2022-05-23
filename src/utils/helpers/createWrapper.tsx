import type { DefineComponent, ComponentOptionsMixin, EmitsOptions } from 'vue';
import { defineComponent } from 'vue';
import { isFunction } from '~/utils/is';

export type WrapperType = DefineComponent<
  Record<string, any>,
  Record<string, any>,
  Record<string, any>,
  Record<string, any>,
  Record<string, any>,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string
>;

/**
 * @description 通过name生成组件，一般用于keep-alive内，通过路由path生成可被keepAlive.includes识别的组件
 * @param name 组件名
 * @returns
 */
const createWrapper = (name: string) =>
  defineComponent({
    name,
    render() {
      const children = isFunction(this.$slots.default) ? this.$slots.default() : this.$slots.default;

      return <div>{children}</div>;
    },
  });

export default createWrapper;
