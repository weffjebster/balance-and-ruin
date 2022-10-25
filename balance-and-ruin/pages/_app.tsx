import { AppLayoutProps } from 'next/app';
import { useState } from 'react';
import { FlagProvider, FlagProviderData } from '~/utils/FlagProvider';
import metadata from '../pages/api/flag-metadata.json';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppLayoutProps) => {
  const [flags, setFlags] = useState<FlagProviderData['flags']>({});
  return (
    <FlagProvider
      value={{
        flags,
        setFlags,
        metadata
      }}
    >
      <Component {...pageProps} />
    </FlagProvider>
  );
};

export default MyApp;
