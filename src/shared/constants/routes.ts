export enum Routes {
  BASE = '/',
  LOGIN = '/login',
  LOGIN_LANGUAGE = '/:lang/login',
  HOME = '/',
  HOME_LANGUAGE = '/:lang/',
  USERS = '/users',
  USERS_LANGUAGE = '/:lang/users',
  USER_FORM = '/users/form',
  USER_FORM_LANGUAGE = '/:lang/users/form',
  USER_FORM_DATA = '/users/form/:id',
  USER_FORM_DATA_LANGUAGE = '/:lang/users/form/:id',
  PAGES = '/pages',
  PAGES_LANGUAGE = '/:lang/pages',
  NOT_FOUND = '*',
}

export type TNavigationRoutes = Routes.HOME | Routes.USERS | Routes.PAGES;

export const RoutesToLabels: Record<TNavigationRoutes, string> = {
  [Routes.HOME]: 'home',
  [Routes.USERS]: 'users',
  [Routes.PAGES]: 'pages',
};

export const RoutesToMenuItemKey: Record<TNavigationRoutes, string> &
  Partial<Record<Routes, string>> = {
  [Routes.HOME]: Routes.HOME,
  [Routes.USERS]: Routes.USERS,
  [Routes.USER_FORM]: Routes.USERS,
  [Routes.PAGES]: Routes.PAGES,
};

export const routesOrder = [Routes.HOME, Routes.USERS, Routes.PAGES] as const;
