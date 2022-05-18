import { computed, defineComponent } from 'vue';
import { ElMenu } from 'element-plus';
import { useRoute } from 'vue-router';
import { useLayoutConsumer } from '~/utils/hooks/layout';
import { useAppConsumer } from '~/utils/hooks/app';
import './index.scss';

const Menu = defineComponent({
  name: 'Menu',
  setup() {
    const { collapse, isSmallerThanTablet } = useLayoutConsumer()!;

    const route = useRoute();
    const app = useAppConsumer();

    const defaultActiveMenu = computed(() => route.path);

    return () => (
      <ElMenu
        collapse={isSmallerThanTablet.value ? false : collapse.value}
        backgroundColor="#001529"
        textColor="#fff"
        activeTextColor="#fff"
        defaultActive={defaultActiveMenu.value}
        router
      >
        {app?.menuDom.value}
      </ElMenu>
    );
  },
});

export default Menu;
