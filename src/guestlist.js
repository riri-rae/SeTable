import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import GuestlistPack from "./components/guestlist/GuestlistPack";
import GuestlistMain from "./components/guestlist/GuestlistMain";
import Header from "./components/Header";
import Loading from "./components/Loading";
import { RiStickyNoteLine } from "react-icons/ri";
import { useSelector } from "react-redux";


const Bg = styled.div`
  background-image: url("/images/tablebg.jpeg");
  background-position: right;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: calc(100% - 80px);
`;

const Wrap = styled.div`
  box-shadow: 0px 0px 10px 6px rgba(138, 105, 90, 0.5);
  min-height: 100vh;
  width: 80%;
  border-bottom: 20px solid #a49393 ;
  margin: 0 auto;
  @media (max-width: 1440px) {
    width: 90%;
  }
`;

const Container = styled.div`
  background-color: rgb(249, 249, 249);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-sizing:border-box;
`;

const BlockWrap = styled.div`
  background-color: #fff;
  width: 100%;
  margin: 0 auto;
`;

const MainTitleContainer = styled.div`
  margin: 0 auto;
  padding: 20px 20px 0 20px;
  /* width: 80%; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #a49393;
`;

const SubTitleContainer = styled(MainTitleContainer)`
  height: ${(props) => (props.display ? "fit-content" : '20px')};
  display: flex;
  align-items: flex-start;
  padding: 16px 16px 24px 16px;
  margin-left: 20px ;
  margin-right: 20px;
  overflow-x: scroll;
  background-color: #fff;
  /* &:last-child {
    padding-bottom: 20px;
  } */
`;

const EmptyIcon = styled(RiStickyNoteLine)`
  font-size: 50px;
  color: #ddd;
  min-height: 50px important;
`;

const Th = styled.th`
  text-align: center;
  color: #574e56;
  font-size: 16px;
`;


function GuestList({ setDeleteId }) {
  const user = useSelector((state) => state.user);

  const [allData, setAllData] = useState([]);
  const [yesCount, setYesCount] = useState("");
  const [notCount, setNotCount] = useState("");
  const [noCount, setNoCount] = useState("");
  const [addYes, setAddYes] = useState("");
  const [addNo, setAddNo] = useState("");
  const [addNotSure, setAddNotSure] = useState("");

  const [display1, setDisplay1] = useState(1);
  const [display2, setDisplay2] = useState(1);
  const [display3, setDisplay3] = useState(1);

  function clickYes() {
    if (display1) {
      setDisplay1(0)
    } else {
      setDisplay1(1)
    }
  }
  function clickNotSure() {
    if (display2) {
      setDisplay2(0)
    } else {
      setDisplay2(1)
    }
  }
  function clickNo() {
    if (display3) {
      setDisplay3(0)
    } else {
      setDisplay3(1)
    }
  }

  const db = firebase.firestore();

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .collection("rsvp")
      .orderBy("time", "desc")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setAllData(data);
      });
  }, []);

  useEffect(() => {
    const copyData = Array.from(allData);
    const yes = copyData.filter((status) => status.status === "yes");
    const not = copyData.filter((status) => status.status === "notSure");
    const no = copyData.filter((status) => status.status === "no");

    const yesNumber = String(yes.length);
    const notNumber = String(not.length);
    const noNumber = String(no.length);
    setYesCount(yesNumber);
    setNotCount(notNumber);
    setNoCount(noNumber);
  }, [allData]);

  const renderSubTitle = () => {
    return (
      <thead>
        <tr>
          <Th>Name</Th>
          <Th>Group</Th>
          <Th>Tag</Th>
          <Th>Role</Th>
          <Th>Vegetarian</Th>
          <Th>Baby Seat</Th>
          <Th>Note</Th>
          <Th>Save</Th>
          <Th>Delete</Th>
        </tr>
      </thead>
    )
  }

  return (
    <>
      <Header />
      {user ?
        <Bg>
          <Wrap>
            <Container>
              <BlockWrap>
                <GuestlistMain title={'Joyfully Attend'} count={yesCount} click={clickYes} addValue={addYes} setName={setAddYes} status={"yes"} display={display1} />
                <SubTitleContainer display={display1}>
                  {yesCount !== '0' ?
                    <table>
                      {renderSubTitle()}
                      <tbody>
                        {allData.map((data, index) =>
                          data.status === "yes" ? (
                            <GuestlistPack
                              data={data}
                              index={index}
                              key={data.id}
                              setDeleteId={setDeleteId}
                            ></GuestlistPack>
                          ) : (
                            <></>
                          )
                        )}
                      </tbody>
                    </table>
                    : <EmptyIcon />}
                </SubTitleContainer>
                <GuestlistMain title={'Not Sure'} count={notCount} click={clickNotSure} addValue={addNotSure} setName={setAddNotSure} status={"notSure"} display={display2} />
                <SubTitleContainer display={display2}>
                  {notCount !== '0' ?
                    <table>
                      {renderSubTitle()}
                      <tbody>
                        {allData.map((data, index) =>
                          data.status === "notSure" ? (
                            <GuestlistPack
                              data={data}
                              index={index}
                              key={data.id}
                            ></GuestlistPack>
                          ) : (
                            <></>
                          )
                        )}
                      </tbody>
                    </table>
                    : <EmptyIcon />}
                </SubTitleContainer>
                <GuestlistMain title={'Regretfully Decline'} count={noCount} click={clickNo} addValue={addNo} setName={setAddNo} status={"no"} display={display3} />
                <SubTitleContainer display={display3}>
                  {noCount !== '0' ?
                    <table>
                      {renderSubTitle()}
                      <tbody>
                        {allData.map((data, index) =>
                          data.status === "no" ? (
                            <GuestlistPack
                              data={data}
                              index={index}
                              key={data.id}
                            ></GuestlistPack>
                          ) : (
                            <></>
                          )
                        )}
                      </tbody>
                    </table>
                    : <EmptyIcon />}
                </SubTitleContainer>
              </BlockWrap>
            </Container>
          </Wrap>
        </Bg> : <Loading />}
    </>
  );
}

export default GuestList;
