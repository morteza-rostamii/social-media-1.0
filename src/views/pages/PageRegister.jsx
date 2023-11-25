import React, { useEffect, useState } from 'react'

// components
import {Link, useNavigate} from 'react-router-dom'
import {FaGoogle} from 'react-icons/fa'
import useAuthStore from '@/modules/auth/store.auth';
import { Button, ButtonGroup } from '@chakra-ui/react'

const PageRegister = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const {registerAct, loginWithGoogleAct} = useAuthStore();

  const navigate = useNavigate();

  // register with email and password
  async function register() {

    registerAct(user)
    setUser({
      username: '', 
      email: '',
      password: '',
    });
    navigate('/login')
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
      bg-slate-100 text-center
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
        {/* <input 

        placeholder="username" 
        value={user.username}
        onChange={(event) => setUser((c) => ({...c, username: event.target.value}))}
        /> */}
        <input 

        placeholder="email" 
        value={user.email}
        onChange={(event) => setUser((c) => ({...c, email: event.target.value}))}
        />
        <input 
        placeholder="password" 
        type='password'
        value={user.password}
        onChange={(event) => setUser((c) => ({...c, password: event.target.value}))}
        />

        <button
        type='submit'
        >
          register
        </button>
        <Link to='/login'>go to login</Link>

        <Button
        variant='outline'
        colorScheme='cyan'
        
        onClick={() => loginWithGoogleAct(navigate)}
        >
          <span
          className='
          flex gap-3 items-center
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