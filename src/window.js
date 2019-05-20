import React from "react";
import ReactDOM from "react-dom";

/**
 *
 */
export class Window extends React.Component {

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
  reIndex (newIndex) {
    console.log ("reIndex ("+newIndex+")");
    this.setState ({index: newIndex});
  }

  /**
   *
   */
  getIndex () {
    return (this.state.index);
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
    let xPos=this.props.xPos;
    let yPos=this.props.yPos;
    let aWidth=this.props.width;
    let aHeight=this.props.height;
    let anIndex=this.state.index;

    return (
    <div id={this.props.id} className="genericWindow" style={{left: xPos, top: yPos, width: aWidth, height: aHeight,zIndex: anIndex}}>
      <div className="macribbon" onClick={() => this.props.popWindow(this.props.id)}>
        Knossys:{this.props.id}
        <div className="standardCloseButton" onClick={() => this.props.deleteWindow(this.props.id)}>
          <svg width="12" height="12" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="11" 
                  x2="11" y2="1" 
                  stroke="white" 
                  strokeWidth="2"/>
            <line x1="1" y1="1" 
                  x2="11" y2="11" 
                  stroke="white" 
                  strokeWidth="2"/>
          </svg>
        </div>
      </div>
      <div className="windowContent">
        {this.props.children}
      </div>
      <div className="statusbar">
      Statusbar
      </div>      
    </div>
    );
  }
}

export default Window;