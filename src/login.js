import React from "react";
import ReactDOM from "react-dom";

import '../styles/wmgr/login.css';

/**
 *
 */
export class LoginDialog extends React.Component {

  /**
  *
  */
  constructor(props){
    super(props);
  }

  /**
   *
   */
  handleKeyPress () {
    console.log ("handleKeyPress ()");
  	
  }

  /**
   *
   */
  handleChangeUsername () {
    console.log ("handleChangeUsername ()");
  	
  }  

  /**
   *
   */
  onLogin () {
    console.log ("onLogin ()");
  	if (this.props.onLogin) {
  	  this.props.onLogin ();
  	}
  }

  /**
   *
   */  
  render() {
    return (<div className="desktopContainer">
      <div className="loginWindow">      
        <div className="macribbon" style={{height: "24px"}}>Login</div>
        <div className="loginarea">
          <div className="padding"></div>
          <input type="email" className="textinput" placeholder="Username" required onChange={(e) => this.handleChangeUsername (e)} onKeyPress={(e) => this.handleKeyPress (e)} />
          <br/>
          <input type="password" className="textinput" placeholder="Password" required onChange={(e) => this.handleChangePassword (e)}  onKeyPress={(e) => this.handleKeyPress (e)} />
          <br/>
          <button className="largeButton" style={{margin: "4px"}} onClick={this.onLogin.bind(this)}>Login</button><br/>
        </div>
      </div>
    </div>
    );
  }
}

export default LoginDialog;
