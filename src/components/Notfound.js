import React from "react";
import styled from "styled-components";

export default function Notfound() {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
  `;

  const Title = styled.div`
    font-size: 32px;
    letter-spacing: 2px;
  `;

  return (
    <>
      <Container>
        <Title>Page Not Found</Title>
        <lottie-player
          src="https://assets4.lottiefiles.com/private_files/lf30_4peyk7zf.json"
          background="transparent"
          speed="1"
          style={{ maxWidth: "50vmin", maxHeight: "50vmin" }}
          loop
          autoplay
        />
      </Container>
    </>
  );
}
