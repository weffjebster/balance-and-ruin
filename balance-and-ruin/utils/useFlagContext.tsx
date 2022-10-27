import { useCallback, useContext, useMemo } from 'react';
import { RawFlagMetadata } from '~/constants/flagMetadata';
import { FlagContext } from './FlagProvider';
import { flagsToData } from './flagsToData';

export const useFlagContext = () => {
  const { flags, setFlags, metadata } = useContext(FlagContext);

  const metadataByFlag = useMemo(() => {
    return Object.values(metadata).reduce((acc, val) => {
      acc[val.flag] = val;
      return acc;
    }, {} as Record<string, RawFlagMetadata>);
  }, [metadata])

  const setRawFlags = (rawFlags: string) => setFlags(flagsToData(rawFlags, metadata));

  return {
    flags,
    setFlags,
    setRawFlags,
    metadata,
    metadataByFlag
  };
};

export const useMetadata = () => useFlagContext().metadata;

export const useFlag = (flagKey: string) => {
  const { flags, setFlags } = useFlagContext();
  const metadata = useMetadata();
  const flagValue = flags[flagKey] || '';

  if (!metadata[flagKey]?.flag) {
    throw new Error(`id ${flagKey} does not have a flag associated with it`);
  }

  const flag = useMemo(() => metadata[flagKey].flag, [flagKey, metadata]);

  /** update the value for a primitive flag */
  const setFlagValue = useCallback((value: string | null) => {
    if (value === null) {
      return setFlags({ ...flags, [flagKey]: `` });
    } 

    const newFlagValue = value ?? ''; // if this is null/undefined ensure this is trimmed out below
    setFlags({ ...flags, [flagKey]: `${flag} ${newFlagValue}`.trim() });
  }, [flag, flagKey, flags, setFlags]);

  return useMemo(() => [flagValue, setFlagValue] as const, [flagValue, setFlagValue]);
};
