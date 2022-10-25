import { useFlag } from '~/utils/useFlagContext';
import Input from '../Input';
import Switch from '../Switch';

type Props = {
  id: string;
  label: string;
};

export const FlagSwitch = ({ id, label }: Props) => {
  const [flag, setFlag] = useFlag(id);

  return <Switch checked={!!flag} label={label} onChange={(checked) => setFlag(checked ? '' : null)} />;
};
