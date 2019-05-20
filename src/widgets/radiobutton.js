import React from "react";
import ReactDOM from "react-dom";

/**
 *
 */
export class RadioButton extends React.Component {

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
    return (<label className="radiocontainer">{this.props.children}
      <input type="radio" defaultChecked="checked" name="radio" />
      <span className="checkmark"></span>
    </label>);
  }
}

export default RadioButton;
