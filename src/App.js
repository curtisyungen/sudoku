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
      result: null,
    }
  }

  startGame = () => {
    this.setState({
      play: true,
      result: null,
    });
  }

  endGame = () => {
    this.setState({
      play: false,
    });
  }

  getResult = (result) => {
    this.setState({
      result: result,
    });
  }

  render() {
    return (
      <Container>

        <span className={`mainSpan result-${this.state.result}`}>

        <Board 
          play={this.state.play}
          getResult={this.getResult}
        />

        <div className="buttons">

          {/* New Game */}

          <button
            className="btn btn-dark btn-sm button"
            id="newGame"
            onClick={(event) => {
              event.preventDefault();
              this.startGame();
            }}
          >
            New Game
          </button>
            
          {/* Solve */}

          <button
            className="btn btn-danger btn-sm button"
            id="solveGame"
            onClick={(event) => {
              event.preventDefault();
              this.endGame();
            }}
          >
            Solve
          </button>

        </div>

        <Clock
          start={this.startGame}
          play={this.state.play}
        />

        </span>

      </Container>
    )
  }
}

export default App;
