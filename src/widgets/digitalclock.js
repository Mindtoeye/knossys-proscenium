import React from "react";
import ReactDOM from "react-dom";

import DesktopWidget from "../desktopwidget";

// https://www.npmjs.com/package/react-live-clock
import ClockDigital from 'react-live-clock';

// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

/**
 *
 */
export class DigitalClock extends React.Component {

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
  	let zones=[];
 
    if (this.props.zones){
      let splitter=this.props.zones.split(",");

      for (let i=0;i<splitter.length;i++) {
      	let clockString=splitter [i];
      	let zoneSplitter=clockString.split(":");

      	if (i>0) {
      	  zones.push (<div key={"sep"+i} className="separator"/>);
      	}

        zones.push(<div key={"label"+i} className="stackRow stackRowTight label">{zoneSplitter [0]}</div>);

        zones.push(<div key={"clock"+i} className="stackRow"><ClockDigital format={'HH:mm:ss'} ticking={true} timezone={zoneSplitter[1]} /></div>);
      }
    }

    return (
      <div className="stackVertical">
        {zones}
      </div>);
  }
}

export default DigitalClock;
