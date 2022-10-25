import BaseSlider, { SliderProps as BaseSliderProps } from 'rc-slider';
import 'rc-slider/assets/index.css';

export type SliderProps = {
  name: string;
  label: string;
  onChange: (val: number) => void;
  value: number | number[];
} & Partial<BaseSliderProps>;

export default function Slider({ label, name, onChange, value }: SliderProps) {
  return (
    <div>
      <label htmlFor={`${name}-input`} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <BaseSlider min={0} max={100} onChange={onChange as SliderProps['onChange']} value={value} />
    </div>
  );
}
