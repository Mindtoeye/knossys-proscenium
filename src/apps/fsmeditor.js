import React from "react";
import ReactDOM from "react-dom";

import CytoscapeComponent from "react-cytoscapejs";

import "../../styles/wmgr/toolbar.css";
import "../../styles/wmgr/fsmeditor.css";

import redoIcon from '../../styles/images/icons/gtk-redo-ltr.png';
import undoIcon from '../../styles/images/icons/gtk-undo-ltr.png';
import okIcon from '../../styles/images/icons/ok.png';

import WindowContent from "../windowcontent";
import ContentEditable from "../widgets/editable";

/**
 * https://github.com/plotly/react-cytoscapejs
 * https://codepen.io/lopis/pen/XYgRKz
 */
export class FSMEditor extends WindowContent {

  /**
  * 
  */
  constructor(props){
    super(props);

    this.state= {
      html: ""
    };
  }

  /**
   *
   */
  addNode () {
    console.log ("addNode ()");

    this.cy.add({ data: { id: "three", label: "Node 3" }, position: { x: 50, y: 50 }, classes: 'bottom-center' });
  }

  /**
   *
   */
  deleteNode () {
    console.log ("deleteNode ()");    
  }

  /**
   * http://js.cytoscape.org/#cy.data
   * https://github.com/plotly/react-cytoscapejs
   */
  process () {
    console.log ("process ()");    

    console.log ("Applying: " + JSON.stringify (this.cy.data()) + " to: " + this.state.html);
  }

  /**
   *
   */
   editDo () {
    console.log ("editDo ()");      
   }

  /**
   *
   */
   editUndo () {
    console.log ("editUndo ()");      
   }   

  /**
   *
   */
  handleChange (event) {    
    this.setState({html: event.target.value});
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
    const style = [{
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
    }];

    return <div className="windowMain">
      <div className="menubar" style={{marginLeft: '2px', marginRight: 'px'}}>
        <button className="defaultButton" onClick={this.addNode.bind(this)}>+</button><br/>
        <button className="defaultButton" onClick={this.deleteNode.bind(this)}>-</button><br/>
        <div className="verticalSeparator" /> 
        <button className="toolButton" onClick={this.editDo.bind(this)}><img src={redoIcon} /></button><br/>
        <button className="toolButton" onClick={this.editUndo.bind(this)}><img src={undoIcon} /></button><br/>
        <div className="verticalSeparator" />         
        <button className="toolButton" onClick={this.process.bind(this)}><img src={okIcon} /></button><br/>        
      </div>
      <ContentEditable html={this.state.html} onChange={this.handleChange.bind(this)} />
      <div className="windowContent">
        <CytoscapeComponent href="graph" cy={cy => this.cy = cy} elements={elements} style={{ width: "400px", height: "400px"}} stylesheet={style} />
      </div>
    </div>;
  }
}

export default FSMEditor;