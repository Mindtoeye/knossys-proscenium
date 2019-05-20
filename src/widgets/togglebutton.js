import React from "react";
import ReactDOM from "react-dom";

/**
 *
 */
export class ToggleButton extends React.Component {

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
    return (<label className="togglecontainer">{this.props.children}
      <input type="checkbox" defaultChecked="checked" />
	  <span className="checkmark"></span>
    </label>);
  }
}

export default ToggleButton;
