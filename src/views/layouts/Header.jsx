import React from 'react'

import useAuthStore from '@/modules/auth/store.auth'
import {signOut} from 'firebase/auth'
import {auth} from '@/firebase/firedb'
import {useNavigate} from 'react-router-dom'

// components
import {Link} from 'react-router-dom'
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react'

import { BiLogoReddit } from "react-icons/bi";
import MenuDropProfile from '@/modules/auth/components/MenuDropProfile'
//import Notifications from '@/modules/notifications/components/Notifications'
//import Search from './Search'
//import { HiOutlineSearch } from "react-icons/hi";

const Header = () => {
  const {authUser, authProfile} = useAuthStore();
  return (
    <header
    className='
    flex items-center justify-between
    container mx-auto
    p-3 #bg-slate-50 #border-b shadow-md
    mb-8
    '
    >
      <div
      className='
      flex gap-3 items-center
      '
      >
        <div
        className='
        flex items-center gap-3
        '
        >
          <Button
          variant='outline'
          colorScheme='cyan'
          isRound={true}
          as={Link}
          to={'/'}
          >
            {/* <BiLogoReddit size={40}/> */}
            Rostami Social
          </Button>
          {/* <span>rostami-social</span> */}
        </div>

        {/* search */}
        {/* <IconButton
        isRound={true}
        as={Link}
        to='/search'
        >
          <HiOutlineSearch />
        </IconButton> */}
      </div>

      <nav
      className='
      flex gap-3 items-center
      '
      >
        {(() => {
          if (authUser === null) return <></>
          else if (authUser) return (
            <nav
            className='
            flex gap-3 items-center
            '
            >
              <MenuDropProfile/>
            </nav>
          )
          else return <></>
        })()}
      </nav>  
    </header>
  )
}

export default Header