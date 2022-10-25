import { useContext, useMemo } from 'react';
import { FlagContext } from './FlagProvider';

export const useFlagContext = () => {
  const { flags, setFlags, metadata } = useContext(FlagContext);

  return {
    flags,
    setFlags,
    metadata
  };
};

export const useMetadata = () => useFlagContext().metadata;

export const useFlag = (flagKey: string) => {
  const { flags, setFlags } = useFlagContext();
  const metadata = useMetadata();
  const flagValue = flags[flagKey] || '';
  const flag = useMemo(() => metadata[flagKey].flag, [flagKey, metadata]);

  const setFlagValue = (value: string | null, id: string = flagKey) => {
    if (value === null) {
      return setFlags({ ...flags, [id]: `` });
    }

    const newFlagValue = value ?? ''; // if this is null/undefined ensure this is trimmed out below
    setFlags({ ...flags, [id]: `${flag} ${newFlagValue}`.trim() });
  };

  return useMemo(() => [flagValue, setFlagValue] as const, [flagValue, setFlagValue]);
};
