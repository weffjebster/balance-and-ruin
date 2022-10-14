type Props = {
  label: string;
  name: string;
  onChange: (val: string) => void;
  value: string;
};
export default function Textarea({ label, name, onChange, value }: Props) {
  return (
    <div>
      <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          rows={4}
          name={name}
          id={`${name}-textarea`}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      </div>
    </div>
  );
}
