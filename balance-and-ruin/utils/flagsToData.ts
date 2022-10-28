import { RawFlagMetadata } from '~/constants/flagMetadata';
import { FlagValues } from './FlagProvider';

export const flagsToData = (rawFlags: string, metadata: Record<string, RawFlagMetadata>): FlagValues => {
  const flags = rawFlags
    .split('-')
    .filter((flag) => flag)
    .map((flag) => `-${flag.trim()}`);

  // [ ['open_world', metadata] ]
  const vals = Object.entries(metadata);

  return flags.reduce((acc, flagWithValue) => {
    const [id, meta] =
      vals.find(([id, meta]) => {
        const isBool = flagWithValue === meta.flag;
        const flagInValue = flagWithValue.startsWith(`${meta.flag} `);
        return isBool || flagInValue;
      }) || [];

    if (!id) {
      throw new Error(`No object key could be determined for the ${id} flag`);
    }

    acc[id] = flagWithValue;
    return acc;
  }, {} as FlagValues);
};
