import { useFlagMetadata } from '~/utils/useFlagContext';
import { EMPTY_SELECT_VALUE } from '~/utils/useFlagGroupSelect';
import { FlagRangeSlider } from './FlagRangeSlider';
import { FlagSlider } from './FlagSlider';

type Props = {
  id: string;
};

export const SmartFlagInput = ({ id }: Props) => {
  const metadata = useFlagMetadata(id);

  if (id === EMPTY_SELECT_VALUE) {
    return null;
  }
  if (!metadata) {
    throw new Error(`No metadata for flag with key ${id}`);
  }

  const {
    description,
    flag,
    group,
    key,
    type,
    allowed_values,
    args,
    default: defaultValue,
    nargs,
    options
  } = metadata;

  // boolean typed from a select just mean "apply this flag as-is"
  if (type === 'bool') {
    return null;
  }

  if (nargs && nargs > 1 && (options?.min_val || options?.max_val)) {
    return <FlagRangeSlider id={id} />;
  }

  if (type === 'int' || type === 'float') {
    return <FlagSlider id={id} />;
  }

  return null;
};
