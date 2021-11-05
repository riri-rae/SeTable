import React, { useState } from "react";
//import Select from 'react-select'
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import pictop from "../src/images/purpleFlower-top.png";
import picbt from "../src/images/purpleFlower-bt.png";
import { v4 as uuid } from "uuid";
import RsvpPack from "./components/RsvpPack";

//import { useParams } from "react-router";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 80%;
  max-height: 100vh;
  margin: 0 auto;
  /* flex-direction: column; */
`;

const Template = styled.div`
  /* border: 1px solid #ccc; */
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* height: 100vh; */
  /* background-color: #F8EFE9; */
  /* background-color: rgba(0, 0, 0, 0.1); */
`;

const PicTopWrap = styled.div`
  width: 80%;

  background-color: rgba(248, 239, 233, 0.8);
`;

const PicTop = styled.img`
  max-width: 100%;
`;
const PicBt = styled.img`
  max-width: 100%;
  margin-top: -2rem;
`;
const ContentWrap = styled.div`
  width: 80%;
  /* background-color: rgba(0, 0, 0, 0.1); */
  background-color: rgba(248, 239, 233, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* padding-bottom: 100px; */
`;

const SaveDate = styled.div`
  font-size: 24px;
  margin: -76px 16px 24px 16px;
`;

const BrideName = styled.div`
  font-size: 46px;
  margin: 0 16px 0 16px;
`;
const GroomName = styled(BrideName)``;

const And = styled.div`
  font-size: 36px;
`;
const DateTimeWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 16px;
  margin-top: 48px;
`;

const Date = styled.div`
  font-size: 24px;
  margin-right: 6px;
`;

const Time = styled.div`
  font-size: 24px;
  margin-left: 6px;
`;
const Address = styled.div`
  font-size: 20px;
  margin-left: 16px;
  margin-right: 16px;
`;

const Edit = styled.div`
  font-size: 24px;
  /* border: 1px solid #ccc; */
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-right: auto;
  margin-left: auto;
  padding-left: 16px;
  padding-right: 16px;

  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
`;

const EditTitle = styled.div`
  font-size: 24px;
  margin-bottom: 60px;
`;

const EditText = styled.div`
  font-size: 20px;
  flex-direction: row;
`;

const Input = styled.input`
  border-radius: 5px;
  border: 2px solid #ddd;
  line-height: 22px;
  font-size: 18px;
  margin-left: 8px;
`;

const InputWrap = styled.div`
  display: flex;
  line-height: 20px;
  margin: 16px;
`;

const Label = styled.label`
  /* width: 200px; */
  /* text-align: right; */

  margin-bottom: 8px;
  display: inline-block;
  vertical-align: middle;
  color: #666;
`;



const Select = styled.select`
  margin-left: 8px;
`;



const Button = styled.button`
  /* display: flex;
  align-items: center; */
  /* margin: 16px; */
  margin-left: 4px;
  margin-bottom: 16px;
  /* padding: 0.5rem; */
  color: #574e56;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;

const InvitationRsvp = () => {
  //const { userid } = useParams()
  // console.log(useid)
  // const [name, setName] = useState([]);
  const [group, setGroup] = useState('');
  //const [status, setStatus] = useState("");
  const [tag, setTag] = useState('');
  const [role, setRole] = useState('');
  // const [veggie, setVeggie] = useState("");
  // const [baby, setBaby] = useState("");
  // const [note, setNote] = useState("");

  const [allData, setAllData] = useState([{
    guestlist: [
      {
        id: '',
        content: '',
      },
    ],
    status: '',
    baby: '',
    veggie: '',
    note: '',

  }]);

  const db = firebase.firestore();

  function sendForm() {
    if (group === '') {
      window.alert('Please let us know who is filling this form?')
    } else if (tag === '') {
      window.alert('Please let us you are from which side?')
    } else if (role === '') {
      window.alert('Please let us know you are our?')
    }
    else {
      console.log('上面都填了！')
      allData.forEach((data) => {
        console.log(data.name)
        if (data.name === '') {
          window.alert('Please fill in guest name')
        } else if (data.status === '') {
          window.alert('Please let us know if you will attand')
        } else if (data.baby === '') {
          window.alert('Baby seat???')
        } else if (data.veggie === '') {
          window.alert('Veggie???')
        }
        else {
          let id = db.collection("users")
            .doc("0pNg8BybCeidJQXjrYiX")
            .collection("rsvp").doc().id;
          db.collection("users")
            .doc("0pNg8BybCeidJQXjrYiX")
            .collection("rsvp")
            .doc(id)
            .set({
              guestlist: [
                {
                  id: uuid(),
                  content: data.name,
                }
              ],
              group,
              status: data.status,
              tag,
              role,
              baby: data.baby,
              veggie: data.veggie,
              note: data.note,
              id
            })
        }
      })
    }
  }
  return (
    <Container>
      <Template>
        <PicTopWrap>
          <PicTop src={pictop} />
        </PicTopWrap>
        <ContentWrap>
          <SaveDate>Save the Date</SaveDate>
          <BrideName>Ariana</BrideName>
          <And>&</And>
          <GroomName>Thomas</GroomName>
          <DateTimeWrap>
            <Date>2022.05.20</Date>
            <Time>At 12:00 PM</Time>
          </DateTimeWrap>
          <Address>1 N Kaniku Dr, Waimea, HI 96743, USA</Address>
        </ContentWrap>
        <PicTopWrap>
          <PicBt src={picbt} />
        </PicTopWrap>
      </Template>

      <Edit>
        <EditTitle>Edit your custom infomation</EditTitle>
        <InputWrap>
          <Label htmlFor="group-name">This Form is fill by:</Label>
          <Input
            type="text"
            id="group-name"
            placeholder="Enter the name"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
        </InputWrap>
        <EditText>
          <InputWrap>
            <div>You are ...</div>
            <Select value={tag} onChange={(e) => setTag(e.target.value)}>
              <option value="" disabled selected>Please Select</option>
              <option value="brides-side">Brides' side</option>
              <option value="groom-side">Groom's side</option>
            </Select>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="" disabled selected>Please Select</option>
              <option value="friend">Friend</option>
              <option value="family">Family</option>
            </Select>
          </InputWrap>
        </EditText>
        {/* <EditText>
          <InputWrap>
            <div>Friend or Family?</div>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="" disabled selected>Please Select</option>
              <option value="friend">Friend</option>
              <option value="family">Family</option>
            </Select>
          </InputWrap>
        </EditText> */}

        {allData.map((data, index) => (
          <RsvpPack allData={allData} setAllData={setAllData} index={index} />
        ))}
        <Button
          type="button"
          onClick={() => {
            setAllData([...allData, {}])
          }}
        >
          Click To Add More Guests
        </Button>

        <Button
          onClick={sendForm}
        >
          Send
        </Button>
      </Edit>
    </Container>
  );
};

export default InvitationRsvp;
