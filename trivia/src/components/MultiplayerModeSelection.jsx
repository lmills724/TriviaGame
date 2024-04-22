import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import io from 'socket.io-client'; // For real-time communication with the backend server

const socket = io.connect('http://localhost:3001'); // Connect to your backend server

function MultiplayerModeSelection() {
  const navigate = useNavigate();
  const [gameCode, setGameCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleHostGame = () => {
    setLoading(true);
    socket.emit('createGame');
    socket.on('gameCreated', (code) => {
      navigate(`/multiplayer/${code}`);
      setLoading(false);
    });
  };

  const handleJoinGame = () => {
    setLoading(true);
    socket.emit('joinGame', gameCode);
    socket.on('invalidGameCode', () => {
      alert('Invalid game code.');
      setLoading(false);
    });
    socket.on('gameFull', () => {
      alert('Game room is full.');
      setLoading(false);
    });
    socket.on('playerJoined', () => {
      navigate(`/multiplayer/${gameCode}`);
      setLoading(false);
    });
  };

  return (
    <Container className="my-4 text-center"> {/* Centers content */}
      <h1>Multiplayer Mode Selection</h1> {/* Page title */}
      <Row className="d-flex flex-column align-items-center mt-4"> {/* Stacks vertically */}
        <Col xs={12} sm={4} className="mb-3 text-center"> {/* Compact column with spacing */}
          <Form.Control
            type="text"
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value)}
            placeholder="Enter Game Code"
            style={{ maxWidth: '200px', margin: '0 auto', marginBottom: '10px' }} // Adds custom margin below the text entry
          />
          <Button
            variant="secondary"
            block
            onClick={handleJoinGame}
            disabled={loading}
          >
            {loading ? 'Joining...' : 'Join Game'} {/* Loading indication */}
          </Button>
        </Col>
        <Col xs={12} sm={6} className="mb-3"> {/* Centered host game button */}
          <Button
            variant="primary"
            block
            onClick={handleHostGame}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Host Game'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MultiplayerModeSelection;
