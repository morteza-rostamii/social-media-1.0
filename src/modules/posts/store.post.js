import {create} from 'zustand'
import {firestore} from '@/firebase/firedb'
import {getDocs, collection, deleteDoc, doc, addDoc, updateDoc, query, where, onSnapshot, Timestamp, limit, startAfter, getDoc } from 'firebase/firestore'
//import { getDocFromResponse } from '@/utils/utils.fixdata';
import { Post } from '@/schemas/schema';

import useAuthStore from '@/modules/auth/store.auth'
import { fetchProfileByUserId } from '../profiles/data.profiles';
import { toggleLikePost } from './data.posts';
import { uploadOneImage } from '../files/data.files';

// reference to blogs_collection
const postsCollectionRef = collection(firestore, 'posts');

const usePostsStore = create((set, get) => ({
  posts: [], // [Post]
  singlePost: null, //Post
  lastDoc: null, // last post fetched

  // create post data
  /* newPost: new Post({}),

  setNewPost(data) {
    set(state => ({...state, newPost: {...state.newPost, ...data}}));
  },

  resetNewPost() {
    set(state => ({...state, newPost: new Post({})}));
  }, */

  //========================================
  
  // update posts on new post added
  // runs on any request: get, put, post, delete
  onPostsUpdate() {
    const unsub = onSnapshot(postsCollectionRef, (snapShot) => {

      // check if collection size has changed!!
      //snapShot.size > 0
      if (get().posts !== null) {
        //console.log('new post added!!');
  


        //const docs = snapShot.docs;
  
        // data[] array of docs
        /* const newPosts = docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })); */
        

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
        //console.log('before update with new doc!!-----')
        //console.log(data, '----', createdDoc)
        if (createdDoc[0]) {
          //console.log('update with new doc!!')

          // check to see new item already exist in state or not
          const doesExist = get().posts.some(p => p.id === createdDoc[0].id);
          if (doesExist) createdDoc = [];

          set(state => ({
            ...state,
            posts: [
              ...createdDoc, 
              ...state.posts],
          }));
        }
      }
    });

    return unsub;
  },

  // Get: /blogs
  async fetchInitPosts(page=1, lim=2) {
    
    //let unSub;

    //if (unSub) unSub(); 

    try {
      //const querySnapshot = await getDocs(query(collection(db, 'users'), limit(5)));
      const querySnapshot = await getDocs(query(postsCollectionRef, limit(lim)));          
      const docs = querySnapshot.docs;
      const newPosts = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // get user profile for each post
      async function fetchUsersProfileForEachPost(posts) {
        for (let i=0; i < posts.length; i++) {
          const post = posts[i];
          const profile = await fetchProfileByUserId(post.user);
          posts[i].profile = profile;
        }
        return posts;
      }

      const editedPosts = await fetchUsersProfileForEachPost(newPosts);

      set(state => ({
        ...state, 
        posts: [...editedPosts],
        // set the last doc fetched
        lastDoc: docs[docs.length - 1],
      }));

      //console.log(get().lastDoc)
      // set events for listening for new post
      //unSub = get().onPostsUpdate();

    } catch(error) {
      console.log(error);
    }
  },

  // get more posts
  async fetchMorePosts(page=1, lim=2) {
    const querySnapshot = await getDocs(query(
      postsCollectionRef, 
      limit(lim),
      startAfter(get().lastDoc)
      ));          
      const docs = querySnapshot.docs;
      const morePosts = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      set(state => ({
        ...state, 
        posts: [...state.posts, ...morePosts],
        // set the last doc fetched
        // if: docs empty =: lastDoc = undefined
        lastDoc: docs[docs.length - 1],
      }));
  },

  async fetchSinglePost(postId) {
    try { 
      const docRef = doc(postsCollectionRef, postId);
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
        postsCollectionRef, 
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
  async createPost(data, file) {
    data.user = useAuthStore.getState().authUser.uid;

    try {
      console.log('--dooo', {...data}, file)

      // upload file
      // post with image 
      if (file) {
        const downloadUrl = await uploadOneImage({
          file: file,
          path: 'images',
        })
        data.image = downloadUrl;

        console.log(downloadUrl, data);
        // create post
        const docRef = await addDoc(postsCollectionRef, {...data});
        console.log('post with image--created!!');
        return;
      }

      // create post without image
      const docRef = await addDoc(postsCollectionRef, {...data});
  
      console.log(docRef, docRef.id);
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

  async toggleLikePostAct({
    postId, 
    userId,
    callback, 
  }) {
    try {
      const updatedPostDoc = await toggleLikePost({
        postId: postId, userId: userId,
      });

      set(state => {
        const filtered = state.posts;
        let updatedIndex = 0;
        state.posts.forEach((post, inx) => {
          console.log(inx)
          if (post.id === updatedPostDoc.id) updatedIndex = inx;
        });
        filtered[updatedIndex].likes = updatedPostDoc.likes; 

        return {
          ...state,
          posts: filtered,
        }
      })

      callback();
    } catch(error) {
      console.log(error.message);
    }
  },

  /* getLikesCount() {
    return get().
  } */
}));

// subscribe
usePostsStore.subscribe((state) => console.log(state));

export default usePostsStore