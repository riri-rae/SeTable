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


const App = () => {

  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
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
                <LandingPage />
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


    // <Router>
    //     <Route exact path="/">
    //       <LandingPage />
    //     </Route>

    //     <Route path="/invitation-rsvp/:userid" component={InvitationRsvp} />
    //     {user ?
    //       <>
    //         <Route path="/homepage">
    //           <HomePage />
    //         </Route>
    //         <Route path="/invitation-edit">
    //           <InvitationEdit />
    //         </Route>
    //         <Route path="/guestlist">
    //           <GuestList setDeleteId={setDeleteId} />
    //         </Route>
    //         <Route path="/table">
    //           <Table deleteId={deleteId} />
    //         </Route>
    //       </>
    //       : <Redirect to="/" />}

    //   </Router>