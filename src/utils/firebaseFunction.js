import firebase from "./firebase";
import "firebase/firestore";
import "firebase/auth";

const db = firebase.firestore();

//invitation edit
function snapshotEditDefault(uid, callback) {
    db.collection("users")
        .doc(uid)
        .collection("invitation")
        .doc("template")
        .onSnapshot((doc) => callback(doc));
}

function saveEditTemplate(uid, bride, groom, dateTime, add, pic) {
    return db
        .collection("users")
        .doc(uid)
        .collection("invitation")
        .doc("template")
        .set({
            bride,
            groom,
            dateTime,
            add,
            pic,
        });
}

//table
function getHistory(uid, callback) {
    db.collection("users")
        .doc(uid)
        .get()
        .then((doc) => callback(doc));
}

function getHistoryParse(uid, callback) {
    db.collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
            const historyList = JSON.parse(doc.data().guestlist);
            callback(historyList)
        });
}

function updateHistory(uid, data) {
    const update = {};
    update.guestlist = JSON.stringify(data);
    db.collection("users").doc(uid).update(update);
}

function setHistory(uid, callback) {
    db.collection("users")
        .doc(uid)
        .onSnapshot((doc) => {
            let saveList = JSON.parse(doc.data().guestlist);
            callback(saveList);
        });
}

function getVeggie(uid, callback) {
    db.collection("users")
        .doc(uid)
        .collection("rsvp")
        .where("veggie", "==", "yes")
        .onSnapshot((querySnapshot) => {
            const getVeggie = [];
            querySnapshot.docs.forEach((doc) => {
                getVeggie.push(doc.data().id);
            });
            callback(getVeggie);
        });
}

function getBaby(uid, callback) {
    db.collection("users")
        .doc(uid)
        .collection("rsvp")
        .where("baby", "==", "yes")
        .onSnapshot((querySnapshot) => {
            const getBaby = [];
            querySnapshot.docs.forEach((doc) => {
                getBaby.push(doc.data().id);
            });
            callback(getBaby);
        });
}

//guestlist pack
function saveGuestlistPack(
    uid,
    id,
    name,
    group,
    tag,
    role,
    baby,
    veggie,
    note
) {
    return db.collection("users").doc(uid).collection("rsvp").doc(id).update({
        name,
        group,
        tag,
        role,
        baby,
        veggie,
        note,
    });
}

function deleteGuestlistPack(uid, id) {
    db.collection("users").doc(uid).collection("rsvp").doc(id).delete();
}

function getUserData(uid, callback) {
    db.collection("users")
        .doc(uid)
        .get()
        .then((doc) => callback(doc));
}

//homepage

function saveHomepageDate(uid, enterDate) {
    return db
        .collection("users")
        .doc(uid)
        .collection("invitation")
        .doc("template")
        .set(
            {
                dateTime: enterDate,
            },
            { merge: true }
        );
}

function getTemplateData(uid, callback) {
    db.collection("users")
        .doc(uid)
        .collection("invitation")
        .doc("template")
        .onSnapshot((doc) => callback(doc));
}

function getRsvpData(uid, callback) {
    db.collection("users")
        .doc(uid)
        .collection("rsvp")
        .orderBy("time", "desc")
        .onSnapshot((doc) => callback(doc));
}



export {
    snapshotEditDefault,
    saveEditTemplate,
    updateHistory,
    getHistory,
    setHistory,
    getVeggie,
    getBaby,
    saveGuestlistPack,
    deleteGuestlistPack,
    getUserData,
    saveHomepageDate,
    getTemplateData,
    getRsvpData,
    getHistoryParse
};
