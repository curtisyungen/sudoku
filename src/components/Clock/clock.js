import React, { Component } from "react";
import Container from "../Container/container";
import "./clock.css";

import moment from "moment";

class Clock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            play: false,
            counter: "00:00",
        }
    }

    componentDidMount = () => {
        this.setState({
            play: this.props.play,
        });
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.play != this.props.play) {
            this.setState({
                play: this.props.play,
            });
        }

        if (prevState.play != this.state.play) {
            if (this.state.play) {
                this.startTimer();
                this.setState({
                    counter: "00:00",
                });
            }
            else {
                this.stopTimer();
            }
        }
    }

    startTimer = () => {

        let count, counter = 1;
        let $this = this;
        
        let timer = setInterval(function() {

            count = moment().minute(0).second(counter++).format('mm:ss');

            if (!$this.state.stop) {
                $this.setState({
                    counter: count,
                });
            }
        }, 1000);

        this.setState({
            timer: timer,
        });
    }

    stopTimer = () => {
        this.setState({
            stop: true,
        });

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