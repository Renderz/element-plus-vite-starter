import { ElMain, ElScrollbar } from 'element-plus';
import type { VNode } from 'vue';
import { Transition, KeepAlive } from 'vue';
import { RouterView } from 'vue-router';

const Content = () => (
  <ElMain>
    <ElScrollbar>
      <RouterView>
        {(props: Record<'Component', VNode>) => (
          <Transition name="fade-transform" mode="out-in">
            <KeepAlive>{props.Component}</KeepAlive>
          </Transition>
        )}
      </RouterView>
    </ElScrollbar>
  </ElMain>
);

export default Content;
