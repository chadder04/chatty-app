import React, { Component } from 'react';

class ImageMessage extends Component {
  render() {
    return (
        <img src={this.props.imgSrc} />
    );
  }
}
export default ImageMessage;
