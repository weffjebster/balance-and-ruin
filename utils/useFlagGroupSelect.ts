import startCase from 'lodash/startCase';
import { useMemo } from 'react';
import { SelectOption } from '~/components/Select';
import { FlagValues } from './FlagProvider';
import { useFlagContext } from './useFlagContext';

export const EMPTY_SELECT_VALUE = 'none';

type UseFlagSelectProps = {
  mutuallyExclusiveGroup: string | null;
  nullable?: boolean;
  nullableLabel?: string;
  optionOverrides?: string[];
};
export const useFlagGroupSelect = ({
  mutuallyExclusiveGroup,
  nullable,
  nullableLabel,
  optionOverrides
}: UseFlagSelectProps) => {
  const { flags, metadata, setFlags } = useFlagContext();

  /** All flags that use this mutually_exclusive_group */
  const rawOptions = useMemo(() => {
    if (optionOverrides) {
      return optionOverrides.map((option) => metadata[option]);
    }
    return Object.values(metadata).filter((z) => z.mutually_exclusive_group === mutuallyExclusiveGroup);
  }, [metadata, mutuallyExclusiveGroup, optionOverrides]);

  if (!rawOptions.length) {
    throw new Error(`No options exist for group ${mutuallyExclusiveGroup}`);
  }

  const setValue = (option: SelectOption) => {
    const node = metadata[option.key];
    const defaultvalue = node?.default ?? node?.allowed_values?.[0] ?? '';

    const clearedFlagValues = options.reduce((acc, val) => {
      acc[val.key] = '';
      return acc;
    }, {} as FlagValues);

    const newValue =
      option.key === EMPTY_SELECT_VALUE ? {} : { [option.key]: `${node.flag} ${defaultvalue}`.trim() };

    setFlags({
      ...flags,
      ...clearedFlagValues,
      ...newValue
    });
  };

  const options: SelectOption[] = rawOptions.map((opt) => ({
    description: opt.description,
    key: opt.key,
    label: startCase(opt.key)
  }));

  if (nullable) {
    options.unshift({
      key: EMPTY_SELECT_VALUE,
      label: nullableLabel || 'None'
    });
  }

  const selected = options.find(({ key }) => {
    return Boolean(flags[key]);
    // const flag = metadata[key]?.flag;
    // return Boolean(flags[flag]);
  });

  return {
    options,
    setValue,
    selected
  };
};
