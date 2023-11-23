import React, { useEffect, useState } from 'react'
import {auth, googleProvider} from '@/firebase/firedb'
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth'

// components
import {Button} from '@mantine/core'
import { Input } from '@mantine/core';
import {Link, useNavigate} from 'react-router-dom'
import {FaGoogle} from 'react-icons/fa'

const PageRegister = () => {
  const [currentAuth] = useState(auth);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // register with email and password
  async function register() {

    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // returns the signed up user
        const currentUser = userCredential.user;
        console.log(currentUser);
        setUser({
          username: '', 
          email: '',
          password: '',
        });
        navigate('/login')
      })
      .catch((error) => {
        console.log(
          error.code,
          error.message
        )
      }) 
    
    // this also can get the current logged in user
    // /console.log(auth?.currentUser)
  } 

  // google auth
  function handGoogleAuth() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log('signed in with google!')
        console.log(result);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      })
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
      onSubmit={(event) => {
        event.preventDefault();

        // signup
        console.log(user)
        register();
      }} 

      >
        <h1>
        Register Form
        </h1>
        {/* <Input 

        placeholder="username" 
        value={user.username}
        onChange={(event) => setUser((c) => ({...c, username: event.target.value}))}
        /> */}
        <Input 

        placeholder="email" 
        value={user.email}
        onChange={(event) => setUser((c) => ({...c, email: event.target.value}))}
        />
        <Input 
        placeholder="password" 
        type='password'
        value={user.password}
        onChange={(event) => setUser((c) => ({...c, password: event.target.value}))}
        />

        <Button
        type='submit'
        >
          register
        </Button>
        <Link to='/login'>go to login</Link>

        <Button
        variant='outline'
        color='red'
        
        onClick={handGoogleAuth}
        >
          <span
          className='
          flex gap-3
          '
          >
          <FaGoogle/>
          <span>google</span>
          </span>
        </Button>
      </form>
    </div>
  )
}

export default PageRegister