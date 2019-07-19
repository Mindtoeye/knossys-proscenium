import React from "react";
import ReactDOM from "react-dom";

import DesktopWidget from "../desktopwidget";

// https://github.com/Reggino/react-svg-gauge#readme
import Gauge from 'react-svg-gauge';

import { getRandomArbitrary, getRandomInt } from '../tools/random.js';

/**
 *
 */
export class Dial extends React.Component {

  /**
   *
   */
  constructor(props){
    super(props);

    this.state={
      value: 40
    }

    setInterval (() => { 
      let newValue=getRandomInt (0,180);
      this.setState ({value: newValue});
    },1000);
  }

  /**
   *
   */
  render () { 
    return (<Gauge value={this.state.value} width={140} height={120} min={0} max={180} label="" />);
  }
}

export default Dial;
