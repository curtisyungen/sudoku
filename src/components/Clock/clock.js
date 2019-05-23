import React, { Component } from "react";
import Container from "../Container/container";
import "./clock.css";

import moment from "moment";

class Clock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: null,
            timer: null,
        }
    }

    componentDidMount = () => {
        this.props.start();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.play !== this.props.play) {
            if (this.props.play) {
                this.setState({
                    counter: "00:00",
                }, () => {this.startTimer()});
            }
            else {
                this.stopTimer();
            }
        }
    }

    startTimer = () => {
        let count, counter = 0;
        let $this = this;
        
        let timer = setInterval(function() {
            count = moment().minute(0).second(counter++).format('mm:ss');

            $this.setState({
                counter: count,
            });
        }, 1000);

        this.setState({
            timer: timer,
        });
    }

    stopTimer = () => {
        clearInterval(this.state.timer);
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