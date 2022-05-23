import type { VNode } from 'vue';
import { RouterLink } from 'vue-router';
import { SubMenu, MenuItem } from 'ant-design-vue';
import * as icons from '@ant-design/icons-vue';
import { isArray, isUrl } from '~/utils/is';

type IconType = Omit<
  typeof icons,
  'createFromIconfontCN' | 'defualt' | 'TwoToneColor' | 'setTwoToneColor' | 'getTwoToneColor'
>;

type IconKey = keyof IconType;

export type StandardMenuItem = {
  children?: MenuItemData[];
  hide?: boolean;
  icon?: string;
  title?: string;
  path?: string;
  index?: string;
  fullPath?: string;
  parentPath?: Array<string | undefined>;
  parentIndex?: Array<string>;
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
  const dynamicKey = key || 'QuestionCircleOutlined';

  const DynamicIcon = icons[dynamicKey as IconKey] || icons.QuestionCircleOutlined;

  return <DynamicIcon></DynamicIcon>;
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
  private getSubMenuOrItem(
    index: string,
    item: MenuItemData,
    parentIndex: string[],
    parentPath: Array<string | undefined>,
  ): VNode | null {
    const hide = item[this.keyMap.hide!] as boolean | undefined;
    const path = item[this.keyMap.path!] as string | undefined;
    const children = item[this.keyMap.children!] as MenuItemData[] | undefined;
    const title = item[this.keyMap.title!] as string | undefined;
    const iconKey = item[this.keyMap.icon!] as IconKey | undefined;

    const icon = getDynamicIcon(iconKey);
    const notHidedChildren = children?.filter((child) => !child[this.keyMap.hide!]) || [];

    const mergedParentIndex = [...parentIndex, index];

    const mergedParentPath = [...parentPath, path];
    const fullPath = this.withParenPath ? mergedParentPath.join('') : path;

    this.plainMenus.push({
      title: title,
      path: path,
      icon: iconKey,
      hide: hide,
      fullPath,
      parentPath,
      parentIndex,
      index,
    });

    if (hide) {
      return null;
    }

    if (isArray(notHidedChildren) && notHidedChildren.length > 0) {
      const subMenuContent = notHidedChildren.map((item, childIndex) =>
        this.getSubMenuOrItem(String(childIndex), item, mergedParentIndex, mergedParentPath),
      );

      return (
        <SubMenu key={mergedParentIndex.join('')}>
          {{
            icon: () => icon,
            title: () => title,
            default: () => subMenuContent,
          }}
        </SubMenu>
      );
    }

    if (!path) {
      console.warn('menu item must have [path] value!');
      return null;
    }

    return (
      <MenuItem key={mergedParentIndex.join('')}>
        {{
          icon: () => icon,
          title: () => title,
          default: () => {
            if (isUrl(path)) {
              return <a href={path}>{title}</a>;
            }

            return <RouterLink to={fullPath || '/'}>{title}</RouterLink>;
          },
        }}
      </MenuItem>
    );
  }

  /**
   * @description 渲染主进程
   * @returns
   */
  getDom() {
    return this.menuItemData.map((item, index) => this.getSubMenuOrItem(String(index), item, [], []));
  }

  /**
   * @description 获取被平铺的菜单项
   * @returns
   */
  getPlainMenus() {
    return this.plainMenus;
  }
}
