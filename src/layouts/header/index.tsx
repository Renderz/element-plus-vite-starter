import { defineComponent } from 'vue';
import Navbar from './navbar';
import TabBar from './tabBar';

const Header = defineComponent({
  name: 'Header',
  setup() {
    return () => (
      <>
        <Navbar></Navbar>
        <TabBar></TabBar>
      </>
    );
  },
});

export default Header;
