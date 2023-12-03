import React, { useEffect, useState } from 'react'

import {useNavigate} from 'react-router-dom'
import useAuthStore from '@/modules/auth/store.auth'
// authuser
//import useAuthStore from '@/store/store.auth'
import useFormValidation from '@/modules/auth/hooks/useFormValidation'
// components
import {Link} from 'react-router-dom'
import InputText from '@/modules/auth/components/InputText'
import {Button} from '@chakra-ui/react'
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";

const toastLogin = () => toast('welcome to rostami social');

const PageLogin = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  // auth user
  const {authUser, loginAct} = useAuthStore();
  const navigate = useNavigate();
  const {errors, validateForm} = useFormValidation(user);
  const [loginLoading, setLoginLoading] = useState(false);

  function handLoginSubmit(event) {
    event.preventDefault();

    const isThereErrors = validateForm();

    if (isThereErrors) return;

    // login
    const callbackLogin = () => {
      setLoginLoading(false);
      setUser({
        email: '',
        password: '',
      }); 
      navigate('/');
      toastLogin();
    }

    setLoginLoading(true);
    loginAct(user, callbackLogin);
  }

  useEffect(() => {
    validateForm();
  }, [
    user.email,
    user.password,
  ]);

  return (
    <main
    className='
    flex items-center justify-center bg-slate-50 flex-1
    container mx-auto 
    '
    >
      <form 
      className={`
      flex
      flex-col gap-4 p-8 px-16 rounded-md
      text-center shadow-lg bg-white
       `}
      onSubmit={handLoginSubmit} 

      >
        <div
        className='
        flex flex-col items-center justify-center gap-4
        mb-4
        '
        >
          <h1
          className='
          text-gray-600 font-semibold text-xl
          '
          >
          Login
          </h1>

          <div
          className='
          flex items-center gap-2
          '
          >
            <span
            className='
            text-sm font-medium text-gray-600
            '
            >
              don't have an account
            </span>
            <Link 
            className='text-blue-500'
            to='/register'>
              Register
            </Link>
          </div>
        </div>

        <InputText
        name='email'
        value={user.email}
        type='email'
        onChange={(event) => setUser((c) => ({...c, email: event.target.value}))}
        errors={errors.email ? [errors.email] : []}
        />

        <InputText
        name='password'
        value={user.password}
        type='password'
        onChange={(event) => setUser((c) => ({...c, password: event.target.value}))}
        errors={errors.password ? [errors.password] : []}
        />

        <Button
        
        type='submit'
        variant='outline'
        colorScheme='blue'
        isLoading={loginLoading}
        textLoading={'going in'}
        >
          <span
          className='
          flex justify-between items-center w-full
          '
          >
            <span>Login</span>
            <HiOutlineArrowLeftOnRectangle size={24}/>
          </span>
        </Button>
      </form>
    </main>
  )
}

export default PageLogin