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
            play: false,
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

    handleInputChange = (event) => {
        console.log(event.target.value);
        this.setState({
            userInput: event.target.value
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
                className={`cell blank-${this.state.blank} ${this.state.color}`}  
                maxLength="1" 
                onChange={this.handleInputChange}
                readOnly={!this.state.blank}
                value={this.state.blank && this.props.play ? (this.state.userInput):(this.props.data.value)}
            />
        );
    }
}

export default Cell;