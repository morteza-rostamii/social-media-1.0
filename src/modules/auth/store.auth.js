import {create} from 'zustand'
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth, googleProvider} from '@/firebase/firedb'
import Cookies from 'universal-cookie'

import useProfilesStore from '../profiles/store.profile'
import { Profile } from '@/schemas/schema'
import { uploadOneImage } from '../files/data.files'

const cookies = new Cookies();

/* function getUserProfile() {
  const userJson = localStorage.getItem('auth-profile');
  console.log(!userJson)
  if (!userJson || userJson === 'undefined') return {}; 
  console.log('what the fuck!!')
  return JSON.parse(userJson);
} */

const useAuthStore = create((set, get) => ({
  authUser: null,
  authProfile: null,

  setAuth: (newUser) => set((state) => ({...state, authUser: newUser})),
  setAuthProfile: (profile) => set(state => ({...state, authProfile: profile})),

  // /register
  registerAct({
    data, 
    file,
    callBack,
  }) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // returns the signed up user
        const currentUser = userCredential.user;
        console.log(currentUser.uid);

        // send email verification
        //currentUser.sendEmailVerification();
        //auth.signOut();

        return {data, currentUser, file};
      })
      .then(({
        data, currentUser, file
      }) => {
        // upload image
        uploadOneImage({file: file, path: 'images'})
          .then((downloadUrl) => {
            console.log(downloadUrl);
            // create profile
            const profile = new Profile({
              user: currentUser.uid,
              avatar: downloadUrl,
              username: data.username,
            });
            // create profile
            useProfilesStore.getState().createProfile({...profile});

            // after register
            callBack();
          })

      })
      .catch((error) => {
        console.log(
          error.code,
          error.message
        )
      }) 
  },

  // /login
  loginAct(data, callback) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        console.log(currentUser);

        // store token in cookie
        cookies.set('auth-token', currentUser.refreshToken);

        callback();
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