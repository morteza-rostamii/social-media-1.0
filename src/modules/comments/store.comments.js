import {create} from 'zustand'
import {firestore} from '@/firebase/firedb'
import {getDocs, collection, deleteDoc, doc, addDoc, updateDoc, query, where, onSnapshot, Timestamp, limit, startAfter, getDoc, orderBy } from 'firebase/firestore'
//import { getDocFromResponse } from '@/utils/utils.fixdata';
import { Post } from '@/schemas/schema';

import useAuthStore from '@/modules/auth/store.auth'
import { fetchProfileByUserId } from '../profiles/data.profiles';
import {fetchCommentById} from '@/modules/comments/data.comments'

// reference to blogs_collection
const commentsCollectionRef = collection(firestore, 'comments');

const useCommentsStore = create((set, get) => ({
  comments: [], // [Post]
  singlePost: null, //Post
  lastDoc: null, // last post fetched

  // create post data
  newPost: new Post({}),

  setNewPost(data) {
    set(state => ({...state, newPost: {...state.newPost, ...data}}));
  },

  resetNewPost() {
    set(state => ({...state, newPost: new Post({})}));
  },

  //========================================
  
  // update comments on new post added
  // runs on any request: get, put, post, delete
  /* oncommentsUpdate() {



    const unsub = onSnapshot(commentsCollectionRef, (snapShot) => {

      // check if collection size has changed!!
      //snapShot.size > 0
      if (get().comments !== null) {
        console.log('new post added!!');

        //console.log(snapShot)
        const data = snapShot?.docChanges();
        let createdDoc = null;
        if (data) {
          createdDoc = data.map(change => {
            //if (change.type == 'modified') {
              const theDoc = {id: change.doc.id, ...change.doc.data()}
              return theDoc;
            //}
          });
        }

        // if: a doc is created add the doc to front
        console.log('before update with new doc!!-----')
        console.log(data, '----', createdDoc)
        if (createdDoc[0]) {
          console.log('update with new doc!!')

          // check to see new item already exist in state or not
          const doesExist = get().comments.some(p => p.id === createdDoc[0].id);
          if (doesExist) createdDoc = [];

          set(state => ({
            ...state,
            comments: [
              ...createdDoc, 
              ...state.comments],
          }));
        }
      }
    });

    return unsub;
  }, */

  // Get: /blogs
  async fetchInitComments(page=1, lim=44) {
    
    try {
      //const querySnapshot = await getDocs(query(collection(db, 'users'), limit(5)));
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
      newComments.forEach(async (comment) => {
        const profile =  await fetchProfileByUserId(comment.user);
        comment.user = profile;
      });

      // get parent object
      async function getParentComment() {
        if (newComments?.length) {
          for (let i=0; i < newComments.length; i++) {
            console.log(newComments)
            const comment = newComments[i];
            if (comment.parent) {
              const parentDoc = await fetchCommentById(comment.parent);
              newComments[i].parent = parentDoc;
            }
          }
        }
      }

      await getParentComment();

      set(state => ({
        ...state, 
        comments: [...newComments],
        // set the last doc fetched
        lastDoc: docs[docs.length - 1],
      }));
    } catch(error) {
      console.log(error.message);
    }
  },

  // get more comments
  async fetchMoreComments(page=1, lim=2) {
    const querySnapshot = await getDocs(query(
      commentsCollectionRef, 
      limit(lim),
      startAfter(get().lastDoc)
      ));          
      const docs = querySnapshot.docs;
      const morecomments = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      set(state => ({
        ...state, 
        comments: [...state.comments, ...morecomments],
        // set the last doc fetched
        // if: docs empty =: lastDoc = undefined
        lastDoc: docs[docs.length - 1],
      }));
  },

  async fetchSinglePost(postId) {
    try { 
      const docRef = doc(commentsCollectionRef, postId);
      const docSnapshot = await getDoc(docRef);

      let document = null;
      if (docSnapshot.exists) {
        document = docSnapshot.data();
      }
      else {
        console.log('no such doc!!');
      }

      set(state => ({...state, singlePost: document}));
    } catch(error) {
      console.log(error.message);
    }
  },

  // get published blogs
  async getPublishedBlogs() {

    try {
      const res = query(
        commentsCollectionRef, 
        where("published", "==", true));

      const snapshot = await getDocs(res);
      const publishedBlogs = snapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()};
      })

      return publishedBlogs;
    } catch(error) {
      console.log(error.message);
    }
  },
  
  // Post: /blogs
  async createCommentAct(data, postId) {
    data.user = useAuthStore.getState().authUser.uid;

    try {
      const docRef = await addDoc(commentsCollectionRef, data);
  
      console.log(docRef, docRef.id);
      //console.log(docRef.data())
      const newCommentId = docRef.id;
      
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

      // update ui_state with new comment
      const createdComment = await fetchCommentById(newCommentId);

      set(state => ({...state, comments: [...state.comments, createdComment]}));

    } catch(error) {
      console.log(error.message);
    }
      
  },

  // Put: /blogs/:id
  editBlog: (id, {title, body}) => {
    const blogDoc = doc(firestore, 'blogs', id);

    // real-time snapshot on change
    const unsub = onSnapshot(
      doc(firestore, 'blogs', id), 
      async (doc) => {
        try {
          const updatedBlog = {id: doc.id, ...doc.data()};
          
          set(state => ({
            ...state, 
            blogs: state.blogs.map(b => {
              if (b.id === id) return updatedBlog;
              else return b;
          })}));

        } catch(error) {
          console.log(error.message)
        }
      })

    updateDoc(blogDoc, {
      title: title,
      body: body,
    })
      .then(async () => {
        //const updatedBlogDoc = await getDocFromResponse(firestore, 'blogs', id);
        

        // after update unsubscribe
        unsub();
      })
      .catch((error) => {
        console.log(error.message);
      })
    
  },

  async deleteBlog(id) {

    try {
      const blogDoc = doc(firestore, 'blogs', id);
      await deleteDoc(blogDoc);

      // update state, after delete
      //const UpdatedBlogDoc = doc(firestore, 'blogs', id);
      const newBlogs = get().blogs.filter((blog) => blog.id !== id);
      set(state => ({...state, blogs: newBlogs}));
    } catch(error) {
      console.log(error.message);
    }
  },
}));

// subscribe
useCommentsStore.subscribe((state) => console.log(state));

export default useCommentsStore