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
    let people = this.props.people;
    // eventaully we will change the logic so that only 4 people go to each circle
    // we need to add this conditional, otherwise we will get errors trying to access props
    // since we need to wait for componentDidMount in parent to update state
    if(people.length!==0) {
      for(let i = 0; i < people.length; i++){
        peeps.push(<Circle key={i} person={this.props.people[i]}/>);
      }
    }
    return (
      <div className="board">
        {peeps.length!==0 ? peeps: loading}
      </div>
    );
  }
}

export default Board;
