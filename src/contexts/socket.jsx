import { createContext, useContext } from "react"
import { io } from "socket.io-client" 
const WEBSOCKET_PUBLIC_URL = import.meta.env.VITE_WEBSOCKET_PUBLIC_URL 
export const socket = io(WEBSOCKET_PUBLIC_URL, {
  transports: ["websocket"],
})

export const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export function useSocketContext() {
  const context = useContext(SocketContext)

  return { socket: context }
}
