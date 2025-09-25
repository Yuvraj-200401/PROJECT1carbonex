import { createI18nServer } from 'next-international/server';
 
export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import('./en'),
  hi: () => import('./hi'),
  bn: () => import('./bn'),
  te: () => import('./te'),
  mr: () => import('./mr'),
  ta: () => import('./ta'),
  ur: () => import('./ur'),
  gu: () => import('./gu'),
  kn: () => import('./kn'),
  ml: () => import('./ml'),
  or: () => import('./or'),
});
