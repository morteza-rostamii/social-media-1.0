import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FaGoogle} from 'react-icons/fa'
import { Button, ButtonGroup, Input } from '@chakra-ui/react'
import InputText from '@/modules/auth/components/InputText';
import { HiChevronLeft } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import FilePicker from './FilePicker';

const FormAvatarUpload = ({
  show,
  user,
  setUser,
  handGoBack,
  registerUser,
  errors,
  registerLoading,
}) => {

  // register user / uploadfile and create profile:
  function handRegisterSubmit(event) {
    event.preventDefault();
    registerUser();
  }

  return (
    <form 
    className={`
    ${show ? 'flex' : 'hidden'}
    flex-col gap-4 p-8 px-16 rounded-md
    bg-white text-center shadow-lg
    `}
    onSubmit={handRegisterSubmit}
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
        Upload your avatar
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

      <FilePicker
      avatar={user.avatar}
      setUser={setUser}
      />
      
      {/* actions */}
      <div
      className='
      flex justify-between w-ful gap-8
      '
      >
        <Button
        variant='outline'
        colorScheme='blue'
        onClick={handGoBack}
        >
          <span
          className='
          flex justify-between items-center w-full gap-4
          '
          >
            <HiChevronLeft size={24}/>
            <span>Back</span>
          </span>
        </Button>

        <Button
        type='submit'
        variant='outline'
        colorScheme='blue'

        isLoading={registerLoading}
        loadingText='registering'
        >
          <span
          className='
          flex justify-between items-center w-full gap-4
          '
          >
            <span>Register</span>
            <HiArrowLeftOnRectangle  size={24}/>
          </span>
        </Button>
      </div>
    </form>
  )
}

export default FormAvatarUpload