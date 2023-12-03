import React from 'react'

import useAuthStore from '@/modules/auth/store.auth'

// components
import {Link} from 'react-router-dom'
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react'

import { BiLogoReddit } from "react-icons/bi";
import MenuDropProfile from '@/modules/auth/components/MenuDropProfile'
//import Notifications from '@/modules/notifications/components/Notifications'
//import Search from './Search'
//import { HiOutlineSearch } from "react-icons/hi";
import {auth} from '@/firebase/firedb'
import {useNavigate} from 'react-router-dom'
import { PiAppleLogo } from "react-icons/pi";

import Logo from '@/assets/Logo.svg'

const Header = () => {
  const {authUser, authProfile} = useAuthStore();
  return (
    <header
    className='
    flex items-center justify-between
    container mx-auto
    p-3 #bg-slate-50 #border-b shadow-md
    #mb-8
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
          <Link
          //variant='outline'
          //colorScheme='blue'
          //isRound={true}
          //as={Link}
          to={'/'}
          >
            {/* <BiLogoReddit size={40}/> */}
            <img 
            className='
            w-32
            '
            src={Logo} alt="--=" />
          </Link>
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