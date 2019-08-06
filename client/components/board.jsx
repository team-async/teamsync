import React, {Component} from 'react';
import Circle from './Circle.jsx';

class Board extends Component {
  constructor(props){
    super(props)
  }

  render(){
    // some logic goes here
    // instead of a loading message, perhaps we could do a cool loading animtion while the page is rendering
    const loading = 'Loading...';
    // loading could also be a Component that has some dope stlying, just a thought
    const peeps = [];
    // const sub = [];
    let people = this.props.people.slice();
    // eventaully we will change the logic so that only 4 people go to each circle
    // we need to add this conditional, otherwise we will get errors trying to access props
    // since we need to wait for componentDidMount in parent to update state
    let activity;
    if(people.length!==0) {
      // for(let i = 0; i < people.length; i+=4){
      //   let sub = people.slice(i,i+4);
      //   peeps.push(<Circle key={i} group={sub}/>);
      // }
      for(let i = 0; i < 4; i++){
        let idx = Math.floor(Math.random()*people.length);
        let rand = people[idx];
        people.splice(idx, 1);
        peeps.push(rand);
      }
      activity = this.props.activities[Math.floor(Math.random() * 4)];
      // circle = <Circle group={sub}/>;
    }
    return (
      <div className="board">

        {peeps.length!==0 ? (<Circle act={activity} group={peeps}/>): loading}
      </div>
    );
  }
}

export default Board;
