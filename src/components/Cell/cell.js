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
            value: 0,
            blank: false, 
            color: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            row: this.props.data.row,
            col: this.props.data.col,
            rowSect: this.props.data.rowSect,
            colSect: this.props.data.colSect,
            value: this.props.data.value,
            blank: this.props.blank
        }, () => {this.getColor()});
    }

    getColor = () => {

        let color = "light";

        if (this.state.rowSect % 2 === 0 && this.state.colSect % 2 === 0) {
            color = "dark";
        }

        this.setState({
            color: color,   
        });
    }

    render() {
        return (

            this.props.blank ? (
                <input className={`cell ${this.state.color}`} maxLength="1"></input>
            ) : (
                <input className={`cell ${this.state.color}`} maxLength="1" value={this.state.value} />
            )
        );
    }
}

export default Cell;