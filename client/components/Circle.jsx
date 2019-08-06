import React, {Component} from 'react';

class Circle extends Component {
  constructor(props){
    super(props)
  }

  render(){
    // we might be getting 4 people instead of 1, then we can figure out how to display each circle
    return (
      <div className='circle'>
        <p>{this.props.person.firstname} {this.props.person.lastname}</p>
      </div>
    );
  }
}

export default Circle;
