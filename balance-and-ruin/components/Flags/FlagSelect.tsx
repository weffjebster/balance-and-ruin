import { useMemo } from 'react';
import { useFlag, useFlagContext, useMetadata } from '~/utils/useFlagContext';
import Select, { SelectOption } from '../Select';

type Props = {
  mutuallyExclusiveGroup: string;
  label: string;
};

/**
 *
 * @param key key of mutually exclusive group
 */
const useSelectOptions = (key: string) => {
  const { metadata } = useFlagContext();
  return useMemo(
    () =>
      Object.values(metadata)
        .filter((item) => item.mutually_exclusive_group === key)
        .map(
          (item) =>
            ({
              current: false,
              description: item.description,
              key: item.key,
              label: item.key
            } as SelectOption)
        ),
    [key, metadata]
  );
};

export const FlagSelect = ({ mutuallyExclusiveGroup, label }: Props) => {
  const [flag, setFlagValue] = useFlag(mutuallyExclusiveGroup);
  const metadata = useMetadata();
  const options = useSelectOptions(mutuallyExclusiveGroup);
  const flagValue = options.find((option) => option.key === flag) || options[0];

  const onChange = (option: SelectOption) => {
    const flag = metadata[option.key].flag;
    setFlagValue(flag);
  };

  return (
    <div>
      <Select label={label} onChange={onChange} options={options} value={flagValue} />
    </div>
  );
};
