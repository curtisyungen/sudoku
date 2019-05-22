import React, { Component } from "react";
import Container from "../Container/container";
import Cell from "../Cell/cell";
import "./board.css";

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cells: [],
            play: false,
        }
    }

    componentDidMount = () => {
        this.setState({
            play: this.props.play,
        });
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.play != this.props.play) {
            if (this.props.play) {
                this.getNewGame();
            }
        }
    }

    getNewGame = () => {

        let row, col, rowSect, colSect, limit = 0;
        let cells = [];
        let values;

        while (cells.length < 81 && limit < 10000) {
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
                for (var i = 0; i < 9; i++) {
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
        return Math.random() > 0.5;
    }

    render() {
        return (
            <Container>
                <div className="board">
                    {this.state.cells.length || this.state.restart ? (
                        this.state.cells.map(cell => (
                            <Cell
                                key={Math.random()}
                                data={cell}
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