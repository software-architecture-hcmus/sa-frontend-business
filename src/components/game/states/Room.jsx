import { useSocketContext } from "../../../contexts/socket";
import { useEffect, useState } from "react";

export default function Room({ data: { text, inviteCode } }) {
  const { socket } = useSocketContext();
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    socket.on("manager:newPlayer", (player) => {
      setPlayerList([...playerList, player]);
    });

    socket.on("manager:removePlayer", (playerId) => {
      setPlayerList(playerList.filter((p) => p.id !== playerId));
    });

    socket.on("manager:playerKicked", (playerId) => {
      setPlayerList(playerList.filter((p) => p.id !== playerId));
    });

    return () => {
      socket.off("manager:newPlayer");
      socket.off("manager:removePlayer");
      socket.off("manager:playerKicked");
    };
  }, [playerList]);

  return (
    <section style={{ position: 'relative', margin: '0 auto', display: 'flex', width: '100%', maxWidth: '7xl', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 0.5rem' }}>
      <div style={{ marginBottom: '2.5rem', transform: 'rotate(3deg)', borderRadius: '0.375rem', backgroundColor: 'white', padding: '1.5rem', fontSize: '3.75rem', fontWeight: '800' }}>
        {inviteCode}
      </div>

      <h2 style={{ marginBottom: '1rem', fontSize: '2.5rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
        {text}
      </h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {playerList.map((player) => (
          <div
            key={player.id}
            style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '0.375rem', backgroundColor: '#007bff', padding: '0.75rem 1rem', fontWeight: 'bold', color: 'white' }}
            onClick={() => socket.emit("manager:kickPlayer", player.id)}
          >
            <span style={{ cursor: 'pointer', fontSize: '1.25rem', textShadow: '0 1px 3px rgba(0,0,0,0.3)', textDecoration: 'none' }}>
              {player.username}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}