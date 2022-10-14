type Props = {
  name: string;
  label: string;
  onChange: (val: string) => void;
  placeholder?: string;
  value: string;
};
export default function Input({ label, name, onChange, placeholder, value }: Props) {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type="text"
          name={name}
          id={`${name}-input`}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  );
}
