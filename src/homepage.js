import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import firebase from "./utils/firebase";
import { Parallax } from 'react-parallax';
import "firebase/firestore";
import 'firebase/auth';



const HomePage = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    })
  }, [])

  const insideStyles = {
    background: "white",
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  };

  const image2 =
    "images/leaf.png";



  return (
    <>
      <Header />
      <Parallax bgImage={image2} strength={500}>
        <div style={{ height: 500 }}>
          <div style={insideStyles}>Reverse direction</div>
        </div>
      </Parallax>
      <Parallax bgImage={image2} strength={-100}>
        <div style={{ height: 500 }}>
          <div style={insideStyles}>Reverse direction</div>
        </div>
      </Parallax>
    </>
  );
}

export default HomePage;
