import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
  const navigate = useNavigate();

  const handleSinglePlayer = () => {
    navigate('/singleplayer');
  };

  const handleMultiplayer = () => {
    navigate('/multiplayer');
  };

  return (
    <Container className="my-4 text-center"> {/* Centers content within container */}
      <h1>Lisa's Trivia Game</h1>
      <p>Choose a mode to play:</p>
      <Row className="d-flex flex-column align-items-center"> {/* Stacks buttons vertically */}
        <Col xs={12} sm={6} className="mb-3"> {/* Consistent column width */}
          <Button variant="primary" block onClick={handleSinglePlayer}>Single Player</Button>
        </Col>
        <Col xs={12} sm={6}> {/* Consistent column width, no margin-bottom for last item */}
          <Button variant="secondary" block onClick={handleMultiplayer}>Multiplayer</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
