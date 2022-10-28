import { useFlagGroupSelect } from '~/utils/useFlagGroupSelect';
import Select from '../Select';
import { SmartFlagInput } from './SmartFlagInput';

type Props = {
  label: string;
  mutuallyExclusiveGroup: string;
  nullable?: boolean;
};

/**
 * Used when a select should be selecting between multiple potential flags.
 * Depending on the selected option, another input may be rendered below it
 * @returns
 */
export const FlagGroupSelect = ({ label, mutuallyExclusiveGroup, nullable = false }: Props) => {
  const { options, selected, setValue } = useFlagGroupSelect(mutuallyExclusiveGroup, nullable);

  return (
    <div className="grid gap-y-2">
      <Select label={label} onChange={setValue} options={options} value={selected} />
      {selected && <SmartFlagInput id={selected.key} />}
    </div>
  );
};
