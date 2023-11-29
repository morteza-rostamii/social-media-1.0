import React from 'react'

import {FormControl, Input, FormLabel, FormHelperText} from '@chakra-ui/react'
import { HiOutlineExclamationCircle } from "react-icons/hi";

const InputText = ({
  name='input-name',
  type='text',
  msg='sub message is a great one',
  value,
  onChange,
  errors= [],
}) => {

  console.log(errors)
  return (
    <FormControl>
      <FormLabel
      className='
      text-gray-400
      '
      >{name}</FormLabel>
      <Input 
      size='lg'
      type={type} 
      value={value}
      onChange={onChange}
      />
      <div
      id='input-text-errors'      
      className='
      flex flex-col gap-2
      '
      >

      </div>
      {
        errors.length
        ?(
          errors.map((err, i) => (
            <FormHelperText
            key={i}
            className='
            flex gap-2 items-center
            text-left 
            '
            color='blue.500'
            >
              <HiOutlineExclamationCircle
              size={16}
              />
              {err}
            </FormHelperText>
          ))
        ):''
      }
    </FormControl>
  )
}

export default InputText