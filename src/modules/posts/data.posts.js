
import { getFirestore, query, where, collection, getDocs, doc, getDoc, collectionGroup, limit, orderBy, updateDoc } from 'firebase/firestore';
import {firestore} from '@/firebase/firedb'

const postsCollectionRef = collection(firestore, 'posts');

// add authUser to post.likes and return updated post
export async function toggleLikePost({
  postId,
  userId,
}) {
  async function getPostDoc(postId) {
    // get a ref to posts.doc
    const postDocRef = doc(firestore, 'posts', postId);
    const postSnapShot = await getDoc(postDocRef);
    if (postSnapShot.exists()) {
      const postDoc = {id: postSnapShot.id, ...postSnapShot.data()};
      return {
        postDoc,
        postDocRef
      };
    }
    return;
  }

  const {postDoc, postDocRef} = await getPostDoc(postId);

  // check if authUser has liked the post
  const userLiked = hasUserLiked(postDoc.likes, userId);

  // if: user is already in likes =: dislike
  if (userLiked) {
    async function updatePostDoc(postDoc, postDocRef) {
      if (postDoc) { 
        let newLikes = [];
        
        newLikes = postDoc.likes.filter(like => like !== userId);
        postDoc.likes = newLikes;
        await updateDoc(postDocRef, postDoc);
      }
    }
  
    await updatePostDoc(postDoc, postDocRef);
    console.log('user has disliked!!');
  }
  
  // if user is not in likes
  if (!userLiked) {
    async function updatePostDoc(postDoc, postDocRef) {
      if (postDoc) {
        postDoc.likes.push(userId);
        await updateDoc(postDocRef, postDoc);
      }
    }
  
    await updatePostDoc(postDoc, postDocRef);
    console.log('user has liked!!');
  }

  // get updated post
  const {postDoc: postDoc2, postDocRef: postDocRef2} = await getPostDoc(postId);
  return postDoc2; 
}

export function hasUserLiked(likes, userId) {
  return likes.some(like => like === userId);
}

/* export async function getLikesCount(post) {
  return 
} */
