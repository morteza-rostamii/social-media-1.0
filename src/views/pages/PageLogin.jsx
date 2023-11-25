import React, { useState } from 'react'

import {useNavigate} from 'react-router-dom'
import useAuthStore from '@/modules/auth/store.auth'
// authuser
//import useAuthStore from '@/store/store.auth'

// components
import {Link} from 'react-router-dom'

const PageLogin = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  // auth user
  const {authUser, loginAct} = useAuthStore();

  const navigate = useNavigate();


  function handSubmit(event) {
    event.preventDefault();

    // login
    console.log('lets login : ', user);
    loginAct(user, navigate, setUser);
    
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
        <input 

        placeholder="email" 
        value={user.email}
        onChange={(e) => setUser(c => ({...c, email: e.target.value}))}
        />
        <input 
        placeholder="password" 
        type='password'
        value={user.password}
        onChange={(e) => setUser(c => ({...c, password: e.target.value}))}
        />

        <button
        type='submit'
        >
          login
        </button>
        <Link to='/register'>go to register</Link>
      </form>
    </div>
  )
}

export default PageLogin