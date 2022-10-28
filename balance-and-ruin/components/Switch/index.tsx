import { Switch as BaseSwitch } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: (val: boolean) => void;
};

export default function Switch({ checked, disabled = false, label, onChange }: Props) {
  return (
    <BaseSwitch.Group as="div" className="flex items-center">
      <BaseSwitch
        checked={checked}
        disabled={disabled}
        onChange={(checked) => onChange(checked)}
        className={classNames(
          checked ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            checked ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </BaseSwitch>
      <BaseSwitch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </BaseSwitch.Label>
    </BaseSwitch.Group>
  );
}
