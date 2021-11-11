import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
//import { BrowserRouter, Route, Switch } from "react-router-dom";
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
  const [deleteId, setDeleteId] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    })
  }, [])

  return (
    <>
      <Router>
        {/* <Route exact path="/" component={LandingPage} /> */}
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/invitation-rsvp/:userid" component={InvitationRsvp} />
        {user ?
          <>
            <Route path="/homepage">
              <HomePage />
              {/* {user ? <HomePage /> : <Redirect to="/" />} */}
            </Route>
            <Route path="/invitation-edit">
              <InvitationEdit />
              {/* {user ? <InvitationEdit /> : <Redirect to="/" />} */}
            </Route>
            <Route path="/guestlist">
              <GuestList setDeleteId={setDeleteId} />
              {/* {user ? <GuestList /> : <Redirect to="/" />} */}
            </Route>
            <Route path="/table">
              <Table deleteId={deleteId} />
              {/* {user ? <Table /> : <Redirect to="/" />} */}
            </Route>
          </>
          :
          null}

      </Router>
    </>

  );
}
export default App;


{/* <Route exact path="./homepage" component={HomePage} />
<Route path="/invitation-edit" component={InvitationEdit} />
<Route path="/table" component={Table} />
<Route path="/guestlist" component={GuestList} />
<Route path="/" component={LandingPage} />
<Route path="/invitation-rsvp/:userid" component={InvitationRsvp} /> */}





{/* <BrowserRouter>
      <Switch>
        <Route exact path="./homepage" component={HomePage} />
        <Route path="/invitation-edit" component={InvitationEdit} />
        <Route path="/table" component={Table} />
        <Route path="/guestlist" component={GuestList} />
        <Route path="/" component={LandingPage} />
        <Route path="/invitation-rsvp/:userid" component={InvitationRsvp} />
      </Switch>
    </BrowserRouter> */}