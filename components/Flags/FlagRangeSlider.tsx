import { useMemo } from 'react';
import { useFlag, useFlagMetadata } from '~/utils/useFlagContext';
import Slider, { SliderProps } from 'rc-slider';
import 'rc-slider/assets/index.css';
import first from 'lodash/first';
import last from 'lodash/last';
import { bindMinMax } from '~/utils/bindMinMax';
import { getNumberSuffix } from '~/utils/getNumberSuffix';

type Props = {
  id: string;
  label?: string;
} & Partial<SliderProps>;

export const FlagRangeSlider = ({ id, label, ...rest }: Props) => {
  const metadata = useFlagMetadata(id);
  const [rawFlag, setRawValue] = useFlag(id);
  const [flag, rawMinVal, rawMaxVal] = rawFlag.split(' ');

  const allowedValues = metadata.allowed_values;

  const defaultValue = useMemo(
    () => (metadata.default as number) ?? first(allowedValues) ?? 0,
    [allowedValues, metadata.default]
  );

  const minBound = (metadata.options?.min_val as number) ?? first(allowedValues) ?? defaultValue;
  const maxBound = (metadata.options?.max_val as number) ?? last(allowedValues) ?? defaultValue;

  const value = [rawMinVal, rawMaxVal].map((val) =>
    bindMinMax(Number.parseFloat(val ?? defaultValue), minBound, maxBound)
  );

  const [minValue, maxValue] = value;
  return (
    <div>
      {label && (
        <label htmlFor={`${id}-input`} className="block text-sm font-medium text-gray-700">
          {label} ({minValue}-{maxValue}){getNumberSuffix(id, metadata.type)}
        </label>
      )}

      <Slider
        max={maxBound}
        min={minBound}
        onChange={(newVal) => {
          const [newMin, newMax] = newVal as number[];
          setRawValue(`${newMin} ${newMax}`);
        }}
        range
        step={1}
        value={value}
      />
    </div>
  );
};
