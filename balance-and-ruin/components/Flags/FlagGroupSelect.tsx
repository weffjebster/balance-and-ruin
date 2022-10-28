import { getNumberSuffix } from '~/utils/getNumberSuffix';
import { useFlag, useMetadata } from '~/utils/useFlagContext';
import { useFlagGroupSelect } from '~/utils/useFlagGroupSelect';
import Select from '../Select';
import { SmartFlagInput } from './SmartFlagInput';

type Props = {
  label: string;
  mutuallyExclusiveGroup: string;
  nullable?: boolean;
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
export const FlagGroupSelect = ({ label: baseLabel, mutuallyExclusiveGroup, nullable = false }: Props) => {
  const { options, selected, setValue } = useFlagGroupSelect(mutuallyExclusiveGroup, nullable);
  let label = baseLabel;
  const selectedKey = selected?.key || '';
  const selectedMetadata = useMetadata()[selectedKey];

  const [rawFlag = ''] = useFlag(selectedKey);
  const [flag, val1 = '', val2 = ''] = rawFlag.split(' ');

  label += getFormattedLabelValue(val1, val2, getNumberSuffix(selectedKey, selectedMetadata?.type || ''));

  return (
    <div className="grid gap-y-2">
      <Select label={label} onChange={setValue} options={options} value={selected || options[0]} />
      {selected && <SmartFlagInput id={selectedKey} />}
    </div>
  );
};
