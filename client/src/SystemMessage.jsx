import React, { Component } from 'react';

class SystemMessage extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="message system">{this.props.messageBody}</div>
    );
  }
}
export default SystemMessage;
