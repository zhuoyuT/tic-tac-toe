import { useState } from 'react';


export default function GameBoard({onSelectSquare, gameBoard}){

    // const [gameBoard,setGameBoard] = useState(initialGameBoard);
    // function handleSelectSquare(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         const updatedGameBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
    //         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedGameBoard;
    //     })
    //     onSelectSquare();
    // }

    return (
    <ol id="game-board">
        {gameBoard.map((row,rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbal,colIndex)=> (
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex,colIndex)} disabled={playerSymbal}>{playerSymbal}</button>
                        </li>
                    ))}
                </ol>
            </li>
        ))}
    </ol>)
}