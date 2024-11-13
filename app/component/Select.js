export default function Select({ onChange, className, children, value }) {
  return (
    <select className={className} onChange={onChange} value={value}>
      {children}
    </select>
  );
}
