import { RawFlagMetadata } from '~/constants/flagMetadata';
import { useFlag } from '~/utils/useFlagContext';
import Input from '../Input';

type Props = {
  metadata: RawFlagMetadata;
};

export const SmartFlagInput = ({ metadata }: Props) => {
  const {
    description,
    flag,
    group,
    key,
    type,
    allowed_values,
    args,
    default: defaultValue,
    mutually_exclusive_group,
    nargs,
    options
  } = metadata;
  return null;
};
