import { matches } from 'lodash-es';
import { isObject } from '~/utils/is';

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function doubleSideMatched<T>(a: T, b: T): boolean {
  return matches<T>(a)(b) && matches(b)(a);
}

export function pathToCamelCase(str: string) {
  return str.replace(/\/([a-z])/g, function (_all, i) {
    return i.toUpperCase();
  });
}

export function delay<T>(ms: number, result: T) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(result), ms));
}
