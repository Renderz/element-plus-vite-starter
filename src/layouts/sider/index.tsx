import { defineComponent } from 'vue';
import { Layout, Drawer } from 'ant-design-vue';
import { ScrollBar } from '~/components/index';
import { QuestionCircleFilled } from '@ant-design/icons-vue';
import classNames from 'classnames';
import Menu from '../menu';
import { useLayoutConsumer } from '~/utils/hooks/layout';
import styles from './index.module.less';

const { Sider } = Layout;

const DefaultSider = defineComponent({
  name: 'DefaultSider',
  setup() {
    const { isSmallerThanTablet, collapse, visible } = useLayoutConsumer()!;

    return () => {
      const content = (
        <>
          <div class={classNames('flex h-12 flex-center items-center', styles['sider-header'])}>
            <span class="w-8 h-8">
              <QuestionCircleFilled></QuestionCircleFilled>
            </span>
            {!collapse.value && <span class="pl-2">Title</span>}
          </div>
          <ScrollBar style={{ height: 'calc(100vh - 3rem)' }}>
            <Menu></Menu>
          </ScrollBar>
        </>
      );

      if (!isSmallerThanTablet.value) {
        return (
          <Sider
            collapsed={collapse.value}
            collapsible
            trigger={null}
            class={classNames('flex flex-col transition-width duration-200 shadow h-screen', styles.sider)}
            width={256}
          >
            {content}
          </Sider>
        );
      }

      return (
        <Drawer closable={false} visible={visible.value} placement="left" bodyStyle={{ padding: 0 }} width={256}>
          {content}
        </Drawer>
      );
    };
  },
});

export default DefaultSider;
