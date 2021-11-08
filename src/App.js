import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./landingpage";
import HomePage from "./homepage";
// import Login from "./login";
import Table from "./table";
import GuestList from "./guestlist";
import InvitationEdit from "./invitation-edit";
import InvitationRsvp from "./invitation-rsvp";
import firebase from "./utils/firebase";
import "firebase/firestore";
import 'firebase/auth';




const App = () => {

  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    })
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        {user ? (<>
          <Route exact path="./homepage" component={HomePage} />
          <Route path="/invitation-edit" component={InvitationEdit} />
          <Route path="/table" component={Table} />
          <Route path="/guestlist" component={GuestList} />
        </>
        ) : (
          <Route path="/" component={LandingPage} />
        )}
        <Route path="/invitation-rsvp/:userid" component={InvitationRsvp} />


        {/* <Route exact path="./homepage" component={HomePage} />
        <Route path="/invitation-edit" component={InvitationEdit} />
        <Route path="/table" component={Table} />
        <Route path="/guestlist" component={GuestList} />

        <Route path="/" component={LandingPage} />

        <Route path="/invitation-rsvp/:userid" component={InvitationRsvp} /> */}

      </Switch>
    </BrowserRouter>
  );
}

export default App;
