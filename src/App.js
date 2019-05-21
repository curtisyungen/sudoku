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
      isPlaying: false,
      restart: false,
      stopTimer: false,
    }
  }

  setIsPlaying = () => {
    this.setState({
      isPlaying: true,  
    });
  }

  restartGame = () => {

  }

  stopTimer = () => {
    this.setState({
      stopTimer: true,
    });
  }

  render() {
    return (
      <Container>
        <Board 
          setIsPlaying={this.setIsPlaying}
          restartGame={this.restartGame}
          stopTimer={this.stopTimer}
        />
        
        {this.state.isPlaying ? (
          <Clock 
            stop={this.state.stopTimer}
          />
        ) : (
          <></>
        )}
        
      </Container>
    )
  }
}

export default App;
