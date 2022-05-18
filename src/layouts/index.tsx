import { defineComponent } from 'vue';
import { ElContainer } from 'element-plus';
import Sider from './sider/index';
import Header from './header/index';
import Content from './content/index';
import { useLayoutProvider } from '~/utils/hooks/layout';
import { useTabProvider } from '~/utils/hooks/tab';

export default defineComponent({
  name: 'DefaultLayout',
  setup() {
    useLayoutProvider();
    useTabProvider();

    return () => (
      <ElContainer class="h-screen">
        <Sider></Sider>
        <ElContainer direction="vertical">
          <Header></Header>
          <Content></Content>
        </ElContainer>
      </ElContainer>
    );
  },
});
