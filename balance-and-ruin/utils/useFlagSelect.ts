import { useMemo } from 'react';
import { SelectOption } from '~/components/Select';
import { useFlagContext } from './useFlagContext';

export const useFlagSelect = (mutuallyExclusiveGroup: string) => {
  const {flags, metadata, metadataByFlag, setFlags} = useFlagContext();

  /** All flags that use this mutually_exclusive_group */
  const rawOptions = useMemo(
    () => Object.values(metadata).filter((z) => z.mutually_exclusive_group === mutuallyExclusiveGroup),
    [metadata, mutuallyExclusiveGroup]
  );

  if (!rawOptions.length) {
    throw new Error(`No options exist for group ${mutuallyExclusiveGroup}`);
  }

  const setValue = (option: SelectOption) => {
    const node = metadata[option.key];
    const defaultvalue = node.default ?? '';
    setFlags({...flags, [mutuallyExclusiveGroup]: `${node.flag} ${defaultvalue}`.trim() })
  };

  const options: SelectOption[] = rawOptions.map((opt) => ({
    description: opt.description,
    key: opt.key,
    label: opt.key
  }));

  const [selectedFlag] = flags[mutuallyExclusiveGroup]?.split(' ') || [];
  const selected = options.find(options => metadataByFlag[selectedFlag]?.key === options.key) ?? options[0];

  return {
    options,
    setValue,
    selected
  };
};
