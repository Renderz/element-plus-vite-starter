import { defineComponent } from 'vue';

import Navbar from './navbar';
import TabBar from './tabBar';

const DefaultHeader = defineComponent({
  name: 'DefaultHeader',
  setup() {
    return () => (
      <>
        <Navbar></Navbar>
        <TabBar></TabBar>
      </>
    );
  },
});

export default DefaultHeader;
