import React, { Component } from "react";
import Container from "../Container/container";
import "./clock.css";

import moment from "moment";

class Clock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: "00:00",
            stop: false,
        }
    }

    componentDidMount = () => {

        let timer;

        this.setState({
            counter: this.props.counter,
            stop: this.props.stop,
        }, () => {
            this.startTimer(timer);
        });
    }

    componentDidUpdate = (prevState) => {

        let $this = this;

        if (prevState.stop != this.props.stop) {
            $this.setState({
                stop: true,
            });
        }
    }

    startTimer = (timer) => {

        let count, counter = 1;
        let $this = this;
        
        timer = setInterval(function() {

            count = moment().minute(0).second(counter++).format('mm:ss');

            if (!$this.state.stop) {
                $this.setState({
                    counter: count,
                });
            }
        }, 1000);

        
    }

    render() {

        return (
            <Container>
                <div className="clock">
                    {this.state.counter}
                </div>
            </Container>
        );
    }
}

export default Clock;