import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FlagContext } from './FlagProvider';
import { flagsToData } from './flagsToData';
import { EMPTY_SELECT_VALUE } from './useFlagGroupSelect';

export const useFlagContext = () => {
  const { defaultFlags, metadata } = useContext(FlagContext);

  const flagRef = useRef(defaultFlags);
  const [flags, baseSetFlags] = useState(defaultFlags);

  const setFlag = useCallback((key: string, value: any) => {
    const newFlags = { ...flagRef.current, [key]: value };
    baseSetFlags(newFlags);
    flagRef.current = newFlags;
  }, []);

  const setFlags = useCallback((partial: Record<string, string>) => {
    const newFlags = { ...flagRef.current, ...partial };
    baseSetFlags(newFlags);
    flagRef.current = newFlags;
  }, []);

  const setRawFlags = useCallback(
    (rawFlags: string) => baseSetFlags(flagsToData(rawFlags, metadata)),
    [metadata]
  );

  return {
    flags,
    setFlag,
    setFlags,
    setRawFlags,
    metadata
  };
};
export const useRawFlags = () => {
  const { flags } = useFlagContext();
  return Object.values(flags)
    .filter((val) => !!val)
    .join(' ');
};

export const useFlagMetadata = (key: string) => {
  const { metadata } = useFlagContext();
  return useMemo(() => metadata[key], [metadata, key]);
};

export const useFlag = (flagKey: string) => {
  const { flags, setFlag } = useFlagContext();

  const metadata = useFlagMetadata(flagKey);
  const flagValue = flags[flagKey] || '';

  if (flagKey !== EMPTY_SELECT_VALUE && flagKey !== '' && !metadata?.flag) {
    console.info(`useFlagContext | id ${flagKey} does not have a flag associated with it.`);
  }

  /** update the value for a primitive flag */
  const setFlagValue = useCallback(
    (value: string | number | null) => {
      if (value === null) {
        return setFlag(flagKey.toString(), '');
      }

      const newFlagValue = value ?? ''; // if this is null/undefined ensure this is trimmed out below
      setFlag(flagKey, ` ${metadata.flag} ${newFlagValue}`.trim());
    },
    [flagKey, metadata?.flag, setFlag]
  );

  return useMemo(() => [flagValue, setFlagValue] as const, [flagValue, setFlagValue]);
};
