import React from "react";
import ReactDOM from "react-dom";

/**
 *
 */
class ContentEditable extends React.Component {

  /**
   *
   */
  shouldComponentUpdate (nextProps) {
    return nextProps.html !== this.ref.innerHTML;
  }

  /**
   *
   */
  componentDidUpdate () {
    if ( this.props.html !== this.ref.innerHTML ) {
      this.ref.innerHTML = this.props.html;
    }
  }

  /**
   *
   */
  emitChange () {
    var html = this.ref.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
      target: {
        value: html
      }
     });
    }
    this.lastHtml = html;
  }

  /**
   *
   */
  render () {
    return <div className="regexEditor"
      onInput={this.emitChange.bind(this)} 
      onBlur={this.emitChange.bind(this)}
      contentEditable
      dangerouslySetInnerHTML={{__html: this.props.html}}
      ref={r=>this.ref = r}>
    </div>;
  }    
}

export default ContentEditable;