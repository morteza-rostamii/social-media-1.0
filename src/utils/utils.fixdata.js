import {getDoc, doc} from 'firebase/firestore'

// get doc out of doc() output
export async function getDocFromResponse(firestore, collectionName, id) {
  const docRef = doc(firestore, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const newDoc = docSnap.data();
    // id is not on doc
    newDoc.id = docSnap.id;
    return newDoc;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return undefined;
  }
}