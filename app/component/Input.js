export default function InputField({
  type,
  onChange,
  className,
  placeholder,
  min,
  required,
  onInvalid,
  onInput,
  value,
}) {
  return (
    <input
      type={type}
      min={min}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      required={required}
      onInvalid={onInvalid}
      onInput={onInput}
      value={value}
    />
  );
}
