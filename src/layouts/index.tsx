import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import Sider from './sider/index';
import Header from './header/index';
import Content from './content/index';
import { useLayoutProvider } from '~/utils/hooks/layout';
import { useMenuProvider } from '~/utils/hooks/menu';
import { useTabProvider } from '~/utils/hooks/tab';

export default defineComponent({
  name: 'DefaultLayout',
  setup() {
    useLayoutProvider();
    useMenuProvider();
    useTabProvider();

    return () => (
      // must add hasSider to prevent HMR error
      <Layout class="h-screen" hasSider>
        <Sider></Sider>
        <Layout>
          <Header></Header>
          <Content></Content>
        </Layout>
      </Layout>
    );
  },
});
