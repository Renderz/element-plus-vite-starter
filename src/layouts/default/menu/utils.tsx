import type { VNode } from 'vue';
import { ElSubMenu, ElMenuItemGroup, ElMenuItem, ElIcon } from 'element-plus';
import { Location } from '@element-plus/icons-vue';
import { isArray } from '~/utils/is';
import type { MenuItemData } from '../types';

export class MenuUtils {
  private menuItemData;

  constructor(menuItemData: MenuItemData[]) {
    this.menuItemData = menuItemData;
  }

  getMenuItems(items: MenuItemData[]) {
    return items.filter((item) => !item.hide).map((item) => this.getSubMenuOrItem(item));
  }

  getSubMenuOrItem(item: MenuItemData): VNode {
    if (isArray(item.children)) {
      return (
        <ElSubMenu
          index={item.key || item.path}
          v-slots={{
            title: () => (
              <>
                <ElIcon>
                  <Location></Location>
                </ElIcon>
                <span>{item.title}</span>
              </>
            ),
          }}
        >
          <ElMenuItemGroup>{this.getMenuItems(item.children)}</ElMenuItemGroup>
        </ElSubMenu>
      );
    }

    return (
      <ElMenuItem index={item.key || item.path} v-slots={{ title: () => <span>{item.title}</span> }}>
        <ElIcon>
          <Location></Location>
        </ElIcon>
      </ElMenuItem>
    );
  }

  render() {
    return this.getMenuItems(this.menuItemData);
  }

  // getKey(item: MenuItemData): string {}

  // getTitle() {}

  // getPath() {}

  // getHide() {}

  // getChildren() {}
}
