import { useMemo } from 'react';
import { useFlag, useMetadata } from '~/utils/useFlagContext';
import Input from '../Input';
import Slider, { SliderProps } from '../Slider';

type Props = {
  id: string;
  label: string;
} & Partial<SliderProps>;

export const FlagRangeSlider = ({ id, label, ...rest }: Props) => {
  const metadata = useMetadata()[id];
  const defaultValue = [99, 101]; //(metadata.default as number[]) || [99, 101];
  const min = metadata.options?.min_val as number;
  const max = metadata.options?.max_val as number;
  const [value, setValue] = useFlag(id);
  const [flag, minVal, maxVal] = value.split(' ');

  const parsed = useMemo(
    () => [Number.parseInt(minVal) || defaultValue[0], Number.parseInt(maxVal) || defaultValue[1]],
    [min, max]
  );

  return (
    <></>
    // <Slider
    //   label={label}
    //   min={min}
    //   max={max}
    //   value={[40, 60]}
    //   step={1}
    //   // // name={id}
    //   // // onChange={(val) => {
    //   // //   console.log(val);
    //   // //   setValue(`${val}`);
    //   // // }}
    //   // // range
    //   // // value={parsed}
    //   // allowCross={false}
    //   // range
    //   // defaultValue={[20, 40]}
    //   // onChange={(val) => console.log(val)}
    //   // {...rest}
    // />
  );
};
