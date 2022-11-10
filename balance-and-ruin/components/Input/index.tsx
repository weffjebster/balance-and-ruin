import React from 'react';

type Props = {
  name: string;
  label: string;
  onBlur?: (val: string) => void;
  onChange?: (val: string) => void;
  placeholder?: string;
} & Omit<Partial<React.HTMLProps<HTMLInputElement>>, 'onChange' | 'onBlur'>;
export default function Input({ label, name, onBlur, onChange, placeholder, value, ...rest }: Props) {
  return (
    <div>
      <label htmlFor={`${name}-input`} className="block text-sm text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          autoComplete="off"
          type="text"
          name={name}
          id={`${name}-input`}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onBlur={(e) => onBlur?.(e.target.value)}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          value={value ?? ''}
          {...rest}
        />
      </div>
    </div>
  );
}
