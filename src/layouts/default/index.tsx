import { defineComponent } from 'vue';
import { ElContainer } from 'element-plus';
import Sider from './sider/index';
import Header from './header/index';
import Content from './content/index';
import { useProvider } from './layoutUtils';

export default defineComponent({
  setup() {
    useProvider();
  },
  render() {
    return (
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
