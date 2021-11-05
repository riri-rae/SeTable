import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Table from "./table";
import GuestList from "./guestlist";
import InvitationEdit from "./invitation-edit";
import InvitationRsvp from "./invitation-rsvp";




const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route path="/invitation-rsvp" component={InvitationRsvp} />
        <Route path="/invitation-edit" component={InvitationEdit} />
        {/* <Route path="/invitation-card/:id" component={xxx} /> */}
        <Route path="/table" component={Table} />
        <Route path="/guestlist" component={GuestList} />
        {/* <Route path="/guestlist/:userid/doucument/:docId" component={GuestList} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
