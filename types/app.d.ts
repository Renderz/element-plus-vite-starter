type Me = {
  authorities: string[];
  principal: {
    account: string;
    userName: string;
  };
};

type MenuItem = {
  menuId: string;
  menuName: string;
  url: string;
  children?: MenuItem[];
};
