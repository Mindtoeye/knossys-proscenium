import React from "react";
import ReactDOM from "react-dom";

import DesktopWidget from "../desktopwidget";

// https://www.npmjs.com/package/react-radial-gauge
import Gauge from 'react-radial-gauge';

/**
 *
 */
export class Dial extends React.Component {

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
  	let opts = {
  	  currentValue: 40,
  	  size: 120,
  	  tickColor: '#dada76',
  	  dialColor: '#dada76'
    }
 
    return (<DesktopWidget title={this.props.title} label={this.props.label} xPos={this.props.xPos} yPos={this.props.yPos}>
      <Gauge {...opts} />
    </DesktopWidget>);
  }
}

export default Dial;
