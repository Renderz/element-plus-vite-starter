import { defineComponent } from 'vue';
import { ElIcon } from 'element-plus';
import { Expand, Fold } from '@element-plus/icons-vue';
import { useConsumer } from '../layoutUtils';

const Navbar = defineComponent({
  setup() {
    const { collapse, visible, isSmallerThanTablet, toggle } = useConsumer()!;

    return {
      collapse,
      visible,
      isSmallerThanTablet,
      toggle,
    };
  },
  render() {
    const { collapse, visible, isSmallerThanTablet, toggle } = this;

    /**
     * 小屏修改visible
     * 大屏修改collapse
     */
    const fold = isSmallerThanTablet ? visible : collapse;

    return <ElIcon onClick={toggle}>{fold ? <Fold></Fold> : <Expand></Expand>}</ElIcon>;
  },
});

export default Navbar;
