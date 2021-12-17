import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LandingPage from "./landingpage";
import HomePage from "./homepage";
import Loading from "./components/Loading";
import Notfound from "./components/Notfound";
import Table from "./table";
import GuestList from "./guestlist";
import InvitationEdit from "./invitation-edit";
import InvitationRsvp from "./invitation-rsvp";
import firebase from "./utils/firebase";
import "firebase/firestore";
import 'firebase/auth';
import { useDispatch } from 'react-redux';
import { getUser } from "./redux/action";


const App = () => {

  const dispatch = useDispatch();
  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      dispatch(getUser(currentUser))
      setUser(currentUser);
    })
  }, [])

  return (
    <>
      <Router>
        <Switch>
          {user === undefined ? (<Loading />) : (
            <Switch>
              <Route exact path="/">
                {user ? <Redirect to="/homepage" /> : <LandingPage />}
              </Route>
              <Route exact path="/invitation-rsvp/404" component={Notfound} />
              <Route exact path="/invitation-rsvp/:userid" component={InvitationRsvp} />
              <Route path="/homepage">
                {user ? <HomePage /> : <Redirect to="/" />}
              </Route>
              <Route path="/invitation-edit">
                {user ? <InvitationEdit /> : <Redirect to="/" />}
              </Route>
              <Route path="/guestlist">
                {user ? <GuestList /> : <Redirect to="/" />}
              </Route>
              <Route path="/table">
                {user ? <Table /> : <Redirect to="/" />}
              </Route>
              <Route exact path="" component={Notfound} />
            </Switch>
          )}
          <Route exact path="" component={Notfound} />
        </Switch>
      </Router>
    </>

  );
}
export default App;