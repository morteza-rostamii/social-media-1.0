import React, { useEffect, useState } from 'react'

// components

import useAuthStore from '@/modules/auth/store.auth';
import {Link, useNavigate} from 'react-router-dom'
import FormRegister from '@/modules/auth/components/FormRegister';
import FormAvatarUpload from '@/modules/auth/components/FormAvatarUpload';
import useFormValidation from '@/modules/auth/hooks/useFormValidation';
import toast, { Toaster } from 'react-hot-toast';

const toastRegister = () => toast('we sent you en email');

const PageRegister = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    avatar: null,
  });
  const [registerLoading, setRegisterLoading] = useState(false);

  const {errors, validateForm} = useFormValidation(user);

  // form's steps:
  const [step, setStep] = useState(0);
  /* const [forms, setForms] = useState([
    <FormRegister 
    username={user.username}
    email={user.email}
    password={user.password}
    setUser={setUser}
    handGoNext={handGoNext}
    />,
    <FormAvatarUpload
    avatar={user.avatar}
    setUser={setUser}
    handGoBack={handGoBack}
    />
  ]); */

  const {registerAct, loginWithGoogleAct} = useAuthStore();

  const navigate = useNavigate();

  // register with email and password
  function registerUser() {

    // sets error state
    const isThereErrors = validateForm();

    window.alert(errors.avatar);
    if (errors.username || errors.email || errors.password) {
      alert('complete the form!');
    }
    
    // if: no errors =: returns true.
    if (!isThereErrors) return;

    const callBackAfterRegister = () => {
      console.log('register callback............')
      setUser({
        username: '', 
        email: '',
        password: '',
      });
      navigate('/')

      setRegisterLoading(false);
      toastRegister();
    }

    // set loading
    setRegisterLoading(true);

    registerAct({
      data: user,
      file: user.avatar,
      callBack: callBackAfterRegister,
    });
  }

  function handGoNext() {
    if (step < 1) setStep(c => ++c);
  }

  function handGoBack() {
    console.log('back', step)
    if (step > 0) setStep(c => --c);
  }

  useEffect(() => {
    validateForm();
  }, [
    user.username,
    user.email,
    user.password,
  ]);

  // set errors state on image selected: to update avatar errors
  useEffect(() => {
    validateForm();
  }, [user.avatar]);

  /* 
  # components that are passed into useState([]) are not going to run again when value of some state changes!! only children inside of return() run again!! so if step changes we wet them again to have the new value of step!! basically! if we don't do this, <FormRegister/> it's going to have old values of <PageRegister/> state.
  */
  /* useEffect(() => {
    setForms([
      <FormRegister 
      username={user.username}
      email={user.email}
      password={user.password}
      setUser={setUser}
      handGoNext={handGoNext}
      />,
      <FormAvatarUpload
      avatar={user.avatar}
      setUser={setUser}
      handGoBack={handGoBack}
      />
    ]);
  }, [step]) */

  return (
    <div
    className='
    flex items-center justify-center
    flex-1
    '
    >
      <div
      id='page-register-wrap'
      >
        {/* {forms[step]} */}
        
        <FormRegister 
        show={step === 0}
        username={user.username}
        email={user.email}
        password={user.password}
        setUser={setUser}
        handGoNext={handGoNext}
        errors={errors}
        />
        <FormAvatarUpload
        show={step === 1}
        user={user}
        setUser={setUser}
        handGoBack={handGoBack}
        registerUser={registerUser}
        errors={errors}
        registerLoading={registerLoading}
        />
      </div>
    </div>
  )
}

export default PageRegister