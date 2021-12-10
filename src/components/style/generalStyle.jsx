import styled from "styled-components";

export const Button = styled.button`
  font-family: "Karla",sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  margin: 16px;
  padding: 0.4rem 0.8rem;
  color: white;
  background-color: #DCAE96;
  border: 1px solid #DCAE96;
  border-radius: 16px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0px 0px 5px rgb(0 0 0 / 20%);
  transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s; /* Safari */
  transition: all 0.3s ease-in-out;
  &:active {
    top: 2px;
  }
  &:hover {
    filter: brightness(1.05);
  }
  /* &:hover {
    transition-duration: 0.1s;
    background-color: #d48c70;
    color: #fff;
  } */
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
  @media (max-width: 768px) {
    height: 40px;
    top: 362px;
  }
  @media (max-width: 425px) {
    height: 30px;
    top: 362px;
    font-size: 18px;
    border-radius: 10px;
  }

`;

export const SubmitButton = styled.button`
  padding: 0.8rem 1rem;
  margin: 2rem;
  color: #fff;
  font-size: 15px;
  letter-spacing: 2px;
  font-weight: 600;
  width: 10rem;
  border: none;
  border-radius: 36px;
  cursor: pointer;
  transition: all, 0.3s ease-in-out;
  box-shadow: 0px 0px 5px rgb(0 0 0 / 20%);
  /* background: rgb(244, 185, 184); */
  background: linear-gradient(
    315deg,
    rgba(244, 185, 184, 1) 0%,
    rgba(235, 187, 176, 1) 35%,
    rgba(212, 140, 112, 1) 100%
  );
  &:hover {
    filter: brightness(1.05);
  }
`;

export const SignSubmitButton = styled(SubmitButton)`
  /* background: rgb(236, 210, 210); */
  background: linear-gradient(
    315deg,
    rgba(236, 210, 210, 1) 0%,
    rgba(235, 187, 176, 1) 35%,
    rgba(200, 131, 142, 1) 100%
  );
`;

export const SwitchButton = styled.button`
  font-size: 14px;
  letter-spacing: 1px;
  border: none;
  cursor: pointer;
  color: #574e56;
  margin: 1rem;
  background-color: rgb(0 0 0 / 0%);
  &&:hover {
    color: #391306;
  }
`;