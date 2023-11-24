import React, { useState } from 'react'
//import PropTypes from 'prop-types'

// components
//import Expense from '@/views/components/Expense'
import {Link} from 'react-router-dom'
//import ChatApp from '@/practices/ChatApp';
import {Button} from '@chakra-ui/react'

import ModalCreatePost from '@/modules/posts/components/ModalCreatePost';
import CardPost_a from '@/modules/posts/components/CardPost_a';
import FeedPosts from '@/modules/posts/components/FeedPosts';

const PageHome = props => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div
    id='page-home'
    className='
    flex flex-col gap-8 items-center justify-center #h-full
    container mx-auto p-4
    bg-slate-100
    '
    >
      {/* create post */}
      <div>
        <ModalCreatePost test='for test'/>
      </div>

      {/* infinit posts scroll */}
      <FeedPosts/>
    </div>
  )
}

//PageHome.propTypes = {}

export default PageHome