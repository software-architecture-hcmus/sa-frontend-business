import Button from "../Button"
import background from "../../assets/background.webp"
import { usePlayerContext } from "../../contexts/player"
import { useSocketContext } from "../../contexts/socket"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function GameWrapper({ children, textNext, onNext, manager }) {
  const { socket } = useSocketContext()
  const { player, dispatch } = usePlayerContext()
  const navigate = useNavigate()

  const [questionState, setQuestionState] = useState()

  useEffect(() => {
    socket.on("game:kick", () => {
      dispatch({
        type: "LOGOUT",
      })

      navigate("/")
    })

    socket.on("game:updateQuestion", ({ current, total }) => {
      setQuestionState({
        current,
        total,
      })
    })

    return () => {
      socket.off("game:kick")
      socket.off("game:updateQuestion")
    }
  }, [])

  return (
    <section style={{ position: 'relative', display: 'flex', minHeight: '100vh', width: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '1rem' }}>
        {questionState && (
          <div style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', borderRadius: '0.375rem', backgroundColor: 'white', padding: '0.5rem 1rem', fontSize: '1.125rem', fontWeight: 'bold', color: 'black' }}>
            {`${questionState.current} / ${questionState.total}`}
          </div>
        )}

        {manager && (
          <Button
            style={{ alignSelf: 'flex-end', backgroundColor: 'white', padding: '0 1rem', color: 'black' }}
            onClick={() => onNext()}
          >
            {textNext}
          </Button>
        )}
      </div>

      {children}

      {!manager && (
        <div style={{ zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: '0.5rem 1rem', fontSize: '1.125rem', fontWeight: 'bold', color: 'white' }}>
          <p style={{ color: 'gray' }}>{!!player && player.username}</p>
          <div style={{ borderRadius: '0.125rem', backgroundColor: 'gray', padding: '0.25rem 0.75rem', fontSize: '1.125rem' }}>
            {!!player && player.points}
          </div>
        </div>
      )}
    </section>
  )
}
