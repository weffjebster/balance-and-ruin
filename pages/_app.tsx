import { AppLayoutProps } from 'next/app';
import { FlagProvider } from '~/utils/FlagProvider';
import { flagsToData } from '~/utils/flagsToData';
import metadata from '../pages/api/flag-metadata.json';

import '../styles/globals.css';

/** Standard flags */
const DEFAULT_FLAGS =
  '-cg -oa 2.2.2.2.7.7.4.10.10 -ob 30.8.8.1.1.11.8 -sc1 random -sc2 random -sal -eu -fst -brl -slr 1 5 -lmprp 75 125 -lel -srr 3 15 -rnl -rnc -sdr 1 1 -das -dda -dns -com 98989898989898989898989898 -rec1 28 -rec2 23 -xpm 3 -mpm 5 -gpm 5 -nxppd -lsced 2 -hmced 2 -xgced 2 -ase 2 -msl 40 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 1 5 -ebr 68 -emprp 75 125 -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -smc 3 -ieor 33 -ieror 33 -csb 1 32 -mca -stra -saw -sisr 20 -sprp 75 125 -sdm 4 -npi -ccsr 20 -cms -cor -crr -crvr 255 255 -ari -anca -adeh -nfps -nu -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr';

const defaultFlags = flagsToData(DEFAULT_FLAGS, metadata);
const MyApp = ({ Component, pageProps }: AppLayoutProps) => {
  return (
    <main>
      <FlagProvider
        value={{
          defaultFlags,
          metadata
        }}
      >
        <Component {...pageProps} />
      </FlagProvider>
    </main>
  );
};

export default MyApp;
