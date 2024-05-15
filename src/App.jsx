import Player from "./components/player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import {WINNING_COMBINATIONS} from "./winningCombo.js";
import GameOver from "./components/GameOver"

const INITIAL_GAME_BOARD = [[null,null,null],[null,null,null],[null,null,null]];
const PLAYER = {
  X: "Player 1",
  O: "Player 2"
};
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}
function deriveGameBoard(gameTurns) {
  let gameBoard = INITIAL_GAME_BOARD.map(row => row.slice());

  for (const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard,players) {
  let winner;
  for (const combo of WINNING_COMBINATIONS){
    const first = gameBoard[combo[0].row][combo[0].column];
    const second = gameBoard[combo[1].row][combo[1].column];
    const third = gameBoard[combo[2].row][combo[2].column];
    if (first && first === second && first === third){
      winner = players[first];
    }
  }

  return winner;
}
function App() {

  const [gameTurns,setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYER)
  const activePlayerSymbal = deriveActivePlayer(gameTurns);


  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard,players);

  let hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSqure(rowIndex,colIndex){

    setGameTurns((prevGameTurns) => {
      let currentPlayer = "X";

      if (prevGameTurns.length > 0 && prevGameTurns[0].player === "X"){
        currentPlayer = "O";
      }
      const updatedGameTurns = [{square: { row : rowIndex, col :colIndex}, player: currentPlayer},...prevGameTurns];
      return updatedGameTurns;
    })
  }
  function handleRematch(){
    setGameTurns([])
  }
  function handleRename(symbol,newName){
    setPlayers(prevPlayers =>{
      return {
        ...prevPlayers,
        [symbol]:newName
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYER.X} symbol="X" isActive={activePlayerSymbal ==="X"} onChangeName={handleRename}/>
          <Player name={PLAYER.O} symbol="O" isActive={activePlayerSymbal ==="O"} onChangeName={handleRename}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onClickRematch={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSqure} gameBoard = {gameBoard}/>
      </div>
      <Log gameTurns turns = {gameTurns} players={players}/>
    </main>
  )
}

export default App
