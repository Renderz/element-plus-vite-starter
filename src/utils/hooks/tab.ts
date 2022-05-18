import { ref, watch, computed, markRaw } from 'vue';
import type { LocationQuery } from 'vue-router';
import { useRouter, useRoute } from 'vue-router';
import queryString from 'query-string';
import { createInjectionState } from '@vueuse/core';
import { pullAt } from 'lodash-es';
import { doubleSideMatched, pathToCamelCase } from '~/utils';
import type { WrapperType } from '~/utils/helpers/createWrapper';
import createWrapper from '~/utils/helpers/createWrapper';
import { useAppConsumer } from '~/utils/hooks/app';

type TabItem = {
  label?: string;
  path: string;
  fullPath: string;
  componentName: string;
  name?: string;
  query?: LocationQuery;
  wrapper: WrapperType;
};

const [useTabProvider, useTabConsumer] = createInjectionState(() => {
  const tabList = ref<TabItem[]>([]);

  const router = useRouter();

  const route = useRoute();

  const app = useAppConsumer();

  const activeKey = computed(() => route.fullPath);

  const Wrapper = computed(() => {
    return tabList.value.find((item) => item.fullPath === route.fullPath)?.wrapper;
  });

  watch(
    () => ({ route, plainMenus: app?.plainMenus.value }),
    (value) => {
      // 监听路由变化
      if (!value?.plainMenus) {
        // 如果还未获取服务器的菜单列表，则不添加
        return;
      }
      if (!router.options.routes.find((r) => r.path === route?.path?.toLowerCase())) {
        // 如果路由不存在于路由表中，不添加
        return;
      }
      if (value.route.path === '/') {
        // 如果是根路由，不添加
        return;
      }
      if (tabList.value?.find((tab) => tab.path === value.route.path && doubleSideMatched(route.query, tab.query))) {
        // 如果路由已存在在列表中，不添加
        return;
      }
      const menu = value.plainMenus?.find((menu) => menu.path === value.route.path);
      if (menu) {
        tabList.value.push({
          label: menu.title,
          path: route.path,
          name: route.matched?.[0].components?.default?.name,
          query: route.query,
          fullPath: route.fullPath,
          componentName: pathToCamelCase(route.fullPath),
          wrapper: markRaw(createWrapper(pathToCamelCase(route.fullPath))),
        });
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  /**
   * 移除tab(同时激活前一个tab)
   * @param key
   */
  const handleTabRemove = (fullpath: string) => {
    const { query, url } = queryString.parseUrl(fullpath);
    const index = tabList.value.findIndex((tab) => tab.path === url && doubleSideMatched(tab.query, query));
    pullAt(tabList.value, index);
    if (index > 0) {
      // 如果删除的不是第一个，则跳转上一个tab
      const newPath = tabList.value[index - 1];
      router.push(newPath.fullPath);
    } else if (tabList.value.length === 0) {
      // 如果删完了之后列表空了
      router.push('/');
    } else {
      // 如果删完以后列表没空，则跳转第一个tab
      const newPath = tabList.value[0];
      router.push(newPath.fullPath);
    }
  };

  const handleTabClick = (key: string) => {
    router.push(key);
  };

  return {
    tabList,
    activeKey,
    Wrapper,
    handleTabRemove,
    handleTabClick,
  };
});

export { useTabProvider };
export { useTabConsumer };
