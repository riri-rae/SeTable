import React, { useState, useEffect } from "react";
//import Select from 'react-select'
import styled from "styled-components";
import firebase from "../utils/firebase";
import "firebase/firestore";
import { v4 as uuid } from "uuid";
import RsvpPack from "./RsvpPack";

//import { useParams } from "react-router";

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

const RsvpMain = () => {
  //const { userid } = useParams()
  const [group, setGroup] = useState('');
  const [tag, setTag] = useState('');
  const [role, setRole] = useState('');

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
      window.alert('Please let us you are our?')
    }
    else {
      allData.forEach((data) => {
        console.log(data.guestlist)
        // if (!data.name === '' && data.status === '' && data.baby === '' && data.veggie === '' && data.note === '') {
        //   window.alert('Please fill in your detail information')
        // } 
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
    <>
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
    </>
  );
};

export default RsvpMain;
