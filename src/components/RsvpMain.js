import React, { useState, useEffect } from "react";
import Select from 'react-select'
import styled from "styled-components";
import firebase from "../utils/firebase";
import { useParams } from "react-router";
import "firebase/firestore";
import 'firebase/auth';
import { v4 as uuid } from "uuid";
import RsvpPack from "./RsvpPack";
// import Select from "react-select/dist/declarations/src/Select";

//import { useParams } from "react-router";

const Edit = styled.div`
  font-size: 24px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  margin: 36px 16px;
  color:#67595E;

  /* @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  } */
 
`;
const Frame = styled.div`
background-image: url('/images/fram-brown.png');
background-position: center;
/* background-attachment: fixed; */
background-repeat: no-repeat;
background-size: 100%;
  width: 650px;
  height: 36px;
`;

const EditTitle = styled.div`
  font-size: 28px;
  font-family: 'Dancing Script', cursive;
  font-weight: 600;
  letter-spacing:2px;
  padding-bottom: 20px;
  /* margin-bottom: 20px; */

  text-align: center;

  
`;

const Formwrap = styled.div`
  font-size: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

`;


const InputWrap = styled.div`
  display: flex;
  /* justify-content: left; */
  height: 32px;
  margin: 16px;
  vertical-align:middle;
`;


const Input = styled.input`
  border: 1px solid #ddd;
  height: 22px;
  font-size: 16px;
  margin-left: 8px;
  vertical-align:middle;
  outline: none;
  border-radius: 5px;
  padding: 8px;
  color: #44342d;
`;
const Label = styled.div`
  float:left; 
  text-align:right;
  line-height: 32px;
`;

const SelectStyle = styled(Select)`
 min-width: 160px;
 font-size: 16px;
 margin-left:16px;
 min-height: 32px;
 color: #44342d;
 outline: none!important;

`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 16px;
  margin-left: 4px;
  padding: 0.2rem 0.6rem;
  color: #574e56;
  border: 1px solid #ddd;
  /* background: #fff; */
  border-radius: 16px;
  font-size: 1rem;
  cursor: pointer;
`;

const Textarea = styled.textarea`
  resize: none;
  height: 36px;
  line-height: 36px;
  border-radius: 8px;
  margin-left: 8px;
  min-width: 280px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0 8px;
  color: #44342d;
  outline: none;
`;

// const Hr = styled.div`
// background-image: url('/images/hr-light.png');
// background-position: center;
// background-repeat: no-repeat;
// background-size: 100%;
//   width: 600px;
//   height: 30px;
// `;

const RsvpMain = () => {
  const { userid } = useParams()
  const [group, setGroup] = useState('');
  const [note, setNote] = useState('');

  const [allData, setAllData] = useState([]);
  // console.log(allData)

  const [tag, setTag] = useState('');
  const tags = [
    { value: 'brides-side', label: 'Bride Side' },
    { value: 'groom-side', label: 'Groom Side' }
  ]

  const [role, setRole] = useState('');
  const roles = [
    { value: 'friend', label: 'Friend' },
    { value: 'family', label: 'Family' }
  ]

  const [status, setStatus] = useState('');
  const allstatus = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'notSure', label: 'Not Sure' }
  ]


  const db = firebase.firestore();

  function sendForm() {

    if (group === '') {
      window.alert('Please let us know who is filling this form?')
    } else if (tag === '') {
      window.alert('Please let us you are from which side?')
    } else if (role === '') {
      window.alert('Please let us you are our?')
    } else if (status === '') {
      window.alert('Please let us know if you will attand')
    }
    else {
      let id = db.collection("users").doc(userid).collection('rsvp').doc().id;

      if (allData.length === 0) {
        db.collection("users")
          .doc(userid)
          .collection("rsvp")
          .doc(id)
          .set({
            name: group,
            group,
            status: status.value,
            tag: tag.value,
            role: role.value,
            baby: '',
            veggie: '',
            note,
            id
          })

      } else {
        console.log('more')
        console.log(allData)
        allData.forEach((data) => {
          if (!data.name) {
            window.alert('Please fill in guest name')
          } else if (!data.veggie) {
            window.alert('Veggie???')
          } else if (!data.baby) {
            window.alert('Baby seat???')
          }
          else {
            console.log('yes data')
            let id = db.collection("users").doc(userid).collection('rsvp').doc().id;

            db.collection("users")
              .doc(userid)
              .collection("rsvp")
              .doc(id)
              .set({
                name: data.name,
                group,
                status: status.value,
                tag: tag.value,
                role: role.value,
                note,
                id,
                baby: data.baby,
                veggie: data.veggie,
              })

          }
        })

      }
    }
  }

  useEffect(() => {
    if (status.value === 'yes') {
      setAllData([...allData, {}])
    } else if (status.value === 'no' || status.value === 'notSure') {
      setAllData([])
    }
  }, [status.value])



  return (
    <Edit>
      <EditTitle>
        With jouful hearts,<br />
        we ask the honor of your presence on our wedding day！
      </EditTitle>
      <Frame />
      <Formwrap>
        <InputWrap>
          <Label htmlFor="group-name">This Form is fill by :</Label>
          <Input
            type="text"
            id="group-name"
            placeholder="Enter the name"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
        </InputWrap>

        <InputWrap>
          <Label>You are ...</Label>
          <SelectStyle
            placeholder="Please Select"
            value={tag}
            onChange={(value) => {
              setTag(value)
            }}
            options={tags} />
          {/* 
          <Select value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="" disabled selected>Please Select</option>
            <option value="brides-side">Brides' side</option>
            <option value="groom-side">Groom's side</option>
          </Select> */}

          <SelectStyle
            placeholder="Please Select"
            value={role}
            onChange={(value) => {
              setRole(value)
            }}
            options={roles} />
          {/* 

          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="" disabled selected>Please Select</option>
            <option value="friend">Friend</option>
            <option value="family">Family</option>
          </Select> */}
        </InputWrap>


        <InputWrap>
          <Label>Will you be able to join us at our wedding ?</Label>
          <SelectStyle
            placeholder="Please Select"
            value={status}
            onChange={(value) => {
              setStatus(value)
            }}
            options={allstatus} />


          {/* <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="" disabled selected>Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="notSure">Not Sure</option>
          </Select> */}
        </InputWrap>

        {allData.map((data, index) => (
          <RsvpPack allData={allData} setAllData={setAllData} index={index} key={index} />
        ))}
        <Frame />
        <InputWrap>
          <Label>Note: </Label>
          <Textarea
            placeholder="Anything we need to know?"
            onChange={(e) => setNote(e.target.value)}>
          </Textarea>
        </InputWrap>
      </Formwrap>
      <Button
        onClick={sendForm}
      >
        Send
      </Button>
    </Edit>

  );
};

export default RsvpMain;
