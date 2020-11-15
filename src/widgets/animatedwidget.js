import React from "react";
import ReactDOM from "react-dom";

// https://stackoverflow.com/questions/58574393/how-do-i-integrate-a-background-js-animation-into-my-react-app

const {
  useRef,
  useLayoutEffect,
} = React

function R(max) {
  return Math.random() * max
};

/**
 *
 */
export class AnimatedWidget extends React.Component {

  /**
   *
   */
  constructor(props){
    super(props);

    this.state={
    }
  }

  /**
   *
   */
  componentDidMount() {
    console.log ("componentDidMount()");
  }  

  /**
   *
   */
  componentWillUnmount() {
    console.log ("componentWillUnmount()");
  }

  /**
   *
   */
  render () { 
    return (<div className={this.props.className}>{this.props.children}</div>);
  }
}

export default AnimatedWidget;
