import { defineComponent } from 'vue';
import { ElAside, ElDrawer, ElScrollbar, ElIcon } from 'element-plus';
import { QuestionFilled } from '@element-plus/icons-vue';
import classNames from 'classnames';
import Menu from '../menu';
import { useConsumer } from '../layoutUtils';
import styles from './index.module.scss';

const Sider = defineComponent({
  setup() {
    const { isSmallerThanTablet, collapse, visible, toggle } = useConsumer()!;

    return {
      isSmallerThanTablet,
      visible,
      collapse,
      toggle,
    };
  },
  render() {
    const { isSmallerThanTablet, visible, collapse, toggle } = this;

    const content = (
      <>
        <div class="flex h-12 flex-center items-center ">
          <ElIcon class="w-8 h-8">
            <QuestionFilled></QuestionFilled>
          </ElIcon>
          {!collapse && <span class="pl-2">Title</span>}
        </div>
        <ElScrollbar>
          <Menu></Menu>
        </ElScrollbar>
      </>
    );

    if (!isSmallerThanTablet) {
      return (
        <ElAside
          class={classNames('flex flex-col transition-width duration-200 shadow', {
            'w-64': !collapse,
            'w-16': collapse,
          })}
        >
          {/* <div class={styles.sider} style={{ width: `${WIDTH - 1}px` }}></div> */}
          {content}
        </ElAside>
      );
    }

    return (
      <ElDrawer
        modelValue={visible}
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
  },
});

export default Sider;
