import React from "react";
import ReactDOM from "react-dom";

import '../styles/wmgr/connect.css';

import waitingIcon from '../styles/images/bx_loader.gif';

const waitingmessage="Connecting to services";

/**
 *
 */
export class ConnectionDialog extends React.Component {

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
    return (<div className="desktopContainer">

	    <div className="connectWindow">
	      <div className="macribbon" style={{height: "24px"}}></div>
	      <img src={waitingIcon} className="loaderStyle"/>
	      <div className="connectLabel">
	      {waitingmessage}
	      </div>
	      <div className="servicesBar">
	        <div id="icon_proscenium" className="serviceIcon smallProscenium"></div>
	        <div id="icon_chaperone" className="serviceIcon smallChaperone"></div>
	        <div id="icon_db" className="serviceIcon smallDB"></div>
	        <div id="icon_main" className="serviceIcon smallMain"></div>
	        <div id="icon_spark" className="serviceIcon smallSpark"></div>        
	      </div>
	    </div>

    </div>
    );
  }
}

export default ConnectionDialog;
