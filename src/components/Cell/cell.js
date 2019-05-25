import React, { Component } from "react";
import "./cell.css";

class Cell extends Component {

    constructor(props) {
        super(props);

        this.state = {
            row: null,
            col: null,
            rowSect: null,
            colSect: null,
            value: "",
            blank: null, 
            color: null,
            isCorrect: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            row: this.props.data.row,
            col: this.props.data.col,
            rowSect: this.props.data.rowSect,
            colSect: this.props.data.colSect,
            value: this.props.data.value,
            userInput: this.props.data.userInput,
            blank: this.props.data.blank,
            isCorrect: this.props.data.isCorrect,
        }, () => {
            this.getColor();
        });
    }

    handleInputChange = (event) => {
        this.setState({
            userInput: event.target.value
        }, () => {
            this.props.updateCells(this.state.row, this.state.col, this.state.userInput);
        });
    }

    getColor = () => {

        let color = "light";

        if (this.state.rowSect % 2 === 0 && this.state.colSect % 2 === 0) {
            color = "dark";
        }

        if (this.state.rowSect === 1 && this.state.colSect === 1) {
            color = "dark";
        }

        this.setState({
            color: color,   
        });
    }

    render() {
        return (
            <input 
                className={`cell blank-${this.state.blank} correct-${this.props.data.isCorrect} ${this.state.color}`}  
                maxLength="1" 
                onChange={this.handleInputChange}
                readOnly={!this.state.blank}
                type="number"
                value={this.state.blank && this.props.play ? (this.state.userInput || ""):(this.props.data.value)}
            />
        );
    }
}

export default Cell;