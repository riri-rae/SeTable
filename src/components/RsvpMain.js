import React, { useState, useEffect } from "react";
//import Select from 'react-select'
import styled from "styled-components";
import firebase from "../utils/firebase";
import { useParams } from "react-router";
import "firebase/firestore";
import 'firebase/auth';
import { v4 as uuid } from "uuid";
import RsvpPack from "./RsvpPack";

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

const EditTitle = styled.div`
  font-size: 28px;
  font-family: 'Dancing Script', cursive;
  font-weight: 600;
  letter-spacing:2px;
  margin-bottom: 60px;
  text-align: center;
  color: #67595E;
  
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
  line-height: 20px;
  margin: 16px;
  vertical-align:middle;
`;


const Input = styled.input`
  border-radius: 5px;
  border: 2px solid #ddd;
  line-height: 22px;
  font-size: 18px;
  margin-left: 8px;
  vertical-align:middle;
  outline: none;
  border-radius: 4px;
`;
const Label = styled.div`
  /* width: 200px; */
  /* text-align: right; */
  /* display: inline-block;
  vertical-align: middle;
  color: #666;
  height: 22px; */

  /* width:500px;  */
  float:left; 
  text-align:right;
`;

const Select = styled.select`
  margin-left: 8px;
  outline: none;
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

const Textarea = styled.textarea`
  /* resize: none; */
  height: 30px;
  line-height: 30px;
  border-radius: 8px;
  margin-left: 8px;
`;

const RsvpMain = () => {
  const { userid } = useParams()
  const [group, setGroup] = useState('');
  const [tag, setTag] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

  const [allData, setAllData] = useState([]);
  // console.log(allData)

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
            guestlist: [
              {
                id: uuid(),
                content: group,
              }
            ],
            group,
            status,
            tag,
            role,
            baby: 'no',
            veggie: 'no',
            note,
            id
          })

      } else {
        console.log('more')
        // console.log(allData)
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
                // guestlist: [
                //   {
                //     id: uuid(),
                //     content: data.name,
                //   }
                // ],
                name: data.name,
                group,
                status,
                tag,
                role,
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
    if (status === 'yes') {
      setAllData([...allData, {}])
    } else if (status === 'no' || status === 'notSure') {
      setAllData([])
    }
  }, [status])


  // const options1 = [
  //   { value: 'brides-side', label: 'Bride Side' },
  //   { value: 'groom-side', label: 'Groom Side' }
  // ]
  // const options2 = [
  //   { value: 'AAA', label: 'AAA' },
  //   { value: 'BBB', label: 'BBB' }
  // ]


  return (
    <Edit>
      <EditTitle>
        With jouful hearts,<br />
        we ask the honor of your presence on our wedding day！
      </EditTitle>
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
          <Select value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="" disabled selected>Please Select</option>
            <option value="brides-side">Brides' side</option>
            <option value="groom-side">Groom's side</option>
          </Select>
          {/* 
          <Select
            value={tag} onChange={(e) => setTag(e.target.value)}
            options={options1}
          />
          <Select options={options2} /> */}




          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="" disabled selected>Please Select</option>
            <option value="friend">Friend</option>
            <option value="family">Family</option>
          </Select>
        </InputWrap>


        <InputWrap>
          <Label>Will you be able to join us at our wedding ?</Label>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="" disabled selected>Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="notSure">Not Sure</option>
          </Select>
        </InputWrap>

        {allData.map((data, index) => (
          <RsvpPack allData={allData} setAllData={setAllData} index={index} key={index} />
        ))}

        <InputWrap>
          <Label>Note :</Label>
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
