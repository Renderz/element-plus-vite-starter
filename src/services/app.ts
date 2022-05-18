import type { Options } from '~/utils/http';

export const getMe: Options<Me | undefined> = {
  url: '/me',
  method: 'GET',
  isSuccess: (res) => res?.authorities !== undefined,
};

export const getMenu: Options<{
  obj?: {
    limits?: string;
    menus?: MenuItem[];
  };
}> = {
  url: '/services/sys/menus',
  method: 'GET',
};

export const getEnum: Options = {
  url: '/services/enum/query/all',
  method: 'GET',
};
