import { useMemo } from 'react';
import { useFlag, useMetadata } from '~/utils/useFlagContext';
import NumberInput from '../NumberInput';
import Slider from '../Slider';
import first from 'lodash/first';
import last from 'lodash/last';

type Props = {
  id: string;
  label?: string;
};

export const FlagSlider = ({ id, label }: Props) => {
  const metadata = useMetadata()[id];

  const [rawValue, setRawValue] = useFlag(id);
  const [flag, value] = rawValue.split(' ');

  const defaultValue = useMemo(() => (metadata.default as number) ?? 0, [metadata.default]);

  const allowedValues = metadata.allowed_values;
  const min = (metadata.options?.min_val as number) ?? first(allowedValues) ?? defaultValue;
  const max = (metadata.options?.max_val as number) ?? last(allowedValues) ?? defaultValue;
  let step = 0.5;
  if ((Number.isInteger(min) && Number.isInteger(max)) || allowedValues?.every(Number.isInteger)) {
    step = 1;
  }

  const onChange = (val: string) => {
    const parsed = Number.parseInt(val);
    setRawValue((parsed < min ? min : parsed > max ? max : parsed).toString());
  };

  return (
    <div>
      <Slider
        label={label}
        name={id}
        min={min}
        max={max}
        onChange={(val) => setRawValue(`${val}`)}
        step={step}
        value={Number.isFinite(Number.parseInt(value)) ? Number.parseInt(value) : min}
      />
      <NumberInput
        label=""
        name={`${id}-input`}
        onChange={(val) => setRawValue(val)}
        onBlur={onChange}
        min={min}
        max={max}
        step={step}
        value={value || min.toString()}
      />
    </div>
  );
};
