import React, { Component } from 'react';
import Container from "./components/Container/container";
import Board from "./components/Board/board";
// import Cell from "./components/Cell/cell";
import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <Board />
      </Container>
    )
  }
}

export default App;
