import React, { Component } from "react";
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';



// main component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isSignedIn=false};
    // functions to bind later
  }

// componentDidMount(

// )

  render() {
    return (
        this.state.isSignedIn ? 
        <Home/>
        :
        <div>Not Signed In!</div>
       
    );
  }
}

export default App;
