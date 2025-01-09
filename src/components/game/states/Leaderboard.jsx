export default function Leaderboard({ data: { leaderboard } }) {
  return (
    <section style={{ position: 'relative', margin: '0 auto', display: 'flex', width: '100%', maxWidth: '7xl', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 0.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '3rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
        Leaderboard
      </h2>
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '0.5rem' }}>
        {leaderboard.map(({ username, points }, key) => (
          <div
            key={key}
            style={{ display: 'flex', width: '100%', justifyContent: 'space-between', borderRadius: '0.375rem', backgroundColor: '#007bff', padding: '0.75rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}
          >
            <span style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{username}</span>
            <span style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{points}</span>
          </div>
        ))}
      </div>
    </section>
  );
}