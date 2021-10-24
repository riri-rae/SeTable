import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Table from "./table";
import GuestList from "./guestlist";
import Header from "./components/Header";



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route path="/table" component={Table} />
        <Route path="/guestlist" component={GuestList} />
        {/* <Route path="/login" component={Login} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

