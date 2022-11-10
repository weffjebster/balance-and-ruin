import { useMemo } from 'react';
import { useFlag, useFlagMetadata } from '~/utils/useFlagContext';
import Slider from 'rc-slider';
import first from 'lodash/first';
import last from 'lodash/last';
import { bindMinMax } from '~/utils/bindMinMax';
import { getNumberSuffix } from '~/utils/getNumberSuffix';

type Props = {
  id: string;
  label?: string;
};

export const FlagSlider = ({ id, label }: Props) => {
  const metadata = useFlagMetadata(id);

  if (!metadata) {
    throw new Error(`Flag with id ${id} not found`);
  }

  const [rawFlag, setRawValue] = useFlag(id);
  const [flag, rawValue] = rawFlag.split(' ');

  const allowedValues = metadata.allowed_values;

  const defaultValue = useMemo(
    () => (metadata.default as number) ?? first(allowedValues) ?? 0,
    [allowedValues, metadata.default]
  );

  const min = (metadata.options?.min_val as number) ?? first(allowedValues) ?? defaultValue;
  const max = (metadata.options?.max_val as number) ?? last(allowedValues) ?? defaultValue;

  const value = bindMinMax(Number.parseFloat(rawValue ?? defaultValue), min, max);

  let step = 1;

  /** BIG HACK */
  if (metadata.type === 'float') {
    step = 0.5;
  }

  const onChange = (value: number) => {
    setRawValue(value.toString());
  };

  return (
    <div>
      {label && (
        <label htmlFor={`${id}-input`} className="block text-sm font-medium text-gray-700">
          {label} ({value}){getNumberSuffix(id, metadata.args || '')}
        </label>
      )}
      <Slider min={min} max={max} onChange={(val) => onChange(val as number)} step={step} value={value} />
    </div>
  );
};
