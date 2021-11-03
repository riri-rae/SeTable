import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";
import { v4 as uuid } from "uuid";
import GuestlistPack from "./components/GuestlistPack";

const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 16px;
  margin-left:4px;
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

const InputNew = styled(Input)`
  display: flex;
  align-items: center;
  margin: 16px;
  margin-left:24px;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 16px;
  cursor: pointer;
  font-size: 14px;
  max-width: 100%;
  text-align: left;
`;
// const PText = styled.p`
//    font-size: 16px;
//    letter-spacing: 1;
// `;

const MainTitleContainer = styled.div`
  margin: 0 auto;
  padding: 24px 16px;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
`;

const SubTitleContainer = styled(MainTitleContainer)`
  padding: 0px 16px 24px 16px;

  &:last-child{
   padding-bottom: 160px;
 }
`;


const Title = styled.div`
  font-size: 20px;
  color: #574e56;
  margin-left: 16px;
`;
const Count = styled(Title)``;

const DropBtn = styled.button`
  margin-left: 16px;
  font-size: 14px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
`;
// const button = styled(DropBtn)`
//   font-size: 14px;
//   border: 1px solid #ddd;
//   background: #fff;
//   border-radius: 5px;
//   cursor: pointer;
// `;

const Hr = styled.hr`
  width: 100%;
  margin-top: 8px;
  background-color: #e5c290;
  height: 2px;
  border-style: none;
`;

const Th = styled.th`
 text-align:center;
 color:#574E56;
 font-size: 16px;
`;

const Td = styled.td`
 text-align:center;
 color: #574E56;
 line-height:36px;
 border-bottom: 1px solid #ddd;

 &:nth-child(7){
   width: 12rem;
 }
`;

// const NoteTd = styled(Td)`
//  min-width: 276;
// `;

const Select = styled.select`
  color:#000;
  text-align: center;
`;

const Textarea = styled.textarea`
  resize: none;
  height:30px;
  line-height: 30px;
  border-radius: 8px;
`;



//const db = firebase.firestore();

function GuestList() {
  const [allData, SetAllData] = useState([]);
  const [addYes, setAddYes] = useState('');

  const [name, setName] = useState([]);
  const [group, setGroup] = useState('');
  const [status, setStatus] = useState("");
  const [tag, setTag] = useState("");
  const [role, setRole] = useState("");
  const [veggie, setVeggie] = useState("");
  const [baby, setBaby] = useState("");
  const [note, setNote] = useState("");

  const db = firebase.firestore();
  useEffect(() => {
    db.collection("users")
      .doc("0pNg8BybCeidJQXjrYiX")
      .collection("rsvp")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
          // let group = doc.data().group;
          let guestlist = doc.data().guestlist;
          // let tag = doc.data().tag;
          // console.log(group)
          console.log(guestlist[0].content)
          // console.log(tag)
        });
        SetAllData(data);
        console.log(allData)
      })
  }, []);

  function onSubmit(body) {
    const rsvp = db
      .collection("users")
      .doc("0pNg8BybCeidJQXjrYiX")
      .collection("rsvp")
      .doc();
    rsvp.set(body);
  }




  return (
    <>
      <MainTitleContainer>
        <Title>Joyfully Attend</Title>
        <Count>50</Count>
        <DropBtn >▼</DropBtn>
        <InputNew
          type="text"
          id="bride-name"
          placeholder="Enter a new name"
          value={addYes}
          onChange={(e) => setAddYes(e.target.value)}
        />
        <Button
          onClick={() => {
            let body = {
              guestlist: [
                {
                  id: uuid(),
                  content: addYes,
                },
              ],
              status: 'yes',
              group,
              tag,
              role,
              baby,
              veggie,
              note,
              // userid
            };
            onSubmit(body);
          }}
        >
          Add Guest
        </Button>
        <Hr />
      </MainTitleContainer>
      <SubTitleContainer>
        <table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Group</Th>
              <Th>Tag</Th>
              <Th>Role</Th>
              <Th>Vegetarian</Th>
              <Th>Baby Seat</Th>
              <Th>Note</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </tr>
          </thead>
          <tbody>
            {allData.map((data, index) => (
              data.status === 'yes' ?
                <tr key={index}>
                  <Td>
                    <Input
                      type="text"
                      id="bride-name"
                      placeholder="Enter your name"
                      value={data.guestlist[0].content}
                      onChange={(e) => setName(e.target.value)}
                    //onChange={(e) => changeValue(index, 'name', e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="text"
                      id="group-name"
                      placeholder="Enter the name"
                      value={data.group}
                      onChange={(e) => setGroup(e.target.value)}
                    /></Td>

                  <Td>
                    <Select value={data.tag} onChange={(e) => setTag(e.target.value)}>
                      <option value="disable">Please Select</option>
                      <option value="brides-side">Brides' side</option>
                      <option value="grooms-side">Groom's side</option>
                    </Select>
                  </Td>
                  <Td>
                    <Select value={data.role} onChange={(e) => setRole(e.target.value)}>
                      <option value="disable">Please Select</option>
                      <option value="friend">Friend</option>
                      <option value="family">Family</option>
                    </Select>
                  </Td>
                  <Td>
                    <Select value={data.veggie} onChange={(e) => setVeggie(e.target.value)}>
                      <option value="disable">Please Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  </Td>
                  <Td>
                    <Select value={data.baby} onChange={(e) => setBaby(e.target.value)}>
                      <option value="disable">Please Select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Select>
                  </Td>

                  <Td>
                    <Textarea
                      placeholder="Add note"
                      value={data.note}
                      onChange={(e) => setNote(e.target.value)}
                    ></Textarea>
                  </Td>
                  <Td><DelButton>Edit</DelButton></Td>
                  <Td><DelButton>Delete</DelButton></Td>
                </tr> : <></>
            ))
            }

          </tbody>
        </table>
      </SubTitleContainer>

      <MainTitleContainer>
        <Title>Not Sure</Title>
        <Count>8</Count>
        <DropBtn>▼</DropBtn>
        <InputNew />
        <Button>
          Add Guest
        </Button>
        <Hr />
      </MainTitleContainer>

      <SubTitleContainer>
        <table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Group</Th>
              <Th>Tag</Th>
              <Th>Role</Th>
              <Th>Vegetarian</Th>
              <Th>Baby Seat</Th>
              <Th>Note</Th>
              <Th>Delete</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>ＡＢＣ</Td>
              <Td>ＡＢＣ</Td>
              <Td>
                <select>
                  <option>Bride Side</option>
                  <option>Groom Side</option>
                </select>
              </Td>
              <Td>
                <select>
                  <option>Friend</option>
                  <option>Relative</option>
                </select>
              </Td>
              <Td>
                <select>
                  <option>--</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </Td>
              <Td>
                <select>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </Td>

              <Td>Congrats</Td>
              <Td><DelButton>Delete</DelButton></Td>
            </tr>


          </tbody>
        </table>

      </SubTitleContainer>

      <MainTitleContainer>
        <Title>Regretfully Decline</Title>
        <Count>5</Count>
        <DropBtn>▼</DropBtn>
        <InputNew />
        <Button>
          Add Guest
        </Button>
        <Hr />
      </MainTitleContainer>
      <SubTitleContainer>
        <table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Group</Th>
              <Th>Tag</Th>
              <Th>Role</Th>
              <Th>Vegetarian</Th>
              <Th>Baby Seat</Th>
              <Th>Note</Th>
              <Th>Delete</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>ＡＢＣ</Td>
              <Td>ＡＢＣ</Td>
              <Td>
                <select>
                  <option>Bride Side</option>
                  <option>Groom Side</option>
                </select>
              </Td>
              <Td>
                <select>
                  <option>Friend</option>
                  <option>Relative</option>
                </select>
              </Td>
              <Td>
                <select>
                  <option>--</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </Td>
              <Td>
                <select>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </Td>

              <Td>Congrats</Td>
              <Td><DelButton>Delete</DelButton></Td>
            </tr>


          </tbody>
        </table>

      </SubTitleContainer>
    </>
  );
}

export default GuestList;
