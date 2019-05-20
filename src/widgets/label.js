import React from "react";
import ReactDOM from "react-dom";

/**
 *
 */
export class Label extends React.Component {

  /**
   *
   */
  constructor(props){
    super(props);
  }

  /**
   *
   */
  render () {
    return (<div className="fixedLabel">{this.props.children}</div>);
  }
}

export default Label;
