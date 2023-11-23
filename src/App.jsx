import { useEffect, useState } from 'react'
import Morteza from '@/views/components/Morteza'
import {Button} from '@mantine/core'
import {Routes, Route, Link} from 'react-router-dom'
import LayMain from './views/layouts/LayMain'
import PageHome from './views/pages/PageHome'
import PageRegister from './views/pages/PageRegister'
import PageLogin from './views/pages/PageLogin'
//import PageBlog from './views/pages/PageBlog'

import useAuthStore from '@/store/store.auth'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '@/firebase/firedb'

function App() {
  const {authUser, setAuth} = useAuthStore();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('we have a logged in user!!!');
        //console.log(user);
        setAuth(user);
      } 
      else {
        console.log('no logged in user!!');
        setAuth(undefined);
      }
    })
  }, []);

  return (
    <>
      <Routes>
        <Route
        element={<LayMain/>}
        >
          <Route
          path={'/'}
          element={(() => {
            if (authUser === null) return <>loading..</>
            else if (authUser) return <PageHome/>
            else return <PageRegister/>
          })()}
          >
          </Route>          

          <Route
          path={'/register'}
          element={(() => {
            if (authUser === null) return <></>;
            else if (authUser) return <>auth not allowed!</>
            else return <PageRegister/>
          })()}
          >
          </Route>

          <Route
          path={'/login'}
          element={(() => {
            if (authUser === null) return <></>;
            else if (authUser) return <>auth not allowed!</>
            else return <PageLogin/>
          })()}
          >
          </Route>

          
        </Route>
      </Routes>
    </>
  )
}

export default App
