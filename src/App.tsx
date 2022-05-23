import { defineComponent } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

import Layout from '~/layouts';
import { useAppProvider } from '~/utils/hooks/app';

export default defineComponent({
  name: 'App',
  setup() {
    useAppProvider();

    return () => {
      return (
        <ConfigProvider locale={zhCN}>
          <Layout></Layout>
        </ConfigProvider>
      );
    };
  },
});
