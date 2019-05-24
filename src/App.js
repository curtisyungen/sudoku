import React, { Component } from 'react';
import Container from "./components/Container/container";
import Board from "./components/Board/board";
import Clock from "./components/Clock/clock";
// import Cell from "./components/Cell/cell";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      play: false,
    }
  }

  startGame = () => {
    this.setState({
      play: true,
    });
  }

  endGame = () => {
    this.setState({
      play: false,
    });
  }

  newGame = () => {
    this.endGame();
    this.startGame();
  }

  solveGame = () => {
    this.endGame();
  }

  render() {
    return (
      <Container>

        <Board 
          play={this.state.play}
        />

        <div className="buttons">

          {/* New Game */}

          <button
            className="btn btn-outline-dark btn-sm button"
            id="newGame"
            onClick={(event) => {
              event.preventDefault();
              this.newGame();
            }}
          >
            New Game
          </button>
            
          {/* Solve */}

          <button
            className="btn btn-outline-danger btn-sm button"
            id="solveGame"
            onClick={(event) => {
              event.preventDefault();
              this.solveGame();
            }}
          >
            Solve
          </button>

        </div>

        <Clock
          start={this.startGame}
          play={this.state.play}
        />

      </Container>
    )
  }
}

export default App;
