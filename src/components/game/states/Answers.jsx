import AnswerButton from "../../AnswerButton"
import { useSocketContext } from "../../../contexts/socket"
import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import {
  ANSWERS_COLORS,
  ANSWERS_ICONS,
  SFX_ANSWERS_MUSIC,
  SFX_ANSWERS_SOUND,
  SFX_RESULTS_SOUND,
} from "../../../constants"
import useSound from "use-sound"
import { usePlayerContext } from "../../../contexts/player"

const calculatePercentages = (objectResponses) => {
  const keys = Object.keys(objectResponses)
  const values = Object.values(objectResponses)

  if (!values.length) {
    return []
  }

  const totalSum = values.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  )

  let result = {}

  keys.map((key) => {
    result[key] = ((objectResponses[key] / totalSum) * 100).toFixed() + "%"
  })

  return result
}

export default function Answers({
  data: { question, answers, image, time, responses, correct },
}) {
  const { socket } = useSocketContext()
  const { player } = usePlayerContext()

  const [percentages, setPercentages] = useState([])
  const [cooldown, setCooldown] = useState(time)
  const [totalAnswer, setTotalAnswer] = useState(0)

  const [sfxPop] = useSound(SFX_ANSWERS_SOUND, {
    volume: 0.1,
  })

  const [sfxResults] = useSound(SFX_RESULTS_SOUND, {
    volume: 0.2,
  })

  const [playMusic, { stop: stopMusic, isPlaying }] = useSound(
    SFX_ANSWERS_MUSIC,
    {
      volume: 0.2,
    },
  )

  const handleAnswer = (answer) => {
    if (!player) {
      return
    }

    socket.emit("player:selectedAnswer", answer)
    sfxPop()
  }

  useEffect(() => {
    if (!responses) {
      playMusic()
      return
    }

    stopMusic()
    sfxResults()

    setPercentages(calculatePercentages(responses))
  }, [responses, playMusic, stopMusic])

  useEffect(() => {
    if (!isPlaying) {
      playMusic()
    }
  }, [isPlaying])

  useEffect(() => {
    return () => {
      stopMusic()
    }
  }, [playMusic, stopMusic])

  useEffect(() => {
    socket.on("game:cooldown", (sec) => {
      setCooldown(sec)
    })

    socket.on("game:playerAnswer", (count) => {
      setTotalAnswer(count)
      sfxPop()
    })

    return () => {
      socket.off("game:cooldown")
      socket.off("game:playerAnswer")
    }
  }, [sfxPop])

  return (
      <div style={{ display: 'flex', height: '100%', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ margin: '0 auto', display: 'inline-flex', height: '100%', width: '100%', maxWidth: '7xl', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
              <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)', md: { fontSize: '4xl' }, lg: { fontSize: '5xl' } }}>
                {question}
              </h2>

        {!!image && !responses && (
          <img src={image} style={{ height: '12rem', maxHeight: '15rem', width: 'auto', borderRadius: '0.375rem' }} />
        )}

        {responses && (
          <div
            style={{
              display: 'grid',
              width: '100%',
              gap: '1rem',
              gridTemplateColumns: `repeat(${answers.length}, minmax(0, 1fr))`,
              marginTop: '2rem',
              height: '10rem',
              maxWidth: '3xl',
              padding: '0.5rem',
            }}
          >
            {answers.map((_, key) => (
              <div
                key={key}
                className={clsx(
                  "flex flex-col justify-end self-end overflow-hidden rounded-md",
                  ANSWERS_COLORS[key],
                )}
                style={{ height: percentages[key] }}
              >
                <span style={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.1)', textAlign: 'center', fontSize: '1.125rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                  {responses[key] || 0}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        {!responses && (
          <div style={{ margin: '0 auto', marginBottom: '1rem', display: 'flex', width: '100%', maxWidth: '7xl', justifyContent: 'space-between', gap: '0.25rem', padding: '0.5rem', fontSize: '1.125rem', fontWeight: 'bold', color: 'white', md: { fontSize: '1.25rem' } }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '9999px', backgroundColor: 'rgba(0, 0, 0, 0.25)', padding: '0 1rem', fontSize: '1.125rem', fontWeight: 'bold' }}>
              <span style={{ transform: 'translateY(0.25rem)', fontSize: '0.875rem' }}>Time</span>
              <span>{cooldown}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '9999px', backgroundColor: 'rgba(0, 0, 0, 0.25)', padding: '0 1rem', fontSize: '1.125rem', fontWeight: 'bold' }}>
              <span style={{ transform: 'translateY(0.25rem)', fontSize: '0.875rem' }}>Answers</span>
              <span>{totalAnswer}</span>
            </div>
          </div>
        )}

        <div style={{ margin: '0 auto', marginBottom: '1rem', display: 'grid', width: '100%', maxWidth: '7xl', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.25rem', borderRadius: '9999px', padding: '0.5rem', fontSize: '1.125rem', fontWeight: 'bold', color: 'white', md: { fontSize: '1.25rem' } }}>
          {answers.map((answer, key) => (
            <AnswerButton
              key={key}
              className={clsx(ANSWERS_COLORS[key], {
                "opacity-65": responses && correct !== key,
              })}
              icon={ANSWERS_ICONS[key]}
              onClick={() => handleAnswer(key)}
            >
              {answer}
            </AnswerButton>
          ))}
        </div>
      </div>
    </div>
  )
}
