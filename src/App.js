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
      play: true,
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

  restartGame = () => {
    this.endGame();
    this.playGame();
  }

  solveGame = () => {
    this.setState({
      play: false,
      solve: true,
    })
  }

  render() {
    return (
      <Container>

        <Board />

        <div className="buttons">
            {/* Clear */}
            <button 
                className="btn btn-outline-dark btn-sm button"
                id="restartGame"
                onClick={(event) => {
                    event.preventDefault(); 

                }}
            >
                Restart
            </button>

            {/* New Game */}
            <button 
                className="btn btn-outline-dark btn-sm button"
                id="newGame"
                onClick={(event) => {
                    event.preventDefault(); 

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

                }}
            >
                Solve
            </button>

            {/* Submit */}
            <button 
                className="btn btn-success btn-sm button"
                id="submitGame"
                type="submit"
                onClick={(event) => {
                    event.preventDefault(); 

                }}
            >
                Submit
            </button>
        </div>

        <Clock 
          play={this.state.play}
        />

      </Container>
    )
  }
}

export default App;
