import Input from '../Input';

type Props = {
  disabled?: boolean;
  name: string;
  label: string;
  onBlur?: (val: string) => void;
  onChange?: (val: string) => void;
  placeholder?: string;
  value: string | null;

  min?: number;
  max?: number;
  step?: number;
};
export default function NumberInput(props: Props) {
  const { max, min, value, ...rest } = props;

  console.log(min, max);
  return (
    <Input
      {...rest}
      min={min?.toString()}
      max={max?.toString()}
      value={value?.toString() ?? ''}
      type="number"
    />
  );
}
