import React, { useState } from 'react'
//import PropTypes from 'prop-types'

// components
//import Expense from '@/views/components/Expense'
import {Link} from 'react-router-dom'
//import ChatApp from '@/practices/ChatApp';
import {Button} from '@chakra-ui/react'

import ModalCreatePost from '@/modules/posts/components/ModalCreatePost';

const PageHome = props => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div
    id='page-home'
    className='
    grid place-items-center h-full
    container mx-auto
    bg-slate-100
    '
    >
      {/* create post */}
      <div>
        <ModalCreatePost test='for test'/>
      </div>

      {/* infinit posts scroll */}
      <div>
        
      </div>
    </div>
  )
}

//PageHome.propTypes = {}

export default PageHome