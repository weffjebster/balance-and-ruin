import { useMemo } from 'react';
import Textarea from '~/components/Textarea';
import { useFlagContext } from '~/utils/useFlagContext';

type Props = {};

export const Flags = ({}: Props) => {
  const { flags } = useFlagContext();
  const flagValue = useMemo(() => {
    const endVal = Object.values(flags).join(' ');
    return endVal;
  }, [flags]);
  return <Textarea label={'Flags'} name={'flags--readonly'} value={flagValue} />;
};
