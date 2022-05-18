import { defineComponent } from 'vue';
import { computed } from 'vue';
import { ElHeader, ElIcon, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { Expand, Fold, ArrowDown } from '@element-plus/icons-vue';
import { useLayoutConsumer } from '~/utils/hooks/layout';
import { useAppConsumer } from '~/utils/hooks/app';

const NavBar = defineComponent({
  name: 'NavBar',
  setup() {
    const { collapse, visible, isSmallerThanTablet, toggle } = useLayoutConsumer()!;

    const { logout } = useAppConsumer()!;

    /**
     * 小屏修改visible
     * 大屏修改collapse
     */
    const fold = computed(() => (isSmallerThanTablet.value ? visible.value : collapse.value));

    return () => {
      return (
        <ElHeader class="justify-between flex items-center shadow-sm h-10">
          <div>
            <ElIcon onClick={toggle}>{fold.value ? <Expand></Expand> : <Fold></Fold>}</ElIcon>
          </div>
          <div class="flex items-center">
            <ElDropdown
              onCommand={(command: string) => {
                if (command === 'logout') {
                  logout();
                }
              }}
              v-slots={{
                dropdown: () => (
                  <ElDropdownMenu>
                    <ElDropdownItem command="logout">注销</ElDropdownItem>
                  </ElDropdownMenu>
                ),
              }}
            >
              <span class="text-black font-medium">用户名</span>
              <ElIcon class="ml-2">
                <ArrowDown></ArrowDown>
              </ElIcon>
            </ElDropdown>
          </div>
        </ElHeader>
      );
    };
  },
});

export default NavBar;
