import { defineComponent } from 'vue';
import { ElHeader } from 'element-plus';
import Navbar from './navbar';
import { useConsumer } from '../layoutUtils';

const Header = defineComponent({
  setup() {
    const { collapse, visible, isSmallerThanTablet } = useConsumer()!;

    return {
      collapse,
      visible,
      isSmallerThanTablet,
    };
  },
  render() {
    const { collapse, visible, isSmallerThanTablet } = this;

    return (
      <ElHeader class="justify-between">
        <Navbar></Navbar>
      </ElHeader>
    );
  },
});

export default Header;
