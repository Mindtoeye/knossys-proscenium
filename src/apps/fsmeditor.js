import React from "react";
import ReactDOM from "react-dom";

import CytoscapeComponent from "react-cytoscapejs";

import WindowContent from "../windowcontent";

/**
 * https://github.com/plotly/react-cytoscapejs
 */
export class FSMEditor extends WindowContent {

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

    // view-source:http://js.cytoscape.org/demos/labels/code.js
    const elements = [
       { data: { id: "one", label: "Node 1" }, position: { x: 50, y: 50 }, classes: 'bottom-center' },
       { data: { id: "two", label: "Node 2" }, position: { x: 100, y: 100 }, classes: 'bottom-center' },
       { data: { source: "one", target: "two", label: "Edge from Node1 to Node2" } },
       { data: { source: "one", target: "one", label: "Edge from Node1 to Node1" } }
    ];

    // http://js.cytoscape.org/#style/
    const style = [
    {
      selector: 'node',
      style: {
        'content': 'data(id)',
        'background-color': '#cccccc',
        'border-style': 'solid',
        'border-color': 'black',
        'line-color': 'black',
        'border-width': '1px'
      }
    },
    {
      selector: 'edge',
      style: {
        'line-color': '#dada76',
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': '#dada76'
      }
    }
  ];

    return <div className="windowMain">
      <div className="menubar"></div>
      <div className="windowContent">
        <CytoscapeComponent cy={cy => this.cy = cy} elements={elements} style={{ width: "400px", height: "400px"}} stylesheet={style} />
      </div>  
    </div>;
  }
}

export default FSMEditor;