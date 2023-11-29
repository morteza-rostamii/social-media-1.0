import { useState } from 'react';

const useFormValidation = (user) => {
  const [errors, setErrors] = useState({});

  const validateUsername = (username) => {
    if (!username) {
      setErrors(c => ({
        ...c,
        username: 'Username is required',
      }));
      return false;
    }

    if (username.length < 5) {
      setErrors(c => ({
        ...c,
        username: 'at least 5 characters long',
      }));
      return false;
    }

    // if: no errors =: clear the state
    setErrors(c => ({
      ...c, 
      username: ''
    }));
    return true;
  };

  const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
      setErrors(c => ({
        ...c, 
        email: 'Invalid email address',
      }));
      return false;
    }

    setErrors(c => ({
      ...c, 
      email: ''
    }));
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setErrors(c => ({
        ...c, 
        password: 'Password is required',
      }));
      return false;
    }

    if (password.length < 8) {
      setErrors(c => ({
        ...c,
        password: 'at least 8 characters long',
      }));
      return false;
    }

    setErrors(c => ({
      ...c, 
      password: ''
    }));
    return true;
  };

  const validateAvatar = (avatar) => {
    if (!avatar) {
      setErrors(c => ({
        ...c,
        avatar: 'Avatar is required',
      }));
      return false;
    }

    const allowedFileTypes = ['image/jpeg', 'image/png'];
    if (!allowedFileTypes.includes(avatar.type)) {
      setErrors(c => ({
        ...c,
        avatar: 'Only JPEG and PNG images are allowed',
      }));
      return false;
    }

    if (avatar.size > 2097152) { // 2MB
      setErrors(c => ({
        ...c,
        avatar: 'File size, maximum limit of 2MB',
      }));
      return false;
    }

    setErrors(c => ({
      ...c, 
      avatar: ''
    }));
    return true;
  };

  const validateForm = () => {
    const isValidUsername = validateUsername(user.username);
    const isValidEmail = validateEmail(user.email);
    const isValidPassword = validatePassword(user.password);
    const isValidAvatar = validateAvatar(user.avatar);

    return isValidUsername && isValidEmail && isValidPassword && isValidAvatar;
  };

  return { validateForm, errors };
};

export default useFormValidation;
