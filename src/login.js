import React from "react";
import ReactDOM from "react-dom";

import '../styles/wmgr/login.css';

import AnimatedWidget from './widgets/animatedwidget';

/**
 *
 */
export class LoginDialog extends React.Component {

  /**
  *
  */
  constructor(props){
    super(props);

    this.state={
      username: "",
      password: ""
    }
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
  handleChangeUsername (e) {
    console.log ("handleChangeUsername ()");
  	
    this.setState ({
      username: e.target.value
    });
  }

  /**
   *
   */
  handleChangePassword (e) {
    this.setState ({
      password: e.target.value
    });    
  }

  /**
   *
   */
  onLogin () {
    console.log ("onLogin ()");
  	if (this.props.onLogin) {
  	  this.props.onLogin (this.state.username,this.state.password);
  	}
  }

  /**
   *
   */  
  render() {
    let username;
    let btnLabel="Unlock";

    if (this.props.hasOwnProperty('unlock')) {
      if (this.props.unlock==false) {
        btnLabel="Login";
        username=<input type="email" className="logintextinput" placeholder="Username" value={this.state.username} required onChange={(e) => this.handleChangeUsername (e)} onKeyPress={(e) => this.handleKeyPress (e)} />;
      }
    } else {
      btnLabel="Login";
      username=<input type="email" className="logintextinput" placeholder="Username" value={this.state.username} required onChange={(e) => this.handleChangeUsername (e)} onKeyPress={(e) => this.handleKeyPress (e)} />;      
    }

    return (<AnimatedWidget className="desktopContainer">
      <div className="loginWindow">      
        <div className="macribbon" style={{height: "24px"}}>Login</div>
        <div className="loginarea">
          {username}
          <input type="password" className="logintextinput" placeholder="Password" value={this.state.password} required onChange={(e) => this.handleChangePassword (e)}  onKeyPress={(e) => this.handleKeyPress (e)} />
          <br/>
          <button className="largeButton" style={{margin: "4px"}} onClick={this.onLogin.bind(this)}>{btnLabel}</button><br/>
        </div>
      </div>
    </AnimatedWidget>
    );
  }
}

export default LoginDialog;
