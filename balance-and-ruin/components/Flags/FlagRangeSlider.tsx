import { useMemo } from 'react';
import { useFlag, useMetadata } from '~/utils/useFlagContext';
import Slider, { SliderProps } from '../Slider';
import 'rc-slider/assets/index.css';

type Props = {
  id: string;
  label: string;
} & Partial<SliderProps>;

export const FlagRangeSlider = ({ id, label, ...rest }: Props) => {
  const metadata = useMetadata()[id];
  
  const min = metadata.options?.min_val as number;
  const max = metadata.options?.max_val as number;
  const [rawValue, setRawValue] = useFlag(id);
  const [flag, minVal, maxVal] = rawValue.split(' ');

  const defaultValue = useMemo(() => (metadata.default as number[]) ?? [0, 0], [metadata.default]);
  
  const parsed = useMemo(
    () => {
      const min = Number.isFinite(Number.parseInt(minVal)) ? Number.parseInt(minVal) : defaultValue[0];
      const max = Number.isFinite(Number.parseInt(maxVal)) ? Number.parseInt(maxVal) : defaultValue[1];
      return [min, max];
    }, [minVal, defaultValue, maxVal]
  );

  return (
    <Slider
      label={label}
      max={max}
      min={min}
      name={label}
      onChange={(newVal) => {
        const [min, max]= newVal as number[];
        setRawValue(`${min} ${max}`)
      }}
      range
      step={1}
      value={parsed}
    />
  );
};
