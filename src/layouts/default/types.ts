export type MenuItemData = {
  children?: MenuItemData[];
  hide?: boolean;
  icon?: string;
  title?: string;
  path: string;
  key?: string;
};

export type MenuKeyMap = {
  children?: string;
  hide?: string;
  icon?: string;
  title?: string;
  path?: string;
  key?: string;
};
