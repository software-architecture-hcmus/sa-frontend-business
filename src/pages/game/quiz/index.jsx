import GameWrapper from "../../../components/game/GameWrapper"
import { GAME_STATES, GAME_STATE_COMPONENTS_MANAGER } from "../../../constants"
import { useSocketContext } from "../../../contexts/socket"
import { createElement, useEffect, useState } from "react"
import { useParams  } from "react-router-dom";

export default function QuizGame() {
  const { socket } = useSocketContext()
  const { id } = useParams();
  const [nextText, setNextText] = useState("Start")
  const [state, setState] = useState({
    ...GAME_STATES,
    status: {
      ...GAME_STATES.status,
      name: "SHOW_ROOM",
    },
  })

  useEffect(() => {
    socket.on("game:status", (status) => {
      setState({
        ...state,
        status: status,
        question: {
          ...state.question,
          current: status.question,
        },
      })
    })

    return () => {
      socket.off("game:status")
    }
  }, [state])

  const handleSkip = () => {
    setNextText("Skip")
    switch (state.status.name) {
      case "SHOW_ROOM":
        socket.emit("manager:startGame", id)
        break

      case "SELECT_ANSWER":
        socket.emit("manager:abortQuiz")
        break

      case "SHOW_RESPONSES":
        socket.emit("manager:showLeaderboard")
        break

      case "SHOW_LEADERBOARD":
        socket.emit("manager:nextQuestion")
        break
    }
  }

  return (
    <div>  
       <GameWrapper textNext={nextText} onNext={handleSkip} manager>
            {GAME_STATE_COMPONENTS_MANAGER[state.status.name] &&
              createElement(GAME_STATE_COMPONENTS_MANAGER[state.status.name], {
                data: state.status.data,
              })}
          </GameWrapper>
    </div>
  )
}
