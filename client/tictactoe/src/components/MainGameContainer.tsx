import { JSX, use } from "react";
import GameBoard from "./GameBoard";
import socket from "../socket";
import { useEffect, useState, useRef } from "react";

function MainGameContainer() {

  const symbolRef = useRef<string | null>(null);

  const [turn,setTurn] = useState(false);
  const [lastPlayIndex,setLastPlayIndex] = useState(-1);
  //const [symbol, setSymbol] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [enemyUsername, setEnemyUsername] = useState<string | null>(null);
  const [gameBoard,setGameBoard] = useState(() => createEmptyGameBoard());
  const [enemySymbol,setEnemySymbol] = useState<string | null>(null);
  function createEmptyGameBoard() {
    let empty = [];
    for(let i=0; i<9; i++) {
      empty.push([null,null,null,null,null,null,null,null,null])
    }
    return empty;
  }

  useEffect(() => {
    socket.on("game-started",({playerX, playerO}) => {
      if(playerX.id === socket.id){
        //setSymbol("x");
        symbolRef.current = "x";
        setEnemySymbol("o")
        setUsername(playerX.username);
        setEnemyUsername(playerO.username);
        setTurn(true);
      } 
      else {
        //setSymbol("o");
        symbolRef.current = "o";
        setEnemySymbol("x");
        setUsername(playerO.username);
        setEnemyUsername(playerX.username);
      }
    })
    
    socket.on("sync",(gameBoardFromServer, turnSymbol,lastPlayIndex) => {
      if(symbolRef.current === turnSymbol) setTurn(true);
      else setTurn(false);
      setGameBoard(gameBoardFromServer);
      setLastPlayIndex(lastPlayIndex);
    })
    
    return () => {
      socket.removeAllListeners();
    }
  },[socket]);

  function didTap(index: Number,boardIndex: Number, isDisabled: boolean) {
    if(!turn || !isDisabled) return;
    console.log("çalışıo işte amk!")
    socket.emit("play",{boardIndex, indexPlay: index, symbol: symbolRef.current, turnSymbol: enemySymbol});
  }

  let gameBoardElements : JSX.Element[] =  [];
  for (let i=0; i < 9 ; i++) {8
    gameBoardElements.push(<GameBoard 
      onClick={didTap} 
      boardIndex={i} 
      key={i}
      isDisabled={(lastPlayIndex === -1) ? true: (lastPlayIndex===i)}
      isMyTurn={turn}
      gameBoard={gameBoard[i]}
      lastPlayedSymbol={turn ? enemySymbol : symbolRef.current}/>)
  }

  return(
  <>
    {username && <h2 className="text-center text-white text-4xl mt-6 max-sm:text-2xl font-semibold">( {symbolRef.current?.toUpperCase()} )'s turn: {turn ? username?.toUpperCase() : enemyUsername?.toUpperCase()}</h2>}
    <main className="grid grid-cols-3 grid-rows-3 mt-6 mx-auto h-8/12 w-6/12 rounded-2xl bg-customBackgroungColor border-4 border-customBackgroungColor p-1 gap-2">
      {gameBoardElements}
    </main>
  </>
  );
}

export default MainGameContainer;