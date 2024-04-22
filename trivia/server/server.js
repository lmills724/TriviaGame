const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { v4: uuidv4 } = require('uuid'); // Unique game codes

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const gameRooms = {}; // Store active game rooms and their players

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('A player connected:', socket.id);

  socket.on('createGame', () => {
    const gameCode = uuidv4().slice(0, 6); // Generate a unique game code
    gameRooms[gameCode] = { host: socket.id, players: [socket.id] }; // Create a new game room
    socket.join(gameCode); // Host joins their game room
    io.to(socket.id).emit('gameCreated', gameCode); // Notify host
  });

  socket.on('joinGame', (gameCode) => {
    if (gameRooms[gameCode]) {
      if (gameRooms[gameCode].players.length < 5) {
        gameRooms[gameCode].players.push(socket.id); // Add player to game room
        socket.join(gameCode); // Player joins
        io.to(gameCode).emit('playerJoined', socket.id); // Notify game room
      } else {
        io.to(socket.id).emit('gameFull'); // Game room is full
      }
    } else {
      io.to(socket.id).emit('invalidGameCode'); // Game code is invalid
    }
  });

  socket.on('disconnect', () => {
    for (const gameCode in gameRooms) {
      const room = gameRooms[gameCode];
      const playerIndex = room.players.indexOf(socket.id);
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1); // Remove player from game room
        io.to(gameCode).emit('playerDisconnected', socket.id);
      }
    }
    console.log('A player disconnected:', socket.id);
  });
});

const PORT = 3001; // Choose a suitable server port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
