import Input from '../Input';

type Props = {
  disabled?: boolean;
  name: string;
  label: string;
  onBlur?: (val: number) => void;
  onChange?: (val: number) => void;
  placeholder?: string;
  value: number | undefined;

  min?: number;
  max?: number;
  step?: number;
};

export default function NumberInput(props: Props) {
  const { max, min, onChange, onBlur, value, ...rest } = props;

  return (
    <Input
      min={min}
      max={max}
      onBlur={(val) => onBlur?.(Number.parseInt(val))}
      onChange={(val) => onChange?.(Number.parseInt(val))}
      type="number"
      value={value}
      {...rest}
    />
  );
}
