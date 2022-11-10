import { useMemo } from 'react';
import Textarea from '~/components/Textarea';
import { useFlagContext, useRawFlags } from '~/utils/useFlagContext';

export const Flags = () => {
  const value = useRawFlags();
  // const { flags, setRawFlags } = useFlagContext();
  // const flagValue = useMemo(() => {
  //   const endVal = Object.values(flags).map(flag => flag.trim()).join(' ');
  //   return endVal;
  // }, [flags]);

  return <Textarea disabled label={''} name={'flags--readonly'} value={value} />;
};
