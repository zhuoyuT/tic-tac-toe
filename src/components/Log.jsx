export default function Log({turns, players}) {

  
    return <ol id="log">
        {turns.map((turn,id)=> (
            <li key={id}>
                {players[turn.player]} select {turn.square.row},{turn.square.col}
            </li>
        ))}
    </ol>
  }