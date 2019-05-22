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

  playGame = () => {
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


  render() {
    return (
      <Container>
        <Board 
          playGame={this.playGame}
          endGame={this.endGame}
          restartGame={this.restartGame}
        />

        <Clock 
          play={this.state.play}
        />
      </Container>
    )
  }
}

export default App;
