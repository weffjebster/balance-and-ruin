import { memo } from 'react';
import { useFlag } from '~/utils/useFlagContext';
import HelperText from '../HelperText';
import Input from '../Input';

type Props = {
  id: string;
  label: string;
  type?: 'text' | 'number';
};

const _FlagInput = ({ id, label, type = 'text' }: Props) => {
  const [mode, setMode] = useFlag(id);
  const [flag, value] = mode.split(' ');
  const description = undefined;
  return (
    <div>
      <Input label={label} name={id} onChange={(val) => setMode(val || null)} type={type} value={value} />
      {description ?? <HelperText idPrefix={id}>{description}</HelperText>}
    </div>
  );
};

export const FlagInput = _FlagInput;
