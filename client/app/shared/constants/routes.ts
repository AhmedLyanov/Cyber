export const routes = {
  home: '/',
  about: '/about',
  contact: '/contact',
  blog: '/blog',
  favourites: '/favourites',
  cart: '/cart',
  account: '/account',
  catalog: '/catalog',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register'
} as const;

export type Routes = typeof routes;
export type RouteKey = keyof Routes;