import { useFlag, useMetadata } from '~/utils/useFlagContext';
import Select, { SelectOption } from '../Select';
import startCase from 'lodash/startCase';
import { EMPTY_SELECT_VALUE } from '~/utils/useFlagGroupSelect';

type Props = {
  id: string;
  label: string;
  /** if "nullable" default value will be null/empty, and the first selection will be "None" */
  nullable?: boolean;
};

/**
 * Used when a select should be selecting between multiple potential flags.
 * Depending on the selected option, another input may be rendered below it
 * @returns
 */
export const FlagSelect = ({ id, nullable = false, label }: Props) => {
  const [flag, setFlagValue] = useFlag(id);
  const [flagName, value] = flag.split(' ');
  const metadata = useMetadata();
  const meta = metadata[id];
  const rawOptions = meta.allowed_values || [];

  const options: SelectOption[] = rawOptions
    .filter((z) => !!z)
    .map((opt) => ({
      key: opt as string,
      label: startCase(opt as string)
    }));

  if (nullable) {
    options.unshift({
      key: EMPTY_SELECT_VALUE,
      label: 'None'
    });
  }

  const selected = options.find((z) => z.key === value) ?? options[0];

  return (
    <div>
      <Select
        label={label}
        onChange={(elected) => setFlagValue(elected.key === EMPTY_SELECT_VALUE ? null : elected.key)}
        options={options}
        value={selected}
      />
    </div>
  );
};
