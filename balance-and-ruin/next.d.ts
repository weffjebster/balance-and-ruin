import { ReactNode } from 'react';
import type { NextComponentType, NextPageContext, NextLayoutComponentType } from 'next';

declare module 'next' {
  type NextLayoutComponentType<P = Record<string, string>> = NextComponentType<NextPageContext, any, P> & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

declare module 'next/app' {
  type AppLayoutProps<P = Record<string, string>> = AppProps & {
    Component: NextLayoutComponentType;
  };
}
