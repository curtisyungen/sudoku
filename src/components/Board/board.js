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
            errors: 0,
        }
    }

    componentDidMount = () => {

        this.setState({
            play: this.props.play,
        });
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.play !== this.props.play) {
            if (this.props.play) {
                this.getNewGame();
            }
            else {
                this.checkCellValues();
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
                    isCorrect: null,
                });
            }

            limit += 1;
        }

        // Update cells array in state
        this.setState({
            cells: cells,
            errors: 0,
        });
    }

    getBlank = () => {
        if (this.props.play) {
            return Math.random() > 0.5;
        }

        return false;
    }

    updateCells = (row, col, userInput) => {

        // Get cells array
        let cells = this.state.cells;

        // Calculate index in cells array
        let count = row * 9 + col;

        // Determine if user input matches cell value. Possible values = true, false, null
        let isCorrect = userInput !== "" && userInput !== null ? (parseInt(userInput) === cells[count].value):(null);

        // If user input is incorrect, increment error count
        let errors = this.state.errors;
        
        if (isCorrect === false) {
            errors += 1;

            this.setState({
                errors: errors
            });
        }

        // If user has made three errors, end game
        if (errors >= 3) {
            this.props.endGame("solve");
            return;
        }

        // Update userInput and isCorrect attributes in cell array
        cells[count].userInput = parseInt(userInput);
        cells[count].isCorrect = isCorrect;

        // Update cell array in state
        this.setState({
            cells: cells,
        });

        this.checkCellValues();
    }

    checkCellValues = () => {

        // Get cells array
        let cells = this.state.cells;

        // Loop through blank cells array to find incorrect cells
        for (var c in cells) {
            if (cells[c].blank) {
                if (cells[c].isCorrect !== true) {
                    this.props.getResult("incomplete");
                    return;
                }
            }
        }

        this.props.getResult("complete");
    }

    render() {
        return (
            <Container>
                <div className="errors">
                    Mistakes: {this.state.errors} / 3
                </div>

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