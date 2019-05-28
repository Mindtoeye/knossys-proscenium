import React from "react";
import ReactDOM from "react-dom";

/**
 *
 */
export class Switch extends React.Component {

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
  	let label;
  	if (this.props.label) {
  	  label=this.props.label;
  	}
    return (<div> <input className="tgl tgl-ios" id="cb2" type="checkbox"/><label className="tgl-btn" htmlFor="cb2"></label>{label}</div>);
  }
}

export default Switch;
