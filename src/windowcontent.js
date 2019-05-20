import React from "react";
import ReactDOM from "react-dom";

/**
 *
 */
export class WindowContent extends React.Component {

  /**
  *
  */
  constructor(props){
    super(props);       
  }

  /**
   *
   */  
  render() {
    return (<div >{this.props.label}      
    </div>);
  }
}

export default WindowContent;