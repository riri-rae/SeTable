import React from 'react';
import styled from "styled-components";

const AddMoreWrap = styled.div`
  /* margin-bottom: 8px;
  display: inline-block;
  vertical-align: middle;
  color: #666;
  border:1px solid #ddd; */

  border-top: 2px solid #ddd;
 
`;

const InputWrap = styled.div`
  /* display: flex;
  line-height: 20px;
  margin: 16px; */

  display: flex;
  /* justify-content: left; */
  line-height: 20px;
  margin: 16px;
  vertical-align:middle;
`;

const Input = styled.input`
  border: 2px solid #ddd;
  line-height: 22px;
  font-size: 18px;
  margin-left: 8px;
  vertical-align:middle;
  outline: none;
  border-radius: 4px;
`;

const Label = styled.label`
  /* width: 200px; */
  /* text-align: right; */

  /* margin-bottom: 8px;
  display: inline-block;
  vertical-align: middle;
  color: #666; */

  float:left; 
  text-align:right;
`;


const EditText = styled.div`
  font-size: 20px;
  flex-direction: row;
`;

const Select = styled.select`
  text-align: center;
  margin-left: 8px;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 16px;
  margin-left: 4px;
  padding: 0.5rem;
  color: #574e56;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 16px;
  font-size: 1rem;
  cursor: pointer;
`;

const DelButton = styled(Button)`
  /* display: flex; */
  /* align-items: center; */
  margin: 0 auto;
  /* margin-left:4px; */
  padding: 0.4rem;
  color: #574e56;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 16px;
  font-size: 14px;
  cursor: pointer;
`;
// const Textarea = styled.textarea`
//   resize: none;
//   height: 30px;
//   line-height: 30px;
//   border-radius: 8px;
// `;

// function RsvpPack({ data, submit, setData, data }) {
function RsvpPack({ allData, setAllData, index }) {

  const changedForm = [...allData];
  console.log(changedForm)

  function handelRemove(e) {
    console.log(e.target.value)
    console.log(index)
    const changedForm = [...allData];
    changedForm.splice(index, 1);
    setAllData(changedForm);

  }

  return (
    <AddMoreWrap>

      <InputWrap>
        <Label htmlFor="bride-name">Name:</Label>
        <Input
          type="text"
          id="bride-name"
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
        <Select
          onChange={(e) => {
            let allDataInForm = [...allData];
            allDataInForm[index] = { ...allDataInForm[index], veggie: e.target.value };
            setAllData(allDataInForm);
          }}>
          <option value="" disabled selected>Please Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Select>
      </InputWrap>
      <InputWrap>
        <Label>Require baby seat?</Label>
        <Select
          onChange={(e) => {
            let allDataInForm = [...allData];
            allDataInForm[index] = { ...allDataInForm[index], baby: e.target.value };
            setAllData(allDataInForm);
          }}>
          <option value="" disabled selected>Please Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Select>
      </InputWrap>

      {index > 0 ? (<DelButton
        onClick={(e) => handelRemove(e)}
      >
        Remove
      </DelButton>) : null}
      <Button
        type="button"
        onClick={() => {
          setAllData([...allData, {}])
        }}
      >
        Click To Add More Guests
      </Button>

    </AddMoreWrap>

  );
}

export default RsvpPack;
