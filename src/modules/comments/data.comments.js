import { getFirestore, query, where, collection, getDocs, doc, getDoc, collectionGroup, limit, orderBy } from 'firebase/firestore';
import {firestore} from '@/firebase/firedb'

const commentsCollectionRef = collection(firestore, 'comments');

export async function fetchCommentById(commentId) {
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

//==============================================

export async function fetchCommentsByPostId({
  postId='',
  lim=5,
}) {
  let postComments = [];
  
  const commentsQuery = query(
    commentsCollectionRef, 
    where('postId', '==', postId),
    orderBy('createdAt', 'desc'),
    limit(lim),
    );

  const commentsSnapshot = await getDocs(commentsQuery);

  const docs = commentsSnapshot.docs;

  postComments = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(postComments)

  return {
    postComments,
    lastDoc: docs[docs.length - 1],
  };
}

//==============================================

export async function fetchAllComments() {
  const commentsQuery = query(
    commentsCollectionRef, 
    //desc
    orderBy('createdAt', 'asc'),
    limit(lim))
  const querySnapshot = await getDocs(commentsQuery);          
  const docs = querySnapshot.docs;

  const newComments = docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  });

  // get user_profile for each comment
  /* newComments.forEach(async (comment) => {
    const profile =  await fetchProfileByUserId(comment.user);
    comment.user = profile;
  }); */

  // get parent object
  async function getParentComment() {
    if (newComments?.length) {
      for (let i=0; i < newComments.length; i++) {
        const comment = newComments[i];
        if (comment.parent) {
          const parentDoc = await fetchCommentById(comment.parent);
          newComments[i].parentDoc = parentDoc;
        }
      }
    }
  }

  await getParentComment();
}