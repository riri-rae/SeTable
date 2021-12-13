import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";

const AddMoreWrap = styled.div`
  width: 100%;
  margin-left: 12px;
  @media (max-width: 1320px) {
    margin-left: 0;
  }
`;

const InputWrap = styled.div`
  display: flex;
  margin: 16px;
  vertical-align: middle;
  @media (max-width: 1680px) {
    flex-wrap: wrap;
    margin: 8px;
  }
`;

const Hr = styled.hr`
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
  vertical-align: middle;
  outline: none;
  border-radius: 5px;
  padding: 8px;
  color: #44342d;
  letter-spacing: 1px;
  @media (max-width: 425px) {
    margin-left: 0;
  }
`;

const Label = styled.div`
  float: left;
  text-align: right;
  line-height: 32px;
  @media (max-width: 425px) {
    width: 100%;
    float: none;
    text-align: left;
  }
`;

const SelectStyle = styled(Select)`
  min-width: 160px;
  font-size: 16px;
  margin-left: 16px;
  min-height: 32px;
  @media (max-width: 425px) {
    margin-left: 0;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 16px;
  margin-left: 4px;
  padding: 0.2rem 0.6rem;
  color: #574e56;
  border: 1px solid #ddd;
  border-radius: 16px;
  font-size: 1rem;
  cursor: pointer;
  transition-duration: 0.1s;
`;

const AddButton = styled(Button)`
  &:hover {
    transition-duration: 0.1s;
    background-color: #a49393;
    color: #fff;
  }
  :active {
    background-color: #dcae96;
    box-shadow: 1px 2px #ccc;
    transform: translateY(3px);
  }
`;

const RemoveButton = styled(Button)`
  &:hover {
    transition-duration: 0.1s;
    background-color: #9b5b5b;
    color: #fff;
  }
`;

function RsvpPack({ allData, setAllData, index }) {
  function handelRemove(e) {
    const changedForm = [...allData];
    changedForm.splice(index, 1);
    setAllData(changedForm);
  }

  const [veggie, setVeggie] = useState("");
  const veggies = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const [baby, setBaby] = useState("");
  const babys = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

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
            value={allData[index].name}
            onChange={(e) => {
              let allDataInForm = [...allData];
              allDataInForm[index] = {
                ...allDataInForm[index],
                name: e.target.value,
              };
              setAllData(allDataInForm);
            }}
          />
        </InputWrap>

        <InputWrap>
          <Label>Vegetarian meal?</Label>
          <SelectStyle
            placeholder="Please Select"
            value={{
              value: allData[index].veggie,
              label: allData[index].veggie,
            }}
            onChange={(value) => {
              setVeggie(value);
              let allDataInForm = [...allData];
              allDataInForm[index] = {
                ...allDataInForm[index],
                veggie: value.value,
              };
              setAllData(allDataInForm);
            }}
            options={veggies}
          />
        </InputWrap>
        <InputWrap>
          <Label>Require baby seat?</Label>
          <SelectStyle
            placeholder="Please Select"
            value={{ value: allData[index].baby, label: allData[index].baby }}
            onChange={(value) => {
              setBaby(value);
              let allDataInForm = [...allData];
              allDataInForm[index] = {
                ...allDataInForm[index],
                baby: value.value,
              };
              setAllData(allDataInForm);
            }}
            options={babys}
          />
        </InputWrap>
        <BtnWrap>
          <AddButton
            type="button"
            onClick={() => {
              setAllData([...allData, {}]);
            }}
          >
            + Click To Add More Guests
          </AddButton>
          {index > 0 ? (
            <RemoveButton onClick={(e) => handelRemove(e)}>Remove</RemoveButton>
          ) : null}
        </BtnWrap>
      </AddMoreWrap>
    </>
  );
}

export default RsvpPack;
