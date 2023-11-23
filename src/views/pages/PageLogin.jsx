import React, { useState } from 'react'
import {auth} from '@/firebase/firedb'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

// authuser
//import useAuthStore from '@/store/store.auth'

// components
import {Button} from '@mantine/core'
import { Input } from '@mantine/core';
import {Link} from 'react-router-dom'

const PageLogin = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  // auth user
  //const {authUser, setAuth} = useAuthStore();

  const navigate = useNavigate();

  // firebase login
  function login() {

    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        console.log(currentUser);
        setUser({
          email: '',
          password: '',
        });
        // set authUser in state
        //setAuth(currentUser);

        navigate('/')
      })
      .catch((error) => {
        console.log(`${error.code} ${error.message}`);
      });
  }

  function handSubmit(event) {
    event.preventDefault();

    // login
    console.log('lets login : ', user);
    login();
  }

  return (
    <div
    className='
    flex items-center justify-center
    flex-1
    '
    >
      <form 
      className='
      flex flex-col gap-8 p-4 rounded-md
      bg-blue-100 text-center
      '

      onSubmit={(event) => handSubmit(event)}
      >
        <h1>
        Login Form
        </h1>
        <Input 

        placeholder="email" 
        value={user.email}
        onChange={(e) => setUser(c => ({...c, email: e.target.value}))}
        />
        <Input 
        placeholder="password" 
        type='password'
        value={user.password}
        onChange={(e) => setUser(c => ({...c, password: e.target.value}))}
        />

        <Button
        type='submit'
        >
          login
        </Button>
        <Link to='/register'>go to register</Link>
      </form>
    </div>
  )
}

export default PageLogin