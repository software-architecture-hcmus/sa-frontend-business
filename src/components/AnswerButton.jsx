import clsx from "clsx";

export default function AnswerButton({
  className,
  icon: Icon,
  children,
  ...otherProps
}) {
  return (
    <button
      className={clsx(className)}
      style={{
        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        borderRadius: '0.375rem',
        padding: '1.5rem 1rem',
        textAlign: 'left',
      }}
      {...otherProps}
    >
      <Icon style={{ height: '1.5rem', width: '1.5rem' }} />
      <span style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>{children}</span>
    </button>
  );
}