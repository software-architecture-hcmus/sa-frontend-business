import {
  SFX_PODIUM_FIRST,
  SFX_PODIUM_SECOND,
  SFX_PODIUM_THREE,
  SFX_SNEAR_ROOL,
} from "../../../constants"
import useScreenSize from "../../../hook/useScreenSize"
import clsx from "clsx"
import { useEffect, useState } from "react"
import ReactConfetti from "react-confetti"
import useSound from "use-sound"

export default function Podium({ data: { subject, top } }) {
  const [apparition, setApparition] = useState(0)

  const { width, height } = useScreenSize()

  const [sfxtThree] = useSound(SFX_PODIUM_THREE, {
    volume: 0.2,
  })

  const [sfxSecond] = useSound(SFX_PODIUM_SECOND, {
    volume: 0.2,
  })

  const [sfxRool, { stop: sfxRoolStop }] = useSound(SFX_SNEAR_ROOL, {
    volume: 0.2,
  })

  const [sfxFirst] = useSound(SFX_PODIUM_FIRST, {
    volume: 0.2,
  })

  useEffect(() => {
    console.log(apparition)
    switch (apparition) {
      case 4:
        sfxRoolStop()
        sfxFirst()
        break
      case 3:
        sfxRool()
        break
      case 2:
        sfxSecond()
        break
      case 1:
        sfxtThree()
        break
    }
  }, [apparition, sfxFirst, sfxSecond, sfxtThree, sfxRool])

  useEffect(() => {
    if (top.length < 3) {
      setApparition(4)
      return
    }

    const interval = setInterval(() => {
      if (apparition > 4) {
        clearInterval(interval)
        return
      }
      setApparition((value) => value + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [apparition])

  return (
    <>
      {apparition >= 4 && (
        <ReactConfetti
          width={width}
          height={height}
          style={{ height: '100%', width: '100%' }}
        />
      )}

      {apparition >= 3 && top.length >= 3 && (
        <div style={{ position: 'absolute', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
          <div className="spotlight"></div>
        </div>
      )}
      <section style={{ position: 'relative', margin: '0 auto', display: 'flex', width: '100%', maxWidth: '7xl', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
          {subject}
        </h2>

        <div
          style={{
            display: 'grid',
            width: '100%',
            maxWidth: '800px',
            flex: 1,
            gridTemplateColumns: `repeat(${top.length}, minmax(0, 1fr))`,
            alignItems: 'end',
            justifyContent: 'center',
            overflowY: 'hidden',
            overflowX: 'visible',
          }}
        >
          {top[1] && (
            <div
              className={clsx(
                "flex flex-col items-center justify-center gap-3",
                { opacity: apparition >= 2 ? 1 : 0, transform: apparition >= 2 ? 'translateY(0)' : 'translateY(100%)', transition: 'all 0.5s' },
              )}
              style={{ zIndex: 20, height: '50%', width: '100%' }}
            >
              <p
                className={clsx(
                  "overflow-visible whitespace-nowrap text-center text-2xl font-bold text-white",
                  { animation: apparition >= 4 ? 'balanced 1s infinite' : 'none' },
                )}
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
              >
                {top[1].username}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', backgroundColor: '#007bff', paddingTop: '1.5rem', textAlign: 'center', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.375rem' }}>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '3.5rem', width: '3.5rem', borderRadius: '50%', border: '4px solid #d1d5db', backgroundColor: '#6b7280', fontSize: '1.875rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                  <span style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>2</span>
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                  {top[1].points}
                </p>
              </div>
            </div>
          )}

          <div
            className={clsx(
              "flex flex-col items-center gap-3",
              { opacity: apparition >= 3 ? 1 : 0, transform: apparition >= 3 ? 'translateY(0)' : 'translateY(100%)', transition: 'all 0.5s' },
              { minWidth: top.length < 2 ? '16rem' : 'auto' },
            )}
            style={{ zIndex: 30, height: '60%', width: '100%' }}
          >
            <p
              className={clsx(
                "overflow-visible whitespace-nowrap text-center text-2xl font-bold text-white",
                { animation: apparition >= 4 ? 'balanced 1s infinite' : 'none', opacity: apparition >= 4 ? 1 : 0 },
              )}
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
            >
              {top[0].username}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', backgroundColor: '#007bff', paddingTop: '1.5rem', textAlign: 'center', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.375rem' }}>
              <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '3.5rem', width: '3.5rem', borderRadius: '50%', border: '4px solid #f59e0b', backgroundColor: '#fbbf24', fontSize: '1.875rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                <span style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>1</span>
              </p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                {top[0].points}
              </p>
            </div>
          </div>

          {top[2] && (
            <div
              className={clsx(
                "flex flex-col items-center gap-3",
                { opacity: apparition >= 1 ? 1 : 0, transform: apparition >= 1 ? 'translateY(0)' : 'translateY(100%)', transition: 'all 0.5s' },
              )}
              style={{ zIndex: 10, height: '40%', width: '100%' }}
            >
              <p
                className={clsx(
                  "overflow-visible whitespace-nowrap text-center text-2xl font-bold text-white",
                  { animation: apparition >= 4 ? 'balanced 1s infinite' : 'none' },
                )}
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
              >
                {top[2].username}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', backgroundColor: '#007bff', paddingTop: '1.5rem', textAlign: 'center', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.375rem' }}>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '3.5rem', width: '3.5rem', borderRadius: '50%', border: '4px solid #78350f', backgroundColor: '#92400e', fontSize: '1.875rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                  <span style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>3</span>
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                  {top[2].points}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
