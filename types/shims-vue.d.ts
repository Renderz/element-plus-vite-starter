/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;

  export default component;
}

declare module 'vue' {
  type EventHandler = (...args: any[]) => void;
  interface ComponentCustomProps {
    // should be removed after Vue supported component events typing
    // see: https://github.com/vuejs/vue-next/issues/1553
    //      https://github.com/vuejs/vue-next/issues/3029
    onBlur?: EventHandler;
    onOpen?: EventHandler;
    onEdit?: EventHandler;
    onLoad?: EventHandler;
    onClose?: EventHandler;
    onFocus?: EventHandler;
    onInput?: EventHandler;
    onClick?: EventHandler;
    onPress?: EventHandler;
    onCancel?: EventHandler;
    onChange?: EventHandler;
    onDelete?: EventHandler;
    onScroll?: EventHandler;
    onSubmit?: EventHandler;
    onSelect?: EventHandler;
    onConfirm?: EventHandler;
    onPreview?: EventHandler;
    onKeypress?: EventHandler;
    onTouchend?: EventHandler;
    onTouchmove?: EventHandler;
    onTouchstart?: EventHandler;
    onTouchcancel?: EventHandler;
    onMouseenter?: EventHandler;
    onMouseleave?: EventHandler;
    onMousemove?: EventHandler;
    onKeydown?: EventHandler;
    onKeyup?: EventHandler;
    onDeselect?: EventHandler;
    onClear?: EventHandler;
  }
}

export {};
