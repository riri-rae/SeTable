import styled from "styled-components";

export const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  margin: 16px;
  padding: 0.4rem 0.8rem;
  color: #574e56;
  border: 1px solid #ddd;
  border-radius: 16px;
  font-size: 20px;
  cursor: pointer;
  transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s; /* Safari */
  &:hover {
    transition-duration: 0.1s;
    background-color: #d48c70;
    color: #fff;
  }
  &:after {
    content: "";
    display: white;
    position: absolute;
    border-radius: 16px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.4s;
    box-shadow: 0 0 5px 10px rgba(117, 99, 66, 0.5);
  }

  &:active:after {
    box-shadow: 0 0 0 0 rgba(117, 99, 66, 0.9);
    position: absolute;
    border-radius: 16px;
    left: 0;
    top: 0;
    opacity: 1;
    transition: 0s;
  }

  &:active {
    top: 1px;
  }
`;

export const AddTableButton = styled.button`
  position: fixed;
  top: 422px;
  display: flex;
  align-items: center;
  margin: 12px auto;
  padding: 0.5rem;
  background-color: #dcae96;
  box-shadow: 3px 3px 5px 2px rgba(0, 0, 0, 0.5);
  color: #fff;
  border: 1px solid #dcae96;
  border-radius: 16px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  height: 50px;
  letter-spacing: 1px;
  transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s; /* Safari */
  &:hover {
    transition-duration: 0.1s;
    background-color: #dba083;
    color: #fff;
  }
  :active {
    background-color: #a06043;
    box-shadow: 1px 2px #ccc;
    transform: translateY(3px);
    border: none;
  }
`;