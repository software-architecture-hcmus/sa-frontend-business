import Loader from "../../Loader";

export default function Wait({ data: { text } }) {
  return (
    <section style={{ position: 'relative', margin: '0 auto', display: 'flex', width: '100%', maxWidth: '7xl', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Loader />
      <h2 style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '3rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)', md: { fontSize: '4xl' }, lg: { fontSize: '5xl' } }}>
        {text}
      </h2>
    </section>
  );
}