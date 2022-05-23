import { computed, defineComponent } from 'vue';
import { Menu } from 'ant-design-vue';
import { useLayoutConsumer } from '~/utils/hooks/layout';
import { useMenuConsumer } from '~/utils/hooks/menu';
import { useAppConsumer } from '~/utils/hooks/app';
import './index.less';

const LayoutMenu = defineComponent({
  name: 'LayoutMenu',
  setup() {
    const { collapse } = useLayoutConsumer()!;

    const app = useAppConsumer();
    const menu = useMenuConsumer();

    const menuMode = computed(() => (collapse.value ? 'vertical' : 'inline'));

    return () => (
      <Menu
        mode={menuMode.value}
        theme="dark"
        openKeys={menu?.openKeys.value}
        selectedKeys={menu?.selectedKeys.value}
        onOpenChange={menu?.onOpenChange}
      >
        {app?.menuDom.value}
      </Menu>
    );
  },
});

export default LayoutMenu;
