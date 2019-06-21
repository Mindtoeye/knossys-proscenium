import React from "react";
import ReactDOM from "react-dom";

import ResizablePanels from "./widgets/resizable";

import "../styles/wmgr/resizable.css";

/**
 *
 */
export class WindowContent extends React.Component {

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
    return (<ResizablePanels>
      <div>
        This is the first panel. It will use the rest of the available space.
      </div>
      <div>
        This is the second panel. Starts with 50px.
      </div>
      <div>
        This is the third panel. Starts with 50px.
      </div>
    </ResizablePanels>);
  }
}

export default WindowContent;