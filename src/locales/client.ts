'use client';
import { createI18nClient } from 'next-international/client';

export const { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, useCurrentLocale } = createI18nClient({
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
