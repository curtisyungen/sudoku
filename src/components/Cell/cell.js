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
            userInput: "",
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
            blank: this.props.data.blank,
        }, () => {this.getColor()});
    }

    componentDidUpdate = (prevProps) => {
        if (!this.props.play) {
            this.props.updateBoardValues(this.state.row, this.state.col, this.state.userInput, this.state.value);
        }
    }

    componentWillUnmount = () => {
        this.props.updateBoardValues(this.state.row, this.state.col, this.state.userInput, this.state.value);
    }

    handleInputChange = (event) => {

        event.preventDefault();

        this.setState({
            userInput: event.target.value
        }, () => {
            this.checkCellValue();
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

    checkCellValue = () => {
        if (this.state.userInput !== "" && this.state.userInput !== this.state.value.toString()) {
            this.setState({
                isCorrect: false,
            });
        }
        else {
            this.setState({
                isCorrect: true,
            });
        }
    }

    render() {
        return (
            <input 
                className={`cell blank-${this.state.blank} correct-${this.state.isCorrect} ${this.state.color}`}  
                maxLength="1" 
                onChange={this.handleInputChange}
                readOnly={!this.state.blank}
                value={this.state.blank && this.props.play ? (this.state.userInput):(this.props.data.value)}
            />
        );
    }
}

export default Cell;