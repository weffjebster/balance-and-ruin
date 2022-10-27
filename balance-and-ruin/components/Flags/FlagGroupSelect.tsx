import { useFlagSelect } from '~/utils/useFlagSelect';
import Select from '../Select';

type Props = {
  mutuallyExclusiveGroup: string;
  label: string;
};

/**
 * Used when a select should be selecting between multiple potential flags. 
 * Depending on the selected option, another input may be rendered below it
 * @returns 
 */
export const FlagGroupSelect = ({ mutuallyExclusiveGroup, label }: Props) => {
  const { options, selected, setValue } = useFlagSelect(mutuallyExclusiveGroup);

  return (
    <div>
      <Select label={label} onChange={setValue} options={options} value={selected} />
    </div>
  );
};
