import { useMemo } from 'react';
import Textarea from '~/components/Textarea';
import { useFlagContext } from '~/utils/useFlagContext';

export const Flags = () => {
  const { flags, setRawFlags } = useFlagContext();
  const flagValue = useMemo(() => {
    const endVal = Object.values(flags).map(flag => flag.trim()).join(' ');
    return endVal;
  }, [flags]);

  const updateFlags = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setRawFlags(event.target.value);
  };
  return <Textarea label={'Flags'} name={'flags--readonly'} onBlur={updateFlags} value={flagValue} />;
};
