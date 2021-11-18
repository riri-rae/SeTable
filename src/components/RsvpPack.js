import React, { useState } from "react";
import styled from "styled-components";
import Select from 'react-select'


const AddMoreWrap = styled.div`
  width: 600px;
 
`;

const InputWrap = styled.div`
  display: flex;
  /* justify-content: left; */
  height: 32px;
  margin: 16px;
  vertical-align:middle;
`;

const Hr = styled.hr`
/* background-image: url('/images/hr-light.png');
background-position: center; */
/* background-attachment: fixed; */
/* background-repeat: no-repeat; */
/* background-size: 100%;
  width: 600px;
  height: 30px; */
  height: 2px;
  width: 96%;
  border-radius: 5px;
  background-color: rgba(117, 99, 66, 0.5);
  border-style: none;
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

const EditText = styled.div`
  font-size: 20px;
  flex-direction: row;
`;

const SelectStyle = styled(Select)`
 min-width: 160px;
 font-size: 16px;
 margin-left:16px;
 min-height: 32px;
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  /* position: relative; */
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
  transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s; /* Safari */
  
`;

const AddButton = styled(Button)`
&:hover{
    transition-duration: 0.1s;
    background-color: #A49393;
    color:#fff
  }
  :active {
  background-color: #DCAE96;
  box-shadow: 1px 2px #ccc;
  transform: translateY(3px);
}

`;

const RemoveButton = styled(Button)`
&:hover{
    transition-duration: 0.1s;
    background-color: #9B5B5B;
    color:#fff
  }

`;

// function RsvpPack({ data, submit, setData, data }) {
function RsvpPack({ allData, setAllData, index }) {

  function handelRemove(e) {
    console.log(e.target.value)
    console.log(index)
    const changedForm = [...allData];
    changedForm.splice(index, 1);
    setAllData(changedForm);

  }

  const [veggie, setVeggie] = useState('');
  const veggies = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]
  //console.log(veggie)

  const [baby, setBaby] = useState('');
  const babys = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]


  return (

    <>
      <Hr />
      <AddMoreWrap>
        <InputWrap>
          <Label htmlFor="bride-name">Name:</Label>
          <Input
            type="text"
            id="name"
            placeholder="Enter your name"
            // value={name}
            onChange={(e) => {
              let allDataInForm = [...allData];
              allDataInForm[index] = { ...allDataInForm[index], name: e.target.value };
              setAllData(allDataInForm);
            }}
          />
        </InputWrap>


        <InputWrap>
          <Label>Vegetarian meal?</Label>
          <SelectStyle
            placeholder="Please Select"
            value={veggie}
            onChange={(value) => {
              setVeggie(value)
              let allDataInForm = [...allData];
              allDataInForm[index] = { ...allDataInForm[index], veggie: value.value };
              setAllData(allDataInForm);
            }}
            options={veggies}
          />
          {/* <Select
            onChange={(e) => {
              let allDataInForm = [...allData];
              allDataInForm[index] = { ...allDataInForm[index], veggie: e.target.value };
              setAllData(allDataInForm);
            }}>
            <option value="" disabled selected>Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select> */}
        </InputWrap>
        <InputWrap>
          <Label>Require baby seat?</Label>
          <SelectStyle
            placeholder="Please Select"
            value={baby}
            onChange={(value) => {
              setBaby(value)
              let allDataInForm = [...allData];
              allDataInForm[index] = { ...allDataInForm[index], baby: value.value };
              setAllData(allDataInForm);
            }}
            options={babys}
          />

          {/* <Select
            onChange={(e) => {
              let allDataInForm = [...allData];
              allDataInForm[index] = { ...allDataInForm[index], baby: e.target.value };
              setAllData(allDataInForm);
            }}>
            <option value="" disabled selected>Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select> */}
        </InputWrap>
        <BtnWrap>
          <AddButton
            type="button"
            onClick={() => {
              setAllData([...allData, {}])
            }}
          >
            + Click To Add More Guests
          </AddButton>
          {index > 0 ? (<RemoveButton
            onClick={(e) => handelRemove(e)}
          >
            Remove
          </RemoveButton>) : null}
        </BtnWrap>
      </AddMoreWrap>
    </>
  );
}

export default RsvpPack;
