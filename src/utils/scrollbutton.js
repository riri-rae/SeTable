import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";

const Button = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5%;
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-weight: lighter;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1px;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #fff;
  }
  @media (max-width: 768px) {
    bottom: 10%;
  }
  @media (max-width: 390px) {
    display: none;
    visibility: hidden;
  }
`;

const Span = styled.div`
  font-size: 1rem;
  margin-top: -5px;
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
`;

// const Span = styled.span`
//     position: absolute;
//    left: 50%;
//    top: 0;
//     display: block;
//     z-index: 1;
//     width: 5%;
//     height: 5%;
//     animation: landArrow 2s ease infinite;
//     animation-delay: 2s;
//     background: red;

//     @keyframes landArrow {
//     0% {
//         top:-5vw;
//     }
//     /* 30% {
//         top:2vw
//     }
//     60% {
//         top:3vw
//     } */
//     100% {
//         top:-1vw
//     }
//   }
// `

const ScrollButton = () => {
  const [visible, setVisible] = useState(true);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 0) {
      setVisible(false);
    } else if (scrolled <= 0) {
      setVisible(true);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      //top: 1500,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);


  return (
    <Button
      onClick={scrollToBottom}
      style={{ display: visible ? "inline-block" : "none" }}
    >
      <Icon>
        <IoIosArrowDown />
      </Icon>
      <Span>Scroll</Span>
    </Button>
  );
};

export default ScrollButton;
