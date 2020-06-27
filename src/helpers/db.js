import { firestore } from '../services/firebase';

export async function writeUserData(uid, email, service) {
  try {
    console.log({saving: true, uid, email, service});
    firestore.collection("users").doc(uid).set({
      uid,
      email,
      service
    });
  } catch (err) {
    console.error(err);
  }
}

export async function deleteUser(uid) {
  try {
    firestore.collection("users").doc(uid).delete();
  } catch (err) {
    console.error(err);
  }
}
