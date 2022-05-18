import { defineComponent } from 'vue';
import { ElHeader, ElTabs, ElTabPane } from 'element-plus';
import { useTabConsumer } from '~/utils/hooks/tab';
import './index.scss';

const TabBar = defineComponent({
  name: 'TabBar',
  setup() {
    const { tabList, activeKey, handleTabClick, handleTabRemove } = useTabConsumer()!;

    return () => (
      <ElHeader class="p-0 h-10 shadow-sm">
        <ElTabs
          type="border-card"
          closable
          modelValue={activeKey.value}
          onTab-click={(tabpaneContext) => handleTabClick(tabpaneContext.paneName as string)}
          onTab-remove={(value) => handleTabRemove(value as string)}
          class="header-tabs"
        >
          {tabList?.value.map((tab) => {
            return <ElTabPane label={tab.label} name={tab.fullPath}></ElTabPane>;
          })}
        </ElTabs>
      </ElHeader>
    );
  },
});

export default TabBar;
