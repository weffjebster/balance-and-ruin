import React from 'react';
import { RawFlagMetadata } from '~/constants/flagMetadata';

export type RawFlagValue = string | number | string[] | number[];

/**
 * The current value for a given flag
 *
 * @example
 * -cg
 * -s 12345
 * -csrp 50 150
 */
export type FlagValue = string;

/**
 * Current key-value-pair of the flags. Used for O(1) updates
 * @example
 * {
 *   'Game Mode': '-cg',
 *   'seed': '-s 12345'
 * }
 */
export type FlagValues = Record<string, FlagValue>;

/** Data inside of the context provider */
export type FlagProviderData = {
  flags: FlagValues;
  setFlags: (data: FlagValues) => void;
  metadata: Record<string, RawFlagMetadata>;
};

export const FlagContext = React.createContext<FlagProviderData>({
  flags: {},
  setFlags: () => {},
  metadata: {}
});

export const FlagProvider = FlagContext.Provider;
