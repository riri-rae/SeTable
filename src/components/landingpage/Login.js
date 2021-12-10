import React from "react";
import styled from "styled-components";
import { SubmitButton, SwitchButton, SignSubmitButton } from "../../components/style/generalStyle";


const SignInTitle = styled.div`
  font-size: 2rem;
  margin: 1.5rem 0;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
`;

const Input = styled.input`
  width: 256px;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.5);
  border-radius: 4px;
  padding: 0px 20px;
  margin: 0.2rem 5rem;
  transition: all 200ms ease-in-out;
  font-size: 16px;
  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(244, 185, 184);
  }
`;


const Login = ({ email, setEmail, enterKey, password, setPassword, onSubmit, setName, setActiveItem }) => {
    return (
        <FormContainer>
            <SignInTitle>Login</SignInTitle>
            <Input
                type="email"
                placeholder="setable01@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => enterKey(e)}
            />
            <Input
                type="password"
                placeholder="setable01"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                onKeyDown={(e) => enterKey(e)}
            />
            <SubmitButton
                onClick={(e) => {
                    onSubmit(e);
                }}
            // loading={isLoading}
            >
                Login
            </SubmitButton>
            <SwitchButton
                onClick={() => {
                    setActiveItem("signup");
                    setName("");
                    setEmail("");
                    setPassword("");
                }}
            >
                ── Swtich to Signup ──
            </SwitchButton>
        </FormContainer>
    );
};


const Signup = ({ email, setEmail, enterKey, password, setPassword, onSubmit, setName, setActiveItem, name }) => {
    return (
        <FormContainer>
            <SignInTitle style={{ color: "#87666B" }}>Signup</SignInTitle>
            <Input
                type="text"
                placeholder="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => enterKey(e)}
            />
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => enterKey(e)}
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => enterKey(e)}
            />
            <SignSubmitButton
                // type="submit"
                onClick={(e) => onSubmit(e)}

            // loading={isLoading}
            >
                Signup
            </SignSubmitButton>
            <SwitchButton
                onClick={() => {
                    setActiveItem("login");
                    setName("");
                    setEmail("");
                    setPassword("");
                }}
            >
                ── Swtich to Login ──
            </SwitchButton>
        </FormContainer>
    );
};

export { Login, Signup };