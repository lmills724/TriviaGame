import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function MultiplayerGame() {
  const { gameCode } = useParams(); // Get the game code from the route parameter

  useEffect(() => {
    socket.join(gameCode); // Join the game room when the component mounts

    socket.on('playerJoined', (playerId) => {
      console.log('Player joined:', playerId); // Handle new player joining
    });

    socket.on('playerDisconnected', (playerId) => {
      console.log('Player disconnected:', playerId); // Handle player disconnection
    });

    return () => {
      socket.leave(gameCode); // Leave the game room when the component unmounts
    };
  }, [gameCode]);

  return (
    <div>
      <h1>Multiplayer Game Room</h1>
      <p>Game Code: {gameCode}</p>
      {/* Add trivia game logic and interactions */}
    </div>
  );
}

export default MultiplayerGame;
