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

const createWrapper = (name: string) =>
  defineComponent({
    name,
    render() {
      const children = isFunction(this.$slots.default) ? this.$slots.default() : this.$slots.default;

      return <div>{children}</div>;
    },
  });

export default createWrapper;
