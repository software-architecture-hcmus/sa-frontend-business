import { SFX_BOUMP_SOUND } from "../../../constants";
import { useSocketContext } from "../../../contexts/socket";
import { useEffect, useState } from "react";
import useSound from "use-sound";

export default function Start({ data: { time, subject } }) {
  const { socket } = useSocketContext();
  const [showTitle, setShowTitle] = useState(true);
  const [cooldown, setCooldown] = useState(time);

  const [sfxBoump] = useSound(SFX_BOUMP_SOUND, {
    volume: 0.2,
  });

  useEffect(() => {
    socket.on("game:startCooldown", () => {
      sfxBoump();
      setShowTitle(false);
    });

    socket.on("game:cooldown", (sec) => {
      sfxBoump();
      setCooldown(sec);
    });

    return () => {
      socket.off("game:startCooldown");
      socket.off("game:cooldown");
    };
  }, [sfxBoump]);

  return (
    <section style={{ position: 'relative', margin: '0 auto', display: 'flex', width: '100%', maxWidth: '7xl', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {showTitle ? (
        <h2 style={{ animation: 'show 0.5s ease-in-out', textAlign: 'center', fontSize: '3rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)', md: { fontSize: '4xl' }, lg: { fontSize: '5xl' } }}>
          {subject}
        </h2>
      ) : (
        <>
          <div
            style={{
              animation: 'show 0.5s ease-in-out',
              aspectRatio: '1 / 1',
              height: '8rem',
              backgroundColor: '#007bff',
              transition: 'all 0.5s',
              transform: `rotate(${45 * (time - cooldown)}deg)`,
              md: { height: '15rem' },
            }}
          ></div>
          <span style={{ position: 'absolute', fontSize: '6rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)', md: { fontSize: '8rem' } }}>
            {cooldown}
          </span>
        </>
      )}
    </section>
  );
}