import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*"} });

let players = {};
let games = {};

io.on("connection", (socket) => {
  
  socket.on('new-user', (username) => {
    console.log(username)
    const usernameList = Object.values(players).map(player => player.username);
    if(usernameList.includes(username)) {
      socket.emit("error","Username already exists!")
    }else {
      players[socket.id] = {id: socket.id, username, roomId: null, symbol: null }
      socket.emit("player-created",username);
    }
  })

  socket.on("create-room",(symbol) => {
    const id = socket.id.slice(0,5);
    createRoom(id);
    socket.join(id);
    socket.roomId = id;
    const player = players[socket.id];
    player.roomId = id;
    
    switch(symbol) {
      case "x":
        setXPlayer(player);
        break;
      case "o":
        setOPlayer(player);
        break;
      case "?":
        if (Math.random() * 2 > 1) setXPlayer(player);
        else setOPlayer(player); 
    }
    socket.emit("created-room");
  });

  socket.on("join-room", async (roomId) => {
    const sockets = await io.in(roomId).fetchSockets();
    if (sockets.length === 0) {
      socket.emit("error", "Room not found!");
    }
    else if (sockets.length === 2) {
        socket.emit("error", "Room is full!");
    }
    else {
      socket.roomId = roomId;
      socket.join(roomId);
      players[socket.id].roomId = roomId;
      const player = players[socket.id];
      if (games[roomId].playerX === null) setXPlayer(player);
      else setOPlayer(player);
      socket.emit("joined-room")
      io.to(roomId).emit("game-ready");
      io.to(roomId).emit("game-started", {playerX: players[games[socket.roomId].playerX], playerO:players[games[socket.roomId].playerO]});
    }
  })

  socket.on("play", ({boardIndex, indexPlay, symbol, turnSymbol}) => {
    games[socket.roomId].gameBoard[boardIndex][indexPlay] = symbol;
    games[socket.roomId].turn = turnSymbol;
    io.to(socket.roomId).emit("sync",games[socket.roomId].gameBoard,turnSymbol,indexPlay);
  })
});

function createRoom(roomId) {    
  games[roomId] = {
      playerX: null,
      playerO: null,
      turn: "X",
      winner: null,
      gameBoard: emptyGameBoard()
  };
}

function emptyGameBoard() {
  let empty = [];
  for(let i=0; i<9; i++) {
    empty.push([null,null,null,null,null,null,null,null,null])
  }
  return empty;
}

function setXPlayer(player) {
  player.symbol = "x";
  games[player.roomId].playerX = player.id;
}

function setOPlayer(player) {
  player.symbol = "o";
  games[player.roomId].playerO = player.id;
}


httpServer.listen(3000);