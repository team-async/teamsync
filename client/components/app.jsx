import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Board from "./board.jsx";
import Button from "@material-ui/core/Button";

// hide these keys in the repo;
//Using firebase and Google's API for Oauth and Calendar access require a config with these details.
const config = {
  //your personal api keys and clientId go here. 
  apiKey: "AIzaSyAzK49FT1nwhi8-BLl2kRtZvFnVtvWsH9A",
  authDomain: "team-sync-248717.firebaseapp.com",
  clientId: '996183924139-j2d6i9ekcu9rs8tbt7k5osf03bkrgosq.apps.googleusercontent.com',
  scopes: ["email", "profile", "https://www.googleapis.com/auth/calendar"],
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
};

// Once the config is created firebase has a built in initialize method to instantiate the configuration for the app.
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      people: [],
      activities: ["Walk to the Beach", "Lunch", "Coffee", "Play Board Games"]
    };
  }
  //  the uiConfig dictates how the Oauth appears, i.e. as a popup that redirects to Google's sign in.
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        scopes: config.scopes
      }
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  // check if a user is logged in, if so send info to db, then setState
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      // user is now logged in

      this.setState({ isSignedIn: !!user });
      const fullName = user.displayName.split(" ");
      const [firstname, lastname] = [fullName[0], fullName[1]];
      const email = user.email;
      const body = {
        firstname,
        lastname,
        email
      };

      // send post request to our server with user's info as the body
      fetch("/main", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
        .then(results => results.json())
        .then(people => {
          // update state with an array of people in our db
          this.setState({ people: people });

          this.getEvents(user.email);
        })
        .catch(e => console.log(e));
    });
  };
  /*there appears to be some sort of error here
not breaking the program at this time, but throwing syntax errors
*/

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <div>
            <h1 className="header">
              Welcome {firebase.auth().currentUser.displayName}
              <Button
                variant="contained"
                color="primary"
                onClick={() => firebase.auth().signOut()}
              >
                Sign out!
              </Button>
            </h1>
            <h3 className="subheading">This Week's Picks are...</h3>
            <Board
              activities={this.state.activities}
              people={this.state.people}
            />
          </div>
        ) : (
          <div className="home">
            <h1 id="header">TEAMSYNC</h1>

            <h3 className="homepage-header">
              Sign in for endless team bonding possibilities...
            </h3>
            {/* If not signed in, the firebase button for Oauth sign in should be present */}
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
