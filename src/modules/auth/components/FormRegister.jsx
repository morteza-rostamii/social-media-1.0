import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FaGoogle} from 'react-icons/fa'
import { Button, ButtonGroup, Input } from '@chakra-ui/react'
import InputText from '@/modules/auth/components/InputText';
import { HiChevronRight } from "react-icons/hi";

const FormRegister = ({
  show,
  username,
  email,
  password,
  setUser,
  handGoNext,
  errors,
}) => {

  //console.log(errors)
  return (
    <form 
    className={`
    ${show ? 'flex' : 'hidden'}
    flex-col gap-4 p-8 px-16 rounded-md
    bg-white text-center shadow-lg
    `}
    onSubmit={(event) => {
      event.preventDefault();

      // signup
      console.log(user)
      register();
    }} 

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
        Create an account
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
          >Already have an account</span>
          <Link 
          className='text-blue-500'
          to='/login'>
            Login
          </Link>
        </div>
      </div>

      <InputText
      name='username'
      value={username}
      onChange={(event) => setUser((c) => ({...c, username: event.target.value}))}
      errors={errors.username ? [errors.username] : []}
      />

      <InputText
      name='email'
      value={email}
      type='email'
      onChange={(event) => setUser((c) => ({...c, email: event.target.value}))}
      errors={errors.email ? [errors.email] : []}
      />

      <InputText
      name='password'
      value={password}
      type='password'
      onChange={(event) => setUser((c) => ({...c, password: event.target.value}))}
      errors={errors.password ? [errors.password] : []}
      />

      <Button
      
      //type='submit'
      variant='outline'
      colorScheme='blue'
      onClick={handGoNext}
      >
        <span
        className='
        flex justify-between items-center w-full
        '
        >
          <span>Next</span>
          <HiChevronRight size={24}/>
        </span>
      </Button>
      

      {/* <Button
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
      </Button> */}
    </form>
  )
}

export default FormRegister