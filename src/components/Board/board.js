import React, { Component } from "react";
import Container from "../Container/container";
import Cell from "../Cell/cell";
import "./board.css";

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cells: [],
            play: null,
            boardValues: [],
        }
    }

    componentDidMount = () => {

        this.setState({
            play: this.props.play,
        }, () => {
            this.setBoardValues();
        });
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.play !== this.props.play) {
            if (this.props.play) {
                this.getNewGame();
            }
            else {
                this.checkBoardValues();
            }
        }
    }

    getNewGame = () => {

        let row, col, rowSect, colSect, limit = 0;
        let cells = [];
        let values;

        while (cells.length < 81 && limit < 50000) {
            row = Math.floor(cells.length / 9);
            col = cells.length % 9;
            rowSect = Math.floor(row / 3);
            colSect = Math.floor(col / 3);
            values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            let idx = -1;

            for (var c in cells) {

                // Check row & col
                if (cells[c].row === row || cells[c].col === col) {

                    idx = values.indexOf(cells[c].value);

                    if (idx >= 0) {
                        values.splice(idx, 1);
                    }
                }

                // Check sect
                if (cells[c].rowSect === rowSect && cells[c].colSect === colSect) {

                    idx = values.indexOf(cells[c].value);

                    if (idx >= 0) {
                        values.splice(idx, 1);
                    }
                }
            }

            // If values array is empty, backtrack 9 cells
            if (values.length === 0) {
                for (var i = 0; i <= 9; i++) {
                    cells.pop();
                }
            }

            // Otherwise, generate random cell value and push data to cells array
            else {
                let value = values[Math.floor(Math.random() * values.length)];

                cells.push({
                    row: row,
                    col: col,
                    rowSect: rowSect,
                    colSect: colSect,
                    value: value,
                    userInput: "",
                    blank: this.getBlank(),
                });
            }

            limit += 1;
        }

        // Update cells array in state
        this.setState({
            cells: cells
        });

        
    }

    getBlank = () => {
        if (this.props.play) {
            return Math.random() > 0.5;
        }

        return false;
    }
    
    setBoardValues = () => {
        let boardRow = [];
        let boardValues = [];

        for (var c=0; c<9; c++) {
            boardRow.push([0, 0]);
        }

        for (var r=0; r<9; r++) {
            boardValues.push(boardRow);
        }

        this.setState({
            boardValues: boardValues,
        });
    }

    updateCells = (row, col, userInput) => {
        let cells = this.state.cells;

        let count = row * 9 + col;

        cells[count].userInput = parseInt(userInput);

        this.setState({
            cells: cells,
        });
    }

    checkBoardValues = () => {
        let boardValues = this.state.boardValues;

        for (var row=0; row<9; row++) {
            for (var col=0; col<9; col++) {
                if (boardValues[row][col][0] === boardValues[row][col][1]) {
                    console.log("Success");
                }
                else {
                    console.log("Stop");
                }
            }
        }
    }

    render() {
        return (
            <Container>
                <div className="board">
                    {this.state.cells.length ? (
                        this.state.cells.map(cell => (
                            <Cell
                                key={Math.random()}
                                data={cell}
                                play={this.props.play}
                                updateCells={this.updateCells}
                            />
                        ))
                    ) : (
                            <></>
                        )}
                </div>
            </Container>

        )
    }
}

export default Board;