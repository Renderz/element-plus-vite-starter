import { defineComponent } from 'vue';
import { computed } from 'vue';
import { Layout, Dropdown, Menu, MenuItem } from 'ant-design-vue';
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined } from '@ant-design/icons-vue';
// import { ElHeader, ElIcon, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
// import { Expand, Fold, ArrowDown } from '@element-plus/icons-vue';
import { useLayoutConsumer } from '~/utils/hooks/layout';
import { useAppConsumer } from '~/utils/hooks/app';

const { Header } = Layout;

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
        <Header class="justify-between flex items-center shadow-sm h-10 bg-light-50 border-b-1 border-b-indigo-50">
          <div class="h-10 flex items-center">
            <span onClick={toggle}>
              {fold.value ? <MenuUnfoldOutlined></MenuUnfoldOutlined> : <MenuFoldOutlined></MenuFoldOutlined>}
            </span>
          </div>
          <Dropdown>
            {{
              default: () => (
                <div class="text-black font-medium h-10 flex items-center">
                  用户名
                  <DownOutlined class="ml-2"></DownOutlined>
                </div>
              ),
              overlay: () => (
                <Menu>
                  <MenuItem onClick={logout}>注销</MenuItem>
                </Menu>
              ),
            }}
          </Dropdown>
        </Header>
      );
    };
  },
});

export default NavBar;
