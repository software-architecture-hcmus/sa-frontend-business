import { SFX_SHOW_SOUND } from "../../../constants";
import { useEffect } from "react";
import useSound from "use-sound";

export default function Question({ data: { question, image, cooldown } }) {
  const [sfxShow] = useSound(SFX_SHOW_SOUND, { volume: 0.5 });

  useEffect(() => {
    sfxShow();
  }, [sfxShow]);

  return (
    <section style={{ position: 'relative', margin: '0 auto', display: 'flex', height: '100%', width: '100%', maxWidth: '7xl', flex: 1, flexDirection: 'column', alignItems: 'center', padding: '0 1rem' }}>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
        <h2 style={{ animation: 'show 0.5s ease-in-out', textAlign: 'center', fontSize: '3rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)', md: { fontSize: '4xl' }, lg: { fontSize: '5xl' } }}>
          {question}
        </h2>

        {!!image && (
          <img src={image} style={{ height: '12rem', maxHeight: '15rem', width: 'auto', borderRadius: '0.375rem' }} />
        )}
      </div>
      <div
        style={{
          marginBottom: '5rem',
          height: '1rem',
          alignSelf: 'start',
          justifySelf: 'end',
          borderRadius: '9999px',
          backgroundColor: '#007bff',
          animation: `progressBar ${cooldown}s linear forwards`,
        }}
      ></div>
    </section>
  );
}