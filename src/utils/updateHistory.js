import firebase from "./firebase";
import "firebase/firestore";
import 'firebase/auth';

function updateHistory(data) {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;

    const updateHistory = JSON.stringify(data);
    const update = {};
    update.guestlist = updateHistory;
    db.collection("users").doc(user.uid).update(update);
}


export default updateHistory;