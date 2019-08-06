firebase.auth().onAuthStateChanged(function(user) {
  // Make sure there is a valid user object
  if(user){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://apis.google.com/js/api.js';
    // Once the Google API Client is loaded, you can run your code
    script.onload = function(e){
     // Initialize the Google API Client with the config object
     gapi.client.init({
       apiKey: config.apiKey,
       clientId: config.clientID,
       discoveryDocs: config.discoveryDocs,
       scope: config.scopes.join(' '),
     })
     // Loading is finished, so start the app
     .then(function() {
        // Make sure the Google API Client is properly signed in
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          startApp(user);
        } else {
          firebase.auth().signOut(); // Something went wrong, sign out
        }
       })
    }
    // Add to the document
    document.getElementsByTagName('head')[0].appendChild(script);
  }
})
