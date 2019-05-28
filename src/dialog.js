import React from "react";
import ReactDOM from "react-dom";

/**
 *
 */
export class Dialog extends React.Component {

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
    let className="dialogWindow";

    if (this.props.centered) {
      if (this.props.centered=="true") {
        className="dialogWindow centered";
      }
    }

    return (
    <div id={this.props.id} className={className} style={{left: xPos, top: yPos, width: aWidth, height: aHeight,zIndex: anIndex}}>
      <div className="macribbon" onClick={() => this.props.popWindow(this.props.id)}>
        Knossys:{this.props.id}
      </div>
      <div className="dialogContent">
        {this.props.children}
      </div>
      <div className="dialogControls">
        <button className="largeButton" onClick={() => this.props.deleteWindow(this.props.id)}>Ok</button>
      </div>      
    </div>
    );
  }
}

export default Dialog;