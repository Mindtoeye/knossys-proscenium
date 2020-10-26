import React from "react";
import ReactDOM from "react-dom";

import ApplicationDriver from './applicationdriver';

import iconFinite from '../styles/images/finite.png';
import FSMEditor from './apps/fsmeditor'

import DigitalClock from "./widgets/digitalclock";
import Clock from './widgets/clock';
import Dial from './widgets/dial';
// https://www.npmjs.com/package/react-google-charts
import Chart from 'react-google-charts';

// https://casesandberg.github.io/react-color/
import { SketchPicker } from 'react-color';

import { uuidv4 } from './tools/uuid';

const dataA = [
  ["Age", "Weight"],
  [8, 12],
  [4, 5.5],
  [11, 14],
  [4, 5],
  [3, 3.5],
  [6.5, 7]
];

const dataB = [
  [
    { type: 'number', label: 'x' },
    { type: 'number', label: 'values' },
    { id: 'i0', type: 'number', role: 'interval' },
    { id: 'i1', type: 'number', role: 'interval' },
    { id: 'i2', type: 'number', role: 'interval' },
    { id: 'i2', type: 'number', role: 'interval' },
    { id: 'i2', type: 'number', role: 'interval' },
    { id: 'i2', type: 'number', role: 'interval' },
  ],
  [1, 100, 90, 110, 85, 96, 104, 120],
  [2, 120, 95, 130, 90, 113, 124, 140],
  [3, 130, 105, 140, 100, 117, 133, 139],
  [4, 90, 85, 95, 85, 88, 92, 95],
  [5, 70, 74, 63, 67, 69, 70, 72],
  [6, 30, 39, 22, 21, 28, 34, 40],
  [7, 80, 77, 83, 70, 77, 85, 90],
  [8, 100, 90, 110, 85, 95, 102, 110],
];

const options = {
  title: "Age vs. Weight comparison",
  titleTextStyle: {
    color: '#cccccc'
  },
  hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
  vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
  legend: "none",
  hAxis: {
    titleTextStyle: {color: '#607d8b'}, 
    textStyle: { 
      color: '#b0bec5', 
      fontSize: '8', 
      bold: true}
  },
  vAxis: {
    titleTextStyle: {color: '#607d8b'}, 
    textStyle: { 
      color: '#b0bec5', 
      fontSize: '8', 
      bold: true}
  },      
  backgroundColor: 'transparent',
  chartArea: {
    width: '80%', 
    height: '80%',
    'backgroundColor': {
      'fill': '#444444',
      'opacity': 100
    }
  },
  series: {
    0: { color: '#dada76' }
  }
};

/**
 *
 */
export default class ApplicationManager extends ApplicationDriver {
	
  /**
   *
   */	
  constructor (aSetDriverData,aGetDriverData,aGetDriverReference,aSetAppData,aGetAppData,aGetAppReference) {
  	super ();

  	this.apps=null;

  	this.setDriverData=aSetDriverData;
  	this.getDriverData=aGetDriverData;
  	this.getDriverReference=aGetDriverReference;
  	this.setAppData=aSetAppData;
  	this.getAppData=aGetAppData;
  	this.getAppReference=aGetAppReference;
  }

  /**
   *
   */
  init () {
	return (null);
  }

  /**
   *
   */
  toggle (anId) {
    console.log ("toggle ("+anId+")");

    let appData=this.getAppData();

    for (let i=0;i<appData.length;i++) {
      let app=appData [i];

      if (app.id==anId) {
      	if (app.shown==true) {
      	  app.shown=false;
      	} else {
      	  app.shown=true;
      	}
      }
    }

    this.setAppData (appData);
  }

  /**
   *
   */
  pushApps () {
  	this.apps=this.getAppData ();
  }

  /**
   *
   */
  popApps () {
    this.setAppData (this.apps,() => {});	
  }

  /**
   *
   */
  build () {
  	console.log ("build ()");

  	this.pushApps ();

    this.addApplication ({
      window:<FSMEditor />,
      application: null,
      icon: iconFinite,
      name: "FSM Editor",
      type: "window"
    });

    this.addApplication ({
      window:<SketchPicker />, 
      application: null,
      name: "Color Chooser",
      type: "panel",
      x: 50,
      y: 50
    });

    this.addApplication ({
      window:<Chart width={300} height={300} chartType="ScatterChart" data={dataA} options={options} legendToggle />, 
      application: null,
      name: "Chart (error)",
      type: "panel",
      x: 700,
      y: 400
    });

    this.addApplication ({
      window:<Dial />, 
      application: null,
      name: "Net Speed",
      label: "Net Speed",
      type: "widget",
      x: 50,
      y: 420
    });

    this.addApplication ({
      window:<DigitalClock zones="Los Angeles:US/Pacific,New York:US/Eastern,Tokyo:Asia/Tokyo,Amsterdam:Europe/Amsterdam" />, 
      application: null,
      name: "Digital Clock",
      type: "widget",
      x: 450,
      y: 50
    });

    this.addApplication ({
      window:<Clock />, 
      application: null,
      name: "Analog Clock",
      label: "Local Time",
      type: "widget",
      x: 300,
      y: 50
    });

    this.addApplication ({
      window:<Chart width={300} height={300} chartType="LineChart" data={dataB} loader={<div>Loading Chart</div>} options={options}/>, 
      application: null,
      name: "Chart (Line)",
      type: "panel",
      x: 300,
      y: 400
    });

    this.popApps ();
  }

  /**
   *
   */
  addApplication (anApplication, aCallback) {
    if (this.apps==null) {
      this.pushApps ();	
    }

    anApplication.shown=false;
    anApplication.id=uuidv4();
    this.apps.push (anApplication);
  }
};
