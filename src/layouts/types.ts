export type MenuItemData = {
  children?: MenuItemData[];
  hide?: boolean;
  icon?: string;
  title?: string;
  path?: string;
  [propName: string]: MenuItemData[] | boolean | string | undefined;
};

export type MenuKeyMap = {
  children?: string;
  hide?: string;
  icon?: string;
  title?: string;
  path?: string;
};
