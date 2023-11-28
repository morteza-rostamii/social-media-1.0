


/* 
// store comment:id into posts.comments[]
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

      async function updatePostDoc(postDoc, postDocRef) {
        if (postDoc) {
          const postComments = postDoc.comments;
          //postComments.push(newCommentId);
          postDoc.comments.push(newCommentId);
          await updateDoc(postDocRef, postDoc);
        }
      }

      await updatePostDoc(postDoc, postDocRef);
      console.log('comment added to posts!!');

*/