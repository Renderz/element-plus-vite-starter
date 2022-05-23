import { defineComponent } from 'vue';
import { Layout, Tabs } from 'ant-design-vue';
import { useTabConsumer } from '~/utils/hooks/tab';
import './index.less';

const { Header } = Layout;
const { TabPane } = Tabs;

const TabBar = defineComponent({
  name: 'TabBar',
  setup() {
    const { tabList, activeKey, handleTabClick, handleTabRemove } = useTabConsumer()!;

    return () => (
      <Header class="p-0 h-10 bg-light-50 shadow-sm">
        <Tabs
          type="editable-card"
          hideAdd
          activeKey={activeKey.value}
          onChange={(key) => handleTabClick(key)}
          onEdit={(key, action) => {
            if (action === 'remove') {
              handleTabRemove(key);
            }
          }}
          id="header-tabs"
        >
          {tabList.value.map((tab) => (
            <TabPane key={tab.fullPath} tab={tab.label}></TabPane>
          ))}
        </Tabs>
      </Header>
    );
  },
});

export default TabBar;
