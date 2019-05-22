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
            blank: this.props.data.blank
        }, () => {this.getColor()});
    }

    componentDidUpdate = (prevProps) => {
        console.log("Cell Props", this.props);
        if (prevProps.play != this.props.play) {
            if (!this.props.play) {
                this.setState({
                    blank: false,
                });
            }
        }
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

            this.props.data.blank ? (
                <input className={`cell blank ${this.state.color}`} maxLength="1"></input>
            ) : (
                <input className={`cell const ${this.state.color}`} maxLength="1" value={this.state.value} readOnly/>
            )
        );
    }
}

export default Cell;