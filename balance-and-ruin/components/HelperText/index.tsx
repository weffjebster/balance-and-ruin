type Props = {
  children: React.ReactNode;
  idPrefix: string;
};
export default function HelperText({ children, idPrefix }: Props) {
  return (
    <p className="mt-2 text-xs text-gray-500" id={`${idPrefix}-helper-text`}>
      {children}
    </p>
  );
}
