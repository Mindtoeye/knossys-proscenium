import React from 'react';
import PropTypes from 'prop-types';

import styles from  '../styles/wmgr/taskbaricon.css';

/**
 * 
 */
export default class TaskBarIcon extends React.Component {  

  /**
   * 
   */
  constructor (props) {
    super(props);
  }	

  /**
   * 
   */  
  handleIconClicked (e) {
    //console.log ("handleIconClicked ("+e+")");  
    if (typeof this.props.iconClicked === 'function') {
      this.props.iconClicked(e);
    }    
  }  
  
  /**
   * 
   */  
  render() {
    if (this.props.tsize=="small") {
      return (
        <div className="iconBaseSmall" onClick={(e) => this.handleIconClicked(this.props.appId)}>   
          <div className="iconFaceSmall">
            <img src={this.props.icon} className="iconFaceSmall" />
          </div>
        </div>
      );       
    } 
      
    return (
        <div className="iconBaseSmall" onClick={(e) => this.handleIconClicked(this.props.appId)}>   
          <div className="iconFaceSmall">
            <img src={this.props.icon} className="iconFaceSmall" />
          </div>
          <div className="iconLabel">
            {this.props.title}
          </div>
        </div>
    );
  }
}
