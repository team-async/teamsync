import React, { Component } from "react";
import Circle from "./Circle.jsx";

class Board extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // some logic goes here

    const loading = "Loading...";

    const peeps = [];

    let people = this.props.people.slice();

    // we need to add this conditional, otherwise we will get errors trying to access props
    // since we need to wait for componentDidMount in parent to update state
    let activity;
    if (people.length !== 0) {
      //the amount of people is 4, and we use this function to
      //randomize each time which people are drawn from the DB
      for (let i = 0; i < 4; i++) {
        let idx = Math.floor(Math.random() * people.length);
        let rand = people[idx];
        people.splice(idx, 1);
        peeps.push(rand);
      }
      activity = this.props.activities[Math.floor(Math.random() * 4)];
    }
    return (
      <div className="board">
        {/* Pass these people to the circle */}
        {peeps.length !== 0 ? <Circle act={activity} group={peeps} /> : loading}
      </div>
    );
  }
}

export default Board;
