import React from "react";
import styled from "styled-components";
import { HiHeart } from "react-icons/hi";

const Template = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  box-shadow: 0px 0px 10px 6px rgba(138, 105, 90, 0.7);
`;

const PicWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
`;

const BackGround = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  transition: all 0.5s;
`;

const ContentWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 0px 10px 5px rgba(183, 143, 149, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Stalemate", cursive, "Noto Sans TC", sans-serif;
  max-height: 100vh;
  text-align: center;
  padding: 36px 16px;
  overflow: hidden;

  @media (max-width: 1440px) {
    width: 60%;
  } ;
  @media (max-width: 768px) {
    min-height: 500px;
  } ;
`;

const Name = styled.div`
  font-size: 126px;
  margin: -8px 16px;
  height: 180px;
  @media (max-width: 1440px) {
    font-size: 116px;
    height: 160px;
  }
  @media (max-width: 768px) {
    font-size: 96px;
    height: 136px;
  }
`;

const And = styled.div`
  font-size: 72px;
  margin-top: -30px;
  @media (max-width: 1440px) {
    font-size: 64px;
  }
  @media (max-width: 768px) {
    font-size: 56px;
  }
`;

const DateTimeWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 16px;
  margin-top: 28px;
  font-family: "Dancing Script", cursive;
  letter-spacing: 3px;
  font-size: 24px;
  padding-bottom: 28px;

  @media (max-width: 1440px) {
    margin-top: 20px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Side = styled.div`
  font-family: "Dancing Script", cursive;
  padding: 16px 0;
  border-top: 2px solid rgba(23, 43, 77, 0.5);
  border-bottom: 2px solid rgba(23, 43, 77, 0.5);
  width: 180px;
  @media (max-width: 1440px) {
    margin: 0px 20px;
  }
  @media (max-width: 900px) {
    width: 140px;
    margin: 0px 28px;
  }
  @media (max-width: 425px) {
    border-bottom:none;
  }
  
`;

const DateWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 5vw;
  @media (max-width: 768px) {
   display: none;
  } ;
`;

const Month = styled.div`
  font-family: "Dancing Script", cursive;
`;

const Date = styled.div`
  font-family: "Dancing Script", cursive;
  font-size: 28px;
`;

const Year = styled.div`
  font-size: 20px;
  @media (max-width: 590px) {
    font-size: 16px;
  }
`;

const Address = styled.div`
  font-size: 24px;
  font-family: "Dancing Script";
  letter-spacing: 3px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 590px) {
    font-size: 22px;
  }
`;

const DateTimeWrapRow = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 16px;
    margin-top: 16px;
    font-family: "Dancing Script", cursive;
    letter-spacing: 3px;
    font-size: 24px;

  } ;
  @media (max-width: 425px) {
    font-size: 24px;
  } ;
`;

const DateWrapRow = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 80%;
    /* border-bottom: 2px solid rgba(23, 43, 77, 0.5); */
  } ;
  @media (max-width: 425px) {
    width: 100%;
    margin-bottom: 8px;
    border-bottom:none;
  } ;
`;

const DateRow = styled.div`
  @media (max-width: 768px) {
    margin: 0 8px;
  } ;
  @media (max-width: 425px) {
    margin: 0 4px;
  } ;
`;

const IconWrap = styled(DateRow)`
  @media (max-width: 768px) {
   font-size: 9px;
  } ;
`;

const Row = styled.div`
  @media (max-width: 768px) {
    margin: 12px;
    margin-top: 16px;
    /* border-bottom: 2px solid rgba(23, 43, 77, 0.5); */
  } ;
  @media (max-width: 425px) {
    margin: 8px;
    margin-top: 2px;
    border-bottom:none;
  } ;
`;

const RsvpTemplate = (props) => {
  const date = new window.Date(props.dateTime);
  const year = props.dateTime ? date.getFullYear() : "Year";
  const month = date.toLocaleString("en-US", { month: "short" });
  const mm = month.toUpperCase();
  const dd = date.getDate();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const getwd = date.toLocaleString("en-US", { weekday: "long" });
  const wd = getwd.toUpperCase();

  return (
    <Template>
      <PicWrap>
        <BackGround style={{ backgroundImage: `url(${props.pic})` }} />
        <ContentWrap>
          <Name>{props.bride}</Name>
          <And>&</And>
          <Name>{props.groom}</Name>
          <DateTimeWrap>
            <Side>{wd}</Side>
            <DateWrap>
              <Month>{mm}</Month>
              <Date>{dd}</Date>
              <Year>{year}</Year>
            </DateWrap>
            <Side>{time}</Side>
          </DateTimeWrap>

          <DateTimeWrapRow>
            <DateWrapRow>
              <DateRow>{mm}</DateRow>
              <IconWrap><HiHeart /></IconWrap>
              <DateRow>{dd} </DateRow>
              <IconWrap><HiHeart /></IconWrap>
              <DateRow>{year}</DateRow>
            </DateWrapRow>
            <Row>{wd}</Row>
            <Row>{time}</Row>
          </DateTimeWrapRow>

          <Address>At {props.add}</Address>
        </ContentWrap>
      </PicWrap>
    </Template>
  );
};

export default RsvpTemplate;
