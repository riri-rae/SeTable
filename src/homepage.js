import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import firebase from "./utils/firebase";
import "firebase/firestore";
import 'firebase/auth';



const HomePage = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    })
  }, [])

  return (
    <>
      <Header />
      <h1>HomePage</h1>
    </>
  );
}

export default HomePage;
