import clsx from "clsx";

export default function Button({ children, className, ...otherProps }) {
  return (
    <button
      className={clsx(className)}
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '0.375rem',
        backgroundColor: '#007bff',
        padding: '0.5rem 1rem',
        fontSize: '1.125rem',
        fontWeight: '600',
        color: 'white',
      }}
      {...otherProps}
    >
      <span>{children}</span>
    </button>
  );
}