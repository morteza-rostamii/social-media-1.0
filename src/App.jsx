import { useEffect, useState } from 'react'
import {Routes, Route, Link, Navigate} from 'react-router-dom'

import LayMain from './views/layouts/LayMain'
import PageHome from './views/pages/PageHome'
import PageRegister from './views/pages/PageRegister'
import PageLogin from './views/pages/PageLogin'
//import PageBlog from './views/pages/PageBlog'

import useAuthStore from '@/modules/auth/store.auth'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '@/firebase/firedb'
import usePostsStore from './modules/posts/store.post'
import PageSinglePost from './views/pages/PageSinglePost'
import PageSearch from './views/pages/PageSearch'
import { fetchProfileByUserId } from './modules/profiles/data.profiles'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const {authUser, setAuth, setAuthProfile} = useAuthStore();
  const {onPostsUpdate} = usePostsStore();

  useEffect(() => {

    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          //console.log('we have a logged in user!!!');
          //console.log(user);
          setAuth(user);
          
          // store authUser profile in localStorage
          if (user.uid) {
            console.log(user.uid)
            const profile = await fetchProfileByUserId(user.uid);
            if (profile) {
              console.log('get profile')
              localStorage.setItem('auth-profile', JSON.stringify(profile));
              setAuthProfile(profile);
            }
          }
        } 
        else {
          console.log('no logged in user!!');
          setAuth(undefined);
  
          // remove authUser profile from local storage
          localStorage.removeItem('auth-profile');
        }
      })
      
    } catch(error) {
      console.log(error.message);
    }

    // event: on posts[] update run this:
    const unsubOnPostsUpdate = onPostsUpdate();

    // clean up
    return () => unsubOnPostsUpdate();
  }, []);

  return (
    <>
      <Routes>
        <Route
        element={<LayMain/>}
        >
          {/* /home */}
          <Route
          path={'/'}
          element={(() => {
            if (authUser === null) return <>loading..</>
            else if (authUser) return <PageHome/>
            else return <Navigate to='/register'></Navigate>
          })()}
          >
          </Route>          

          {/* /register */}
          <Route
          path={'/register'}
          element={(() => {
            if (authUser === null) return <></>;
            else if (authUser) return <>auth not allowed!</>
            else return <PageRegister/>
          })()}
          >
          </Route>

          {/* /login */}
          <Route
          path={'/login'}
          element={(() => {
            if (authUser === null) return <></>;
            else if (authUser) return <>auth not allowed!</>
            else return <PageLogin/>
          })()}
          >
          </Route>

          {/* /posts/:id */}
          <Route
          path='/posts/:id'
          element={<PageSinglePost/>}
          >
          </Route>

          {/* /search/:term */}
          <Route
          path='/search'
          element={<PageSearch/>}
          >
          </Route>
          
        </Route>
      </Routes>

      {/* register toaster */}
      <Toaster/>
    </>
  )
}

export default App
