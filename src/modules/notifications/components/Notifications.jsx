import React, { useState } from 'react'

import {Button, IconButton} from '@chakra-ui/react'
import { HiOutlineBell } from "react-icons/hi2";
import { HiBell } from "react-icons/hi2";

const Notifications = () => {

  const [hasNotification, setHasNotification] = useState(true);

  return (
    <div
    className='
    relative
    '
    >
      <IconButton
      //colorScheme={'red'}
      size={'lg'}
      isRound={true}
      >
        <HiBell 
        //color={hasNotification ? 'red' : 'grey'}
        size={28}
        />
      </IconButton>

 
      <span 
      class="
      absolute top-3 right-2 
      inline-flex items-center justify-center px-2 py-1 
      text-xs font-bold leading-none 
      text-red-100 transform translate-x-1/2 -translate-y-1/2 
      bg-red-600 rounded-full">
        99
      </span>
      
    </div>
  )
}

export default Notifications