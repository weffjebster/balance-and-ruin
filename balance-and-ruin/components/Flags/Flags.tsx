import { useMemo } from 'react';
import Textarea from '~/components/Textarea';
import { useFlagContext } from '~/utils/useFlagContext';

export const Flags = () => {
  const { flags } = useFlagContext();
  const flagValue = useMemo(() => {
    const endVal = Object.values(flags).map(flag => flag.trim()).join(' ');
    return endVal;
  }, [flags]);
  return <Textarea label={'Flags'} name={'flags--readonly'} value={flagValue} />;
};
