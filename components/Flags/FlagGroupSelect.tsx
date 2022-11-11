import { getNumberSuffix } from '~/utils/getNumberSuffix';
import { useFlag, useFlagMetadata } from '~/utils/useFlagContext';
import { useFlagGroupSelect } from '~/utils/useFlagGroupSelect';
import Select from '../Select';
import { SmartFlagInput } from './SmartFlagInput';

type Props = {
  label: string;
  /** used to automatically search the metadata and find list of available options. Set to null if manually setting options */
  mutuallyExclusiveGroup: string | null;
  nullable?: boolean;
  /** The option name for the null/none value */
  nullableLabel?: string;
  /** list of flag IDs to show options for.  */
  options?: string[];
};

function getFormattedLabelValue(val1: string, val2: string, suffix: string) {
  if (val1 && val2) {
    return ` (${val1}-${val2}${suffix})`;
  }

  if (val1) {
    return ` (${val1}${suffix})`;
  }

  return '';
}

/**
 * Used when a select should be selecting between multiple potential flags.
 * Depending on the selected option, another input may be rendered below it
 * @returns
 */
export const FlagGroupSelect = ({
  label: baseLabel,
  mutuallyExclusiveGroup,
  nullable = false,
  nullableLabel = 'None',
  options: optionOverrides
}: Props) => {
  const { options, selected, setValue } = useFlagGroupSelect({
    mutuallyExclusiveGroup,
    nullable,
    nullableLabel,
    optionOverrides
  });
  let label = baseLabel;
  const selectedKey = selected?.key || '';
  const selectedMetadata = useFlagMetadata(selectedKey);

  const [rawFlag = ''] = useFlag(selectedKey.toString());
  const [flag, val1 = '', val2 = ''] = rawFlag.split(' ');

  label += getFormattedLabelValue(val1, val2, getNumberSuffix(selectedKey, selectedMetadata?.type || ''));

  return (
    <div className="grid gap-y-2">
      <Select label={label} onChange={setValue} options={options} value={selected || options[0]} />
      {selected && <SmartFlagInput id={selectedKey.toString()} />}
    </div>
  );
};
