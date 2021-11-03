import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Table from "./table";
import GuestList from "./guestlist";
import InvitationEdit from "./invitation-edit";
import InvitationRsvp from "./invitation-rsvp";
import Header from "./components/Header";



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route path="/invitation-rsvp" component={InvitationRsvp} />
        <Route path="/invitation-edit" component={InvitationEdit} />
        <Route path="/table" component={Table} />
        <Route path="/guestlist" component={GuestList} />
        {/* <Route path="/guestlist/:userid/doucument/:docId" component={GuestList} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
