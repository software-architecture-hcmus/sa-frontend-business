import clsx from "clsx";

export default function Input({ className, ...otherProps }) {
  return (
    <input
      className={clsx(className)}
      style={{
        borderRadius: '0.125rem',
        padding: '0.5rem',
        fontSize: '1.125rem',
        fontWeight: '600',
        outline: '2px solid #d1d5db',
      }}
      {...otherProps}
    />
  );
}