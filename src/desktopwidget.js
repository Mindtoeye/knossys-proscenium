import React from "react";
import ReactDOM from "react-dom";

/**
 *
 */
export class DesktopWidget extends React.Component {

  /**
  *
  */
  constructor(props){
    super(props);

    this.state = {id: props.id,count: 0, index: props.zIndex};    
  }

  /**
   *
   */
  getWindowId () {
    return (this.state.id);
  }

  /**
   *
   */  
  render() {

    let titleElement;
    let labelElement;

    if (this.props.title) {
      titleElement=<div className="widgetribbon">{this.props.title}</div>
    }

    if (this.props.label) {
      labelElement=<div className="dialogControls">{this.props.label}</div>
    }    

    let xPos=this.props.xPos;
    let yPos=this.props.yPos;

    let aWidth;
    if (this.props.width) {
	    aWidth =this.props.width;
	  }

    let aHeight;
    if (this.props.height) {
	    aHeight=this.props.height;
	  }

    let anIndex=this.state.index;

    return (
    <div id={this.props.id} className="desktopWidget" style={{left: xPos, top: yPos, width: aWidth, height: aHeight,zIndex: anIndex}}>
      {titleElement}
      <div className="desktopWidgetContent">
        {this.props.children}
      </div>
      {labelElement}    
    </div>
    );
  }
}

export default DesktopWidget;
