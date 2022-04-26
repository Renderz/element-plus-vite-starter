import { ElMain, ElScrollbar, ElBacktop, ElIcon } from 'element-plus';
import { CaretTop } from '@element-plus/icons-vue';
import type { VNode } from 'vue';
import { Transition, KeepAlive } from 'vue';
import classNames from 'classnames';
import { RouterView } from 'vue-router';
import styles from './index.module.scss';

const Content = () => (
  <ElMain class={classNames('overflow-hidden flex-1', styles.main)}>
    <ElScrollbar>
      <RouterView>
        {(props: Record<'Component', VNode>) => (
          <Transition name="fade-transform" mode="out-in">
            <KeepAlive>{props.Component}</KeepAlive>
          </Transition>
        )}
      </RouterView>
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

export default Content;
