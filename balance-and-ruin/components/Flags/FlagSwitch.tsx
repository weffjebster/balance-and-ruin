import { useFlag } from '~/utils/useFlagContext';
import Input from '../Input';
import Switch from '../Switch';

type Props = {
  id: string;
  /** When true, do inverse logic. Flag being off will apply it */
  invert?: boolean;
  label: string;
};

export const FlagSwitch = ({ id, invert, label }: Props) => {
  const [flag, setFlag] = useFlag(id);

  const isChecked = flag !== '' ? true : false;

  const checked = invert ? !isChecked : isChecked;

  const onChange = (checked: boolean) => {
    if (invert) {
      setFlag(checked ? null : '');
    } else {
      setFlag(checked ? '' : null);
    }
  };

  return <Switch checked={checked} label={label} onChange={onChange} />;
};

FlagSwitch.whyDidYouRender = true;
