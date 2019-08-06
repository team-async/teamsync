import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Board from './board.jsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// we might need to manually hide the keys in each of our own forked repos

const config = {
  apiKey: "AIzaSyAzK49FT1nwhi8-BLl2kRtZvFnVtvWsH9A",
  authDomain: "team-sync-248717.firebaseapp.com",
  clientId: '996183924139-j2d6i9ekcu9rs8tbt7k5osf03bkrgosq.apps.googleusercontent.com',
  scopes: ["email", "profile", "https://www.googleapis.com/auth/calendar"],
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
};

firebase.initializeApp(config);



class App extends Component {
  constructor(props){
    super(props)
    this.state = { isSignedIn: false,
                    people: []
                  };
    }
   
    uiConfig = {
      signInFlow: "popup",
      signInOptions: [{provider:firebase.auth.GoogleAuthProvider.PROVIDER_ID, scopes: config.scopes}],
      callbacks: {
        signInSuccessWithAuthResult: () => false
      }
     
    }
    


  // check if a user is logged in, if so send info to db, then setState
  componentDidMount = () => {
    
    firebase.auth().onAuthStateChanged(user => {
      // user is now logged in
      this.setState({ isSignedIn: !!user });
      console.log("user test", user.displayName, user.email);
     
      const fullName = user.displayName.split(' ');
      const [firstname,lastname] = [fullName[0],fullName[1]];
      const email = user.email;
      const body = {
        firstname,
        lastname,
        email
      };

    //  gapi.load = (e) => {
      console.log("gapi here: ", gapi.client);
    //  }
    //  gapi.load = (e)=> {
    //    console.log('gapi.load')
    // window.onload = 
    //   function handleClientLoad(){
    //     gapi.load('client:auth2', initClient);
    //   }
    // function initClient(){
    //   gapi.client.init({
    //     apiKey: config.apiKey,
    //     clientId: config.clientId,
    //     discoveryDocs: config.discoveryDocs,
    //     scope: config.scopes.join(' '),
    //   })
    //   // Loading is finished, so start the app
    //   .then(function() {
    //    // Make sure the Google API Client is properly signed in
    //    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
    //      startApp(user);
    //    } else {
    //      firebase.auth().signOut(); // Something went wrong, sign out
    //    }
    //   })}

    //   function startApp(user) {
    //     console.log(`start app: ${user}`);
    //     firebase.auth().currentUser.getToken()
    //     .then(function(token) {
    //       return gapi.client.calendar.events.list({
    //        calendarId: "primary",
    //        timeMin: new Date().toISOString(),
    //        showDeleted: false,
    //        singleEvents: true,
    //        maxResults: 10,
    //        orderBy: "startTime"
    //       })  
    //      })
    //     .then(function(response) {
    //       console.log(`start App response: ${response}`);  
    //     });
      // }
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

        this.getEvents(user.email)
      })
      .catch(e => console.log(e))
    });
   
  };

  getEvents(){
    let that = this;

    function start() {
      gapi.client.init({
        'apiKey': config.apiKey
      }).then(function() {
        
        return gapi.client.request({
          'path': `https://www.googleapis.com/calendar/v3/calendars/taylor.burrington%40gmail.com/events`,
        })
      }).then( (response) => {
        console.log("response", response)
        let events = response.result.items
        that.setState({
          events
        }, ()=>{
          console.log(that.state.events);
        })
      }, function(reason) {
        console.log(reason);
      });
    }
  
    gapi.load('client', start)
  }

  render() {

    
    // let ui = new firebaseui.auth.AuthUI(firebase.auth());
    // ui.start("#firebaseui-auth-container", uiConfig)

    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <Button variant="contained" color="primary" onClick={() => firebase.auth().signOut()}>Sign out!</Button>
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
