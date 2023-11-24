import {create} from 'zustand'
import {firestore} from '@/firebase/firedb'
import {getDocs, collection, deleteDoc, doc, addDoc, updateDoc, query, where, onSnapshot} from 'firebase/firestore'
import { getDocFromResponse } from '@/utils/utils.fixdata';

// reference to blogs_collection
const blogsCollectionRef = collection(firestore, 'blogs');

const useBlogStore = create((set, get) => ({
  blogs: [],

  async testStuff() {
    /* firestore.collection('blogs').get()
      .then((res) => {
        console.log(res)
      })
      .catch(error => {
        console.log(error.message)
      }) */
  },
  
  // Get: /blogs
  async fetchBlogs() {
    
    try {
      const data = await getDocs(blogsCollectionRef);          

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
        blogsCollectionRef, 
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
  async createBlog({title, body}) {
    addDoc(blogsCollectionRef, {title, body})
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
useBlogStore.subscribe((state) => console.log(state));

export default useBlogStore