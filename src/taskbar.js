import React from "react";
import ReactDOM from "react-dom";

import TaskBarIcon  from './taskbaricon';

import '../styles/wmgr/taskbar.css';

import arrowDown from '../styles/images/icons/arrow-down.png';
import arrowUp from '../styles/images/icons/arrow-up.png';

const heightFolded=38;
const heightFull=60;

/**
 *
 */
export default class TaskBar extends React.Component {

  /**
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      folded: false,
      taskbarSize: "medium",
      barHeight: heightFull,
      icons: []
    };

    this.onIconClicked = this.onIconClicked.bind(this);
    this.onArrowClicked = this.onArrowClicked.bind(this);
  }

  /**
   * 
   */
  onIconClicked (id) {
    //console.log ("onIconClicked ("+id+")");
    
    if (this.props.onIconClicked) {
      this.props.onIconClicked(id);
    }    
  }

  /**
   *
   */
  addIcon (aFace,aLabel,anId) {
    //console.log ("addIcon("+aFace+","+aLabel+","+anId+")");

    /* 
    for (let i=0;i<arguments.length;i++) {
      console.log ("Arg " + i + ": " + arguments [i]);
    }
    */

    let newIcon={
      type: "icon",
      face: aFace,
      label: aLabel,
      id: anId
    };

    let newIcons=this.state.icons.concat (newIcon);

    //console.trace (newIcon);

    this.setState ({icons: newIcons});
  }

  /**
   *
   */
  addSeparator () {
    let newIcons=this.state.icons.concat ({type:"separator"}); 
    this.setState ({icons: newIcons});
  }
  
  /**
   * 
   */
  onArrowClicked (){
    //console.log ("onArrowClicked ()");
    if (this.state.folded==true) {
      this.setState ({folded: false, taskbarSize: "medium", barHeight: heightFull});  
    } else {
      this.setState ({folded: true, taskbarSize: "small", barHeight: heightFolded});  
    }
  }  

  /**
   *
   */
  render() {
    let arrow;
          
    if (this.state.folded==false) {
      arrow=<div className="taskbarGripper" onClick={this.onArrowClicked}><img src={arrowDown} className="taskbarGripperIconStyle" /></div>
    } else {
      arrow=<div className="taskbarGripper" onClick={this.onArrowClicked}><img src={arrowUp} className="taskbarGripperIconStyle" /></div>
    }
    
    let icons=null;

    if (this.state.icons.length>0) {
      icons=[];
      for (let i=0;i<this.state.icons.length;i++) {
        let icon=this.state.icons [i];

        if (icon.type=="icon") {
          icons.push (<TaskBarIcon key={"icon"+i} tsize={this.state.taskbarSize} icon={icon.face} label={icon.label} appId={icon.id} iconClicked={this.onIconClicked}/>);
        }

        if (icon.type=="separator") {
          icons.push (<div key={"sep"+i} className="taskbarVr"></div> );
        }      
      }
    } else {
      icons="Loading taskbar icons ...";
    }

    return (
      <div className="taskbarBar">
        {icons}
        {arrow}
      </div>
    );
  }
}
