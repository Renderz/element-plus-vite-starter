import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { createInjectionState } from '@vueuse/core';
import { useAppConsumer } from '~/utils/hooks/app';

/**
 * @description 和menu相关的hooks
 */
const [useMenuProvider, useMenuConsumer] = createInjectionState(() => {
  const { plainMenus } = useAppConsumer()!;

  const route = useRoute();

  const openKeys = ref<string[]>([]);
  const selectedKeys = ref<string[]>();

  watchEffect(() => {
    const menu = plainMenus.value?.find((menu) => menu.fullPath === route.path);

    if (menu) {
      // openKeys可通过route推导，且受控
      // selectedKeys完全通过route推导，不受控
      const parentIndex = [...(menu?.parentIndex || [])];
      openKeys.value = parentIndex;
      selectedKeys.value = [[...parentIndex, menu.index].join('')];
    }
  });

  const onOpenChange = (_openKeys: string[]) => {
    openKeys.value = _openKeys;
  };

  return {
    openKeys,
    selectedKeys,
    onOpenChange,
  };
});

export { useMenuProvider };
export { useMenuConsumer };
