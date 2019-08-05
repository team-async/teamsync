import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Board from './board.jsx';

// we might need to manually hide the keys in each of our own forked repos
firebase.initializeApp({
  apiKey: "AIzaSyAzK49FT1nwhi8-BLl2kRtZvFnVtvWsH9A",
  authDomain: "team-sync-248717.firebaseapp.com"
});

class App extends Component {
  constructor(props){
    super(props)
    this.state = { isSignedIn: false,
                    people: []
                  };
    }
    uiConfig = {
      signInFlow: "popup",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccess: () => false
      }
  };

  // check if a user is logged in, if so send info to db, then setState
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      // user is now logged in
      
      this.setState({ isSignedIn: !!user });
      console.log("user test", user);
      const fullName = user.displayName.split(' ');
      const [firstname,lastname] = [fullName[0],fullName[1]];
      const email = user.email;
      const body = {
        firstname,
        lastname,
        email
      };
      // send post request to our server with user's info as the body
      fetch('/main',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      .then(results => results.json())
      .then(people => {
        // update state with an array of people in our db
        this.setState({people: people})
      })
      .catch(e => console.log(e))
    });
  };

  render() {
    // console.log("fireBaseAuth", firebase.auth().displayName);
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <Board people={this.state.people}/>
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

export default App;
