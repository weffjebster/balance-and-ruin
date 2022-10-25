import { useFlag } from '~/utils/useFlagContext';
import Input from '../Input';

type Props = {
  id: string;
  label: string;
};

export const FlagInput = ({ id, label }: Props) => {
  const [mode, setMode] = useFlag(id);
  const [flag, value] = mode.split(' ');
  return <Input label={label} name={id} onChange={(val) => setMode(val || null)} value={value} />;
};
