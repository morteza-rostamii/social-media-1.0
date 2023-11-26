import {create} from 'zustand'
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth, googleProvider} from '@/firebase/firedb'
import Cookies from 'universal-cookie'

import useProfilesStore from '../profiles/store.profile'
import { Profile } from '@/schemas/schema'

const cookies = new Cookies();

const useAuthStore = create((set, get) => ({
  authUser: null,

  setAuth: (newUser) => set((state) => ({...state, authUser: newUser})),

  // /register
  async registerAct(data) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // returns the signed up user
        const currentUser = userCredential.user;
        console.log(currentUser.uid);
        
        const profile = new Profile({user: currentUser.uid});
        // create profile
        useProfilesStore.getState().createProfile({...profile});

      })
      .catch((error) => {
        console.log(
          error.code,
          error.message
        )
      }) 
  },

  // /login
  async loginAct(data, navigate, setUser) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        console.log(currentUser);
        setUser({
          email: '',
          password: '',
        }); 

        // store token in cookie
        cookies.set('auth-token', currentUser.refreshToken);

        navigate('/')
      })
      .catch((error) => {
        console.log(`${error.code} ${error.message}`);
      });
  },

  // login with google
  loginWithGoogleAct(navigate) {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log('signed in with google!')
        //console.log(result);
        //console.log(result.user.refreshToken)
        cookies.set('auth-token', user.refreshToken);

        const profile = new Profile({user: user.uid});
        // create profile
        // firebase only accepts object literal
        useProfilesStore.getState().createProfile({...profile});

        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      })
  }
}));

// subscribe
useAuthStore.subscribe((state) => console.log(state));

export default useAuthStore