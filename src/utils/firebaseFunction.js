import firebase from "./firebase";
import Swal from "sweetalert2";

const db = firebase.firestore()

function onSnapshotInvitationDfault(uid, callback) {
    db.collection("users")
        .doc(uid)
        .collection("invitation")
        .doc("template")
        .onSnapshot(doc => callback(doc))
}

function saveChange(uid, bride, groom, dateTime, add, pic) {
    if (!bride || !groom || !dateTime || !add) {
        Swal.fire("", "Can't save with an emty column ", "warning");
    } else {
        db.collection("users")
            .doc(uid)
            .collection("invitation")
            .doc("template")
            .set({
                bride,
                groom,
                dateTime,
                add,
                pic,
            })
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    }
}

export { onSnapshotInvitationDfault, saveChange }
