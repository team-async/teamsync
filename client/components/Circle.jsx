import React, { Component } from "react";

class Circle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const display = [];
    const group = this.props.group;
    for (let i = 0; i < group.length; i++) {
      display.push(
        <p className="text">
          {group[i].firstname} {group[i].lastname}
        </p>
      );
    }
    return (
      <div className="circle">
        {display}
        <p className="activity">Activity: {this.props.act}</p>
      </div>
    );
  }
}

export default Circle;
