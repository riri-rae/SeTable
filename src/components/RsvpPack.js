import React from 'react';
import styled from "styled-components";

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

const Input = styled.input`
  display: flex;
  align-items: center;
  margin: 4px;
  /* margin-left:24px; */
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  max-width: 6rem;
`;

const Label = styled.label`
  /* width: 200px; */
  /* text-align: right; */

  margin-bottom: 8px;
  display: inline-block;
  vertical-align: middle;
  color: #666;
`;

const InputWrap = styled.div`
  display: flex;
  line-height: 20px;
  margin: 16px;
`;

const AddMoreWrap = styled.div`
  margin-bottom: 8px;
  display: inline-block;
  vertical-align: middle;
  color: #666;
  border:1px solid #ddd;
`;

const EditText = styled.div`
  font-size: 20px;
  flex-direction: row;
`;

const Select = styled.select`
  color: #000;
  text-align: center;
`;

const Textarea = styled.textarea`
  resize: none;
  height: 30px;
  line-height: 30px;
  border-radius: 8px;
`;

// function RsvpPack({ data, submit, setData, data }) {
function RsvpPack({ allData, setAllData, index }) {

  // const [name, setName] = useState([]);
  // const [status, setStatus] = useState("");
  // const [tag, setTag] = useState("");
  // const [role, setRole] = useState("");
  // const [veggie, setVeggie] = useState("");
  // const [baby, setBaby] = useState("");
  // const [note, setNote] = useState("");

  // const [fields, setFields] =
  //   useState([{
  //     name: [],
  //     status: '',
  //     tag: '',
  //     role: '',
  //     veggie: '',
  //     baby: '',
  //     note: ''
  //   }]);

  // function onSubmit(body, id) {
  //   const rsvp = db
  //     .collection("users")
  //     .doc("0pNg8BybCeidJQXjrYiX")
  //     .collection("rsvp");
  //   rsvp.doc(id).set(body);
  // }


  // useEffect(() => {
  //   if (submit) {
  //     const id = db
  //       .collection("users").doc().id;
  //     let body = {
  //       guestlist: [
  //         {
  //           id: uuid(),
  //           content: name,
  //         },
  //       ],
  //       status,
  //       group,
  //       tag,
  //       role,
  //       baby,
  //       veggie,
  //       note,
  //       id
  //     };
  //     onSubmit(body, id);
  //     setData(...data, body);

  //   }, [submit])

  function handelRemove(i) {
    const changedForm = [...allData];
    changedForm.splice(i, 1);
    setAllData(changedForm);

  }


  return (
    <AddMoreWrap>
      <EditText>
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
      </EditText>
      <EditText>
        <InputWrap>
          <div>Will you be able to join us at our wedding?</div>
          <Select
            onChange={(e) => {
              let allDataInForm = [...allData];
              allDataInForm[index] = { ...allDataInForm[index], status: e.target.value };
              setAllData(allDataInForm);
            }}>
            <option value="" disabled selected>Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="notSure">Not Sure</option>
          </Select>
        </InputWrap>
      </EditText>
      {/* <EditText>
        <InputWrap>
          <div>You are on ...</div>
          <Select
            onChange={(e) => {
              let allDataInForm = [...allData];
              allDataInForm[index] = { ...allDataInForm[index], tag: e.target.value };
              setAllData(allDataInForm);
            }}>
            <option value="" disabled selected>Please Select</option>
            <option value="brides-side">Brides' side</option>
            <option value="grooms-side">Groom's side</option>
          </Select>
        </InputWrap>
      </EditText>
      <EditText>
        <InputWrap>
          <div>You are our ...</div>
          <Select
            onChange={(e) => {
              let allDataInForm = [...allData];
              allDataInForm[index] = { ...allDataInForm[index], role: e.target.value };
              setAllData(allDataInForm);
            }}>
            <option value="" disabled selected>Please Select</option>
            <option value="friend">Friend</option>
            <option value="family">Family</option>
          </Select>
        </InputWrap>
      </EditText> */}
      <EditText>
        <InputWrap>
          <div>Would you like to choose a vegetarian meal?</div>
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
          <div>Require baby seat?</div>
          <Select
            onChange={(e) => {
              let allDataInForm = [...allData];
              allDataInForm[index] = { ...allDataInForm[index], baby: e.target.value };
              setAllData(allDataInForm);
            }}>
            <option value="" disabled selected>Please Select</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Select>
        </InputWrap>
        <InputWrap>
          <div>Anything we need to know?</div>
          <Textarea
            placeholder="Leave your note here."
            onChange={(e) => {
              let allDataInForm = [...allData];
              allDataInForm[index] = { ...allDataInForm[index], note: e.target.value };
              setAllData(allDataInForm);
            }}>
          </Textarea>
        </InputWrap>
        <DelButton
          onClick={() => handelRemove()}
        >
          Remove
        </DelButton>
      </EditText>

    </AddMoreWrap>

  );
}

export default RsvpPack;
