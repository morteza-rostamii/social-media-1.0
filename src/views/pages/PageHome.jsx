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
    <main
    id='page-home'
    className='
    grid place-items-center
    container mx-auto bg-slate-50
    '
    >
      <div
      id='page-home-wrap'
      className='
      flex flex-col gap-8 items-center justify-center p-8 max-w-lg #bg-green-50
      '
      >
        {/* create post */}
        
        <ModalCreatePost />

        {/* infinit posts scroll */}
        <FeedPosts/>
      </div>
    </main>
  )
}

//PageHome.propTypes = {}

export default PageHome