import type { VNode } from 'vue';
import { ElSubMenu, ElMenuItemGroup, ElMenuItem, ElIcon } from 'element-plus';
import * as icons from '@element-plus/icons-vue';
import { isArray } from '~/utils/is';

type IconType = typeof icons;
type IconKey = keyof IconType;

export type StandardMenuItem = {
  children?: MenuItemData[];
  hide?: boolean;
  icon?: string;
  title?: string;
  path?: string;
};

export type MenuItemData = StandardMenuItem & {
  [propName: string]: MenuItemData[] | boolean | string | undefined;
};

export type MenuKeyMap = {
  children?: string;
  hide?: string;
  icon?: string;
  title?: string;
  path?: string;
};

/**
 * @description 获取动态图标
 * @param key
 * @returns
 */
const getDynamicIcon = (key?: IconKey) => {
  const dynamicKey = key || 'Location';

  const DynamicIcon = icons[dynamicKey] || icons.Location;

  return (
    <ElIcon>
      <DynamicIcon></DynamicIcon>
    </ElIcon>
  );
};

export class MenuUtils {
  private menuItemData: MenuItemData[];
  private keyMap: MenuKeyMap;
  private withParenPath: boolean;
  private plainMenus: StandardMenuItem[];

  constructor(menuItemData: MenuItemData[], keyMap?: MenuKeyMap, withParenPath?: boolean) {
    this.menuItemData = menuItemData;
    this.keyMap = {
      children: 'children',
      hide: 'hide',
      icon: 'icon',
      title: 'title',
      path: 'path',
      ...keyMap,
    };
    this.withParenPath = withParenPath || false;
    this.plainMenus = [];
  }

  /**
   * @description 渲染方法
   * @param item
   * @returns
   */
  private getSubMenuOrItem(index: string, item: MenuItemData, parentIndex?: string, parentPath?: string): VNode | null {
    const key = `${parentIndex || '__START__'}${index}`;

    const hide = item[this.keyMap.hide!] as boolean | undefined;
    const path = item[this.keyMap.path!] as string | undefined;
    const children = item[this.keyMap.children!] as MenuItemData[] | undefined;
    const title = item[this.keyMap.title!] as string | undefined;
    const iconKey = item[this.keyMap.icon!] as IconKey | undefined;

    const icon = getDynamicIcon(iconKey);
    const notHidedChildren = children?.filter((child) => !child[this.keyMap.hide!]) || [];

    const mergedPath = this.withParenPath ? `${parentPath || ''}${path}` : path;

    this.plainMenus.push({
      title: title,
      path: mergedPath,
      icon: iconKey,
      hide: hide,
    });

    if (hide) {
      return null;
    }

    if (isArray(notHidedChildren) && notHidedChildren.length > 0) {
      const subMenuContent = notHidedChildren.map((item, childIndex) =>
        this.getSubMenuOrItem(String(childIndex), item, key, path),
      );

      return (
        <ElSubMenu
          index={key}
          v-slots={{
            title: () => (
              <>
                {icon}
                <span>{title}</span>
              </>
            ),
          }}
        >
          <ElMenuItemGroup>{subMenuContent}</ElMenuItemGroup>
        </ElSubMenu>
      );
    }

    if (!path) {
      console.warn('menu item must have [path] value!');
      return null;
    }

    return (
      <ElMenuItem
        index={mergedPath}
        v-slots={{
          title: () => <span>{title}</span>,
        }}
      >
        {icon}
      </ElMenuItem>
    );
  }

  /**
   * @description 渲染主进程
   * @returns
   */
  getDom() {
    return this.menuItemData.map((item, index) => this.getSubMenuOrItem(String(index), item, undefined, ''));
  }

  /**
   * @description 获取被平铺的菜单项
   * @returns
   */
  getPlainMenus() {
    return this.plainMenus;
  }
}
