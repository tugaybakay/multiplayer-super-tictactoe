import { JSX } from "react";
import { checkDiagonal,checkVertical,checkHorizontal,checkDraw } from "../checkFunctions";

function GameBoard({onClick, boardIndex, gameBoard, isDisabled, isMyTurn, lastPlayedSymbol}) {
  
  let gameButtonElements: JSX.Element[] = [];

  function isOver() {
    if (checkHorizontal(gameBoard) || checkVertical(gameBoard) || checkDiagonal(gameBoard)) {
        return true;
    }
    /*else if (checkDraw(gameBoard)) {
        return "D";
    }*/
    else {
        return null;
    }
}


  for(let i=0;i<9;i++) {
    gameButtonElements.push(<div key={i} onClick={() => onClick(i,boardIndex,isDisabled)} className={`${isDisabled && isMyTurn ? "xox-button " : "disabled-xox-button"}`}>{gameBoard[i]}</div>)
  }

  
  const blockElem = (
    <>
        <span className="absolute flex items-center justify-center w-full leading-none opacity-80 text-[#0b0d40] aspect-square text-[7rem] sm:text-[12rem] text-center h-full">{lastPlayedSymbol}</span>
        <div className="absolute w-full h-full bg-gray-800 rounded-md opacity-50 aspect-square"></div>
    </>)

  return(
    <div className="grid relative grid-cols-3 grid-rows-3 bg-customBackgroungColor gap-1">
      {isOver() && blockElem}
      {gameButtonElements}
      </div>
  )
}

export default GameBoard;