import {create} from 'zustand'
import {firestore} from '@/firebase/firedb'
import {getDocs, collection, deleteDoc, doc, addDoc, updateDoc, query, where, onSnapshot} from 'firebase/firestore'
import { getDocFromResponse } from '@/utils/utils.fixdata';

// reference to blogs_collection
const usersCollectionRef = collection(firestore, 'blogs');

const useUsersStore = create((set, get) => ({
  users: [],
  
  // Get: /users/:username
  async searchUsers() {
    
    try {
      const data = await getDocs(usersCollectionRef);          

      const docs = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return set(state => ({...state, blogs: docs}));
    } catch(error) {
      console.log(error);
    }
  },
  
  // Post: /blogs
  async createUser({
    username= '',
    age= 0,
    img= '',
    status= false, // online/offline
    lastOnline= new Date().now(),
    createdAt= new Date().now(),
    updatedAt= new Date().now(),

    posts= [], // [Post:id]
    subscriptions= []// [User:id],
    }) {
    addDoc(usersCollectionRef, {title, body})
      .then(async (ref) => {
        
        console.log('success createing blog!! ', ref.id);

        // update state
        const newDoc = await getDocFromResponse(firestore, 'blogs', ref.id);
        console.log(newDoc);
        set(state => ({...state, blogs: [...state.blogs, newDoc]}));
      })
      .catch((error) => {
        console.log(error.message);
      })
  },

  // Put: /blogs/:id
  async editUser(id, data) {
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

    updateDoc(blogDoc, data)
      .then(async () => {
        //const updatedBlogDoc = await getDocFromResponse(firestore, 'blogs', id);
        

        // after update unsubscribe
        unsub();
      })
      .catch((error) => {
        console.log(error.message);
      })
    
  },

  async deleteUser(id) {

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
useUsersStore.subscribe((state) => console.log(state));

export default useUsersStore