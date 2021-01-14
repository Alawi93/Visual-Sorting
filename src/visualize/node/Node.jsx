import React, { Component } from 'react'
import './Node.css';
export default class Node extends Component {
    render() {
        const {
            value,
            width,
            isSorted,
        } = this.props;

    const typeClass = isSorted?'isSorted':"";
       
    const nodeStyle = {
        height: value,
        width: width,
      };
        return (
            <div
            id={`node-${value}`}
            className={`node ${typeClass}`}
            style={nodeStyle}
            >
            {value}
            </div>
        )
    }
}
