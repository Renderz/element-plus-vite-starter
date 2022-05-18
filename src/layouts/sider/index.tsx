import { defineComponent } from 'vue';
import { ElAside, ElDrawer, ElScrollbar, ElIcon } from 'element-plus';
import { QuestionFilled } from '@element-plus/icons-vue';
import classNames from 'classnames';
import Menu from '../menu';
import { useLayoutConsumer } from '~/utils/hooks/layout';
import styles from './index.module.scss';

const Sider = defineComponent({
  name: 'Sider',
  setup() {
    const { isSmallerThanTablet, collapse, visible, toggle } = useLayoutConsumer()!;

    return () => {
      const content = (
        <>
          <div class={classNames('flex h-12 flex-center items-center', styles['sider-header'])}>
            <ElIcon class="w-8 h-8">
              <QuestionFilled></QuestionFilled>
            </ElIcon>
            {!collapse.value && <span class="pl-2">Title</span>}
          </div>
          <ElScrollbar>
            <Menu></Menu>
          </ElScrollbar>
        </>
      );

      if (!isSmallerThanTablet.value) {
        return (
          <ElAside
            class={classNames(
              'flex flex-col transition-width duration-200 shadow',
              {
                'w-64': !collapse.value,
                'w-16': collapse.value,
              },
              styles.sider,
            )}
          >
            {content}
          </ElAside>
        );
      }

      return (
        <ElDrawer
          modelValue={visible.value}
          onUpdate:modelValue={() => {
            toggle();
          }}
          direction="ltr"
          size={256}
          customClass={styles.drawer}
          showClose={false}
          withHeader={false}
        >
          {content}
        </ElDrawer>
      );
    };
  },
});

export default Sider;
