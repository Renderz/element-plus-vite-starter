import type { VNode } from 'vue';
import { Transition, defineComponent, KeepAlive, ref, onMounted } from 'vue';
import { Layout, BackTop } from 'ant-design-vue';
import { throttle } from 'lodash-es';

// import BackTop from '../../../../../github/ant-design-vue/components/back-top';

import classNames from 'classnames';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { RouterView } from 'vue-router';
import { ScrollBar } from '~/components/index';
import { useTabConsumer } from '~/utils/hooks/tab';
import './fade.less';

const { Content } = Layout;

const DefaultContent = defineComponent({
  name: 'DefaultContent',
  setup() {
    const { Wrapper, tabList } = useTabConsumer()!;
    const visible = ref<boolean>(false);

    // TODO: backtop暂时有问题
    onMounted(() => {
      const ele = document.querySelector('main.ant-layout-content>.el-scrollbar>.el-scrollbar__wrap') as HTMLDivElement;

      ele?.addEventListener(
        'scroll',
        throttle((e) => {
          const scrollTop = e.target.scrollTop;

          if (scrollTop > 400) {
            visible.value = true;
          } else {
            visible.value = false;
          }
        }, 500),
      );
    });

    return {
      Wrapper,
      tabList,
      visible,
    };
  },
  render() {
    const { Wrapper, tabList, visible } = this;

    return (
      <Content class={classNames('overflow-hidden flex-1 p-3')}>
        <ScrollBar>
          <RouterView
            v-slots={{
              default: (props: { Component: VNode; route: RouteLocationNormalizedLoaded }) => {
                return (
                  <Transition name="fade-transform" mode="out-in">
                    <KeepAlive include={tabList.map((tab) => tab.componentName)}>
                      {/**
                       * Wrapper组件是通过tab里fullpath动态生成的组件
                       * 如果不存在tab里的组件，不会被keep-alive缓存
                       */}
                      {Wrapper ? <Wrapper>{props.Component}</Wrapper> : props.Component}
                    </KeepAlive>
                  </Transition>
                );
              },
            }}
          ></RouterView>
          <BackTop
            style={visible ? { display: 'block' } : { display: 'none' }}
            visibilityHeight={400}
            target={() =>
              document.querySelector('main.ant-layout-content>.el-scrollbar>.el-scrollbar__wrap') as HTMLElement
            }
          ></BackTop>
        </ScrollBar>
      </Content>
    );
  },
});

export default DefaultContent;
