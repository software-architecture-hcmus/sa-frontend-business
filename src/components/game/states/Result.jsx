import CricleCheck from "../../icons/CricleCheck";
import CricleXmark from "../../icons/CricleXmark";
import { SFX_RESULTS_SOUND } from "../../../constants";
import { usePlayerContext } from "../../../contexts/player";
import { useEffect } from "react";
import useSound from "use-sound";

export default function Result({
  data: { correct, message, points, myPoints, totalPlayer, rank, aheadOfMe },
}) {
  const { dispatch } = usePlayerContext();

  const [sfxResults] = useSound(SFX_RESULTS_SOUND, {
    volume: 0.2,
  });

  useEffect(() => {
    dispatch({
      type: "UPDATE",
      payload: { points: myPoints },
    });

    sfxResults();
  }, [sfxResults]);

  return (
    <section style={{ animation: 'show 0.5s ease-in-out', position: 'relative', margin: '0 auto', display: 'flex', width: '100%', maxWidth: '7xl', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {correct ? (
        <CricleCheck style={{ aspectRatio: '1 / 1', maxHeight: '15rem', width: '100%' }} />
      ) : (
        <CricleXmark style={{ aspectRatio: '1 / 1', maxHeight: '15rem', width: '100%' }} />
      )}
      <h2 style={{ marginTop: '0.25rem', fontSize: '2.5rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
        {message}
      </h2>
      <p style={{ marginTop: '0.25rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
        {`You are top ${rank}` + (aheadOfMe ? ", behind " + aheadOfMe : "")}
      </p>
      {correct && (
        <span style={{ marginTop: '0.5rem', borderRadius: '0.375rem', backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: '0.5rem 1rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
          +{points}
        </span>
      )}
    </section>
  );
}