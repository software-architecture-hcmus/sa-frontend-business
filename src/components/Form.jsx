export default function Form({ children }) {
  return (
    <div
      style={{
        zIndex: 10,
        display: 'flex',
        width: '100%',
        maxWidth: '80%',
        flexDirection: 'column',
        gap: '1rem',
        borderRadius: '0.375rem',
        backgroundColor: 'white',
        padding: '1rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </div>
  );
}