import React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

const LoadingFrame = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function Loading() {
  return (
    <>
      <LoadingFrame>
        <LoadingFrame>
          <ReactLoading color="#a49393" type="bars" />
        </LoadingFrame>
      </LoadingFrame>
    </>
  );
}
