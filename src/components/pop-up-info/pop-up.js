import React from 'react';
import { Transition } from 'react-transition-group';
import './pop-up.css';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};


class PopUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: false
        }
    }

    componentDidMount() {
        this.setState({animate: true})
        setTimeout(() => {this.setState({animate: false})}, 4000)
    }

    componentWillUnmount() {
        this.setState({animate: false})
    }

    render() {
        return (
            <Transition in={this.state.animate} timeout={duration}>
                {state => (
                <div className={`pop-up-${this.props.type}`} style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    <strong>{this.props.content}</strong> 
                </div>)}
            </Transition>    
        );
    }
}

export default PopUp;