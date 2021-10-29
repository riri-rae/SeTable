import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/firebase";
import "firebase/firestore";

const BlockWrap = styled.div`
  position: relative;
  height: 8rem;
`;

const Block = styled.div`
  position: fixed;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #ddd;
  background: #b8ab9b;
  border-radius: 5px;
  width: 80%;
  text-align: center;
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const BlockTitle = styled.div`
  color: #574e56;
  font-size: 2rem;
  margin: 16px 0;
`;

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
  border: 1px solid #000;
  background: #fff;
  border-radius: 16px;
  font-size: 14px;
  cursor: pointer;
`;

const Input = styled.input`
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
`;
const PText = styled.p`
   font-size: 16px;
   letter-spacing: 1;
`;

const MainTitleContainer = styled.div`
  margin: 0 auto;
  padding: 24px 16px;
  width: 76%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
`;

const SubTitleContainer = styled(MainTitleContainer)`
  padding: 0px 16px 24px 46px;

  &:last-child{
   padding-bottom: 160px;
 }
`;

const Subtitle = styled.div`
  padding: 0px 32px 8px 32px;
  font-size: 18px;
  margin-left: 4px;
  letter-spacing: 1px;
  align-items:center;
  justify-content: space-around;
`;


const Content = styled(Subtitle)`
  padding: 0px 32px 8px 32px;
  font-size: 18px;
  margin-left: 4px;
  letter-spacing: 1px;
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

 &:nth-child(6){
   width: 276px;
 }
`;

const NoteTd = styled(Td)`
 min-width: 276;
`;



const db = firebase.firestore();

function GuestList() {
  // const [guest, setGuest] = useState([]);

  // useEffect(() => {
  //   const myList = [];
  //   db.collection("users")
  //     .doc("0pNg8BybCeidJQXjrYiX")
  //     .collection("rsvp")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         let allList = doc.data().guestlist;
  //         setGuest([allList])
  //         console.log(...allList);

  //       });

  //     });
  // }, []);


  return (
    <>
      <BlockWrap>
        <Block>
          <BlockTitle>Arrange your guests here!</BlockTitle>
          {/* <Input /> */}
          {/* <Button
            type="button"
            onClick={() => {
              setState([...state, []]);
            }}
          >
            search
          </Button> */}
        </Block>
      </BlockWrap>
      <MainTitleContainer>
        <Title>Joyfully Attend</Title>
        <Count>50</Count>
        <DropBtn >▼</DropBtn>
        <Input />
        <Button>
          Add Guest
        </Button>
        <Hr />
      </MainTitleContainer>
      <SubTitleContainer>
        <table>
          <tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Vegetarian</Th>
            <Th>Baby Seat</Th>
            <Th>Phone</Th>
            <Th>Note</Th>
            <Th>Delete</Th>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
            <Td><DelButton>Delete</DelButton></Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's Family</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>I don't want to seat next to Jimmy</Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Oh My Goooooood</Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's Family</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
          </tr>
        </table>

      </SubTitleContainer>
      <MainTitleContainer>
        <Title>Regretfully Decline</Title>
        <Count>8</Count>
        <DropBtn>▼</DropBtn>
        <Hr />
      </MainTitleContainer>

      <SubTitleContainer>
        <table>
          <tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Vegetarian</Th>
            <Th>Baby Seat</Th>
            <Th>Phone</Th>
            <Th>Note</Th>
            <Th>Delete</Th>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Groom's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats hahahahhaahahaha happy happy forever blablablablablbalba</Td>
            <Td><button>Delete</button></Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <NoteTd>Congrats</NoteTd>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
          </tr>

        </table>

      </SubTitleContainer>

      <MainTitleContainer>
        <Title>Not Sure</Title>
        <Count>5</Count>
        <DropBtn>▼</DropBtn>
        <Hr />
      </MainTitleContainer>
      <SubTitleContainer>
        <table>
          <tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Vegetarian</Th>
            <Th>Baby Seat</Th>
            <Th>Phone</Th>
            <Th>Note</Th>
            <Th>Delete</Th>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
          </tr>
          <tr>
            <Td>ＡＢＣ</Td>
            <Td>Bride's BFF</Td>
            <Td>
              <select>
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
            <Td>0911123456</Td>
            <Td>Congrats</Td>
          </tr>
        </table>

      </SubTitleContainer>

    </>
  );
}

export default GuestList;
