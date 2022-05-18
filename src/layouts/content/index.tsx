import { ElMain, ElScrollbar, ElBacktop, ElIcon } from 'element-plus';
import { CaretTop } from '@element-plus/icons-vue';
import type { VNode } from 'vue';
import { Transition, defineComponent, KeepAlive } from 'vue';
import classNames from 'classnames';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { RouterView } from 'vue-router';
import { useTabConsumer } from '~/utils/hooks/tab';
import styles from './index.module.scss';
import './fade.scss';

const Content = defineComponent({
  name: 'Content',
  setup() {
    const { Wrapper, tabList } = useTabConsumer()!;

    return {
      Wrapper,
      tabList,
    };
  },
  render() {
    const { Wrapper, tabList } = this;

    return (
      <ElMain class={classNames('overflow-hidden flex-1', styles.main)}>
        <ElScrollbar>
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
          <ElBacktop bottom={15} right={15} target=".el-main>.el-scrollbar>.el-scrollbar__wrap">
            <div>
              <ElIcon>
                <CaretTop></CaretTop>
              </ElIcon>
            </div>
          </ElBacktop>
        </ElScrollbar>
      </ElMain>
    );
  },
});

export default Content;
