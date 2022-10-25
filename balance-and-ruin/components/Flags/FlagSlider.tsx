import { useFlag } from '~/utils/useFlagContext';
import Input from '../Input';
import Slider from '../Slider';

type Props = {
  id: string;
  label: string;
};

export const FlagSlider = ({ id, label }: Props) => {
  const [value, setValue] = useFlag(id);
  const [flag, flagValue] = value.split(' ');
  return <Slider label={label} name={id} onChange={(val) => setValue(`${val}`)} value={Number.parseInt(flagValue)} />;
};
