import { getFirestore, query, where, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import {firestore} from '@/firebase/firedb'

const commentsCollectionRef = collection(firestore, 'comments');

export async function fetchCommentById(commentId) {
  console.log('lover:: ', commentId)
  const docRef = doc(commentsCollectionRef, commentId);
  const docSnapshot = await getDoc(docRef);

  let document = null;
  if (docSnapshot.exists) {
    document = {
      id: docSnapshot.id,
      ...docSnapshot.data()
    };
  }
  else {
    console.log('no such doc!!');
  }

  return document;
}