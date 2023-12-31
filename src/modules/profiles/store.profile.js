import {create} from 'zustand'
import {firestore} from '@/firebase/firedb'
import {getDocs, collection, deleteDoc, doc, addDoc, updateDoc, query, where, onSnapshot, getDoc} from 'firebase/firestore'
//import { getDocFromResponse } from '@/utils/utils.fixdata';

// reference to blogs_collection
const profilesCollectionRef = collection(firestore, 'profiles');

const useProfilesStore = create((set, get) => ({
  users: [],
  
  // empty state:
  emptyProfilesStore () {
    set({});
  },

  // Get: /users/:username
  async searchUsers() {
    
    try {
      const data = await getDocs(profilesCollectionRef);          

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
  async createProfile(data) {
    
    let newProfile = null;

    try {
      const newProfileRef = await addDoc(profilesCollectionRef, data)
        
      console.log('success createing profile!! ', newProfileRef.id);
  
      // update state
      //const newDoc = await getDocFromResponse(firestore, 'blogs', ref.id);
      const profileDocRef = doc(firestore, 'profiles', newProfileRef.id);
      const profileSnapShot = await getDoc(profileDocRef);
      if (profileSnapShot.exists()) {
        const profileDoc = {id: profileSnapShot.id, ...profileSnapShot.data()};
        newProfile = profileDoc;
      }

    } catch(error) {
      console.log(error.message);
    }

    return newProfile;
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
useProfilesStore.subscribe((state) => console.log(state));

export default useProfilesStore