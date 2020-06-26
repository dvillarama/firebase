import { db } from '../services/firebase';

export async function writeUserData(userId, email, service) {
  try {
    console.log({userId, email, service});
    const dbResult = await db.ref(`users/${userId}`).set({
      email,
      service
    });
    console.log({dbResult});

  } catch (err) {
    console.error(err);
  }
}
