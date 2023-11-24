import {create} from 'zustand'
import {firestore} from '@/firebase/firedb'
import {getDocs, collection, deleteDoc, doc, addDoc, updateDoc, query, where, onSnapshot, Timestamp} from 'firebase/firestore'
//import { getDocFromResponse } from '@/utils/utils.fixdata';
import { Post } from '@/schemas/schema';

import useAuthStore from '@/modules/auth/store.auth'

// reference to blogs_collection
const postsCollectionRef = collection(firestore, 'posts');

const usePostsStore = create((set, get) => ({
  posts: [],

  // create post data
  newPost: new Post({}),

  setNewPost(data) {
    set(state => ({...state, newPost: {...state.newPost, ...data}}));
  },

  resetNewPost() {
    set(state => ({...state, newPost: new Post({})}));
  },

  //========================================
  
  // Get: /blogs
  async fetchBlogs() {
    
    try {
      const data = await getDocs(postsCollectionRef);          

      const docs = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return set(state => ({...state, blogs: docs}));
    } catch(error) {
      console.log(error);
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
  async createPost(data) {
    data.user = useAuthStore.getState().authUser.uid;

    try {
      const docRef = await addDoc(postsCollectionRef, data);
  
      console.log(docRef, docRef.id);

    } catch(error) {
      console.log(error);
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
usePostsStore.subscribe((state) => console.log(state));

export default usePostsStore