import {create} from 'zustand'
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth'

const useAuthStore = create((set, get) => ({
  authUser: null,

  setAuth: (newUser) => set((state) => ({...state, authUser: newUser})),

  async registerAct(data) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // returns the signed up user
        const currentUser = userCredential.user;
        console.log(currentUser);
        
      })
      .catch((error) => {
        console.log(
          error.code,
          error.message
        )
      }) 
  },
}));

// subscribe
useAuthStore.subscribe((state) => console.log(state));

export default useAuthStore