import React from "react";
import ReactDOM from "react-dom";

import '../styles/wmgr/connect.css';

import waitingIcon from '../styles/images/bx_loader.gif';

/**
 *
 */
export class ConnectionDialog extends React.Component {

  /**
  *
  */
  constructor(props){
    super(props);

    this.state={
      waitingMessage: "Connecting to services",
      prosceniumEnabled: false,
      chaperoneEnabled: false,
      dbEnabled: false,
      mainEnabled: false,
      sparkEnabled: false
    };
  }

  /**
   *
   */
  componentDidUpdate(prevProps) {    
    if (this.props.timeout !== prevProps.timeout) {
      this.setState ({waitingMessage: ("Connecting to services in " + this.props.timeout)});
    }
  }

  /**
   *
   */  
  render() {

    let prosceniumClass="serviceIcon smallProscenium iconDisabled";
    if (this.props.state.prosceniumEnabled==true) {
      prosceniumClass="serviceIcon smallProscenium iconEnabled";
    }
    let chaperoneClass="serviceIcon smallChaperone iconDisabled";
    if (this.props.state.chaperoneEnabled==true) {
      chaperoneClass="serviceIcon smallChaperone iconEnabled";
    }    
    let dbClass="serviceIcon smallDB iconDisabled";
    if (this.props.state.dbEnabled==true) {
      dbClass="serviceIcon smallDB iconEnabled";
    }    
    let mainClass="serviceIcon smallMain iconDisabled";
    if (this.props.state.mainEnabled==true) {
      mainClass="serviceIcon smallMain iconEnabled";
    }    
    let sparkClass="serviceIcon smallSpark iconDisabled";
    if (this.props.state.sparkEnabled==true) {
      sparkClass="serviceIcon smallSpark iconEnabled";
    }    

    return (<div className="desktopContainer">
	    <div className="connectWindow">
	      <div className="macribbon" style={{height: "24px"}}></div>
	      <img src={waitingIcon} className="loaderStyle"/>
	      <div className="connectLabel">
	      {this.state.waitingMessage}
	      </div>
	      <div className="servicesBar">
	        <div id="icon_proscenium" className={prosceniumClass}></div>
	        <div id="icon_chaperone" className={chaperoneClass}></div>
	        <div id="icon_db" className={dbClass}></div>
	        <div id="icon_main" className={mainClass}></div>
	        <div id="icon_spark" className={sparkClass}></div>        
	      </div>
	    </div>

    </div>
    );
  }
}

export default ConnectionDialog;
