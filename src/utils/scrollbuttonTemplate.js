import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";

const Button = styled.div`
display: none;
@media (max-width: 1024px) {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0%;
  font-size: 3rem;
  cursor: pointer;
  font-weight: lighter;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1px;
  transition: all 0.3s ease-in-out;
  &:hover{
    color: #A47E84;
  }
}
`;

const Span = styled.div`
display: none;
@media (max-width: 1024px) {
  display: block;
  font-size: 1rem;
  margin-top: -5px;
}
`;

const Icon = styled.div`
display: none;
@media (max-width: 1024px) {
  display: block;
 display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
}
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

const ScrollButtonTemplate = () => {
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
    console.log('hi')
    window.scrollTo({
      top: 1500,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button
      onClick={scrollToBottom}
      style={{ display: visible ? "inline-block" : "none" }}
    >
      <Icon><IoIosArrowDown /></Icon>
      <Span>Scroll</Span>
    </Button>
  );
};

export default ScrollButtonTemplate;
