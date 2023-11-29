import React from 'react'

import useAuthStore from '@/modules/auth/store.auth'
import {signOut} from 'firebase/auth'
import {auth} from '@/firebase/firedb'
import {useNavigate} from 'react-router-dom'

// components
import {Link} from 'react-router-dom'
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { FaArrowRightToBracket } from "react-icons/fa6";
import { BiLogoReddit } from "react-icons/bi";
import Notifications from '@/modules/notifications/components/Notifications'
import Search from './Search'
import { HiOutlineSearch } from "react-icons/hi";

const Header = () => {
  const {authUser} = useAuthStore();
  const navigate = useNavigate();

  function handLogout() {
    signOut(auth)
      .then(() => {
        navigate('/');
        console.log('user has logged out!!');
      })
      .catch((error) => {
        console.log('error during logout: ', error.message)
      })
  }

  function getUserProfile() {
    const userJson = localStorage.getItem('auth-profile');
    if (!userJson) return {}; 
    return JSON.parse(userJson);
  }

  // show logout button logic
  let logoutBtn = null;
  if (authUser === null) logoutBtn = <>loading!!</>;
  else if (authUser) logoutBtn = (
    <Button
    variant='outline'
    colorScheme='cyan'
    onClick={handLogout}
    >
      <FaArrowRightToBracket/>
    </Button>
  )
  else logoutBtn = <></>;

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
          <IconButton
          variant='outline'
          colorScheme='cyan'
          isRound={true}
          as={Link}
          to={'/'}
          >
            <BiLogoReddit size={40}/>
            
          </IconButton>
          {/* <span>rostami-social</span> */}
        </div>

        {/* search */}
        <IconButton
        isRound={true}
        as={Link}
        to='/search'
        >
          <HiOutlineSearch />
        </IconButton>
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

              {/* <Notifications
              /> */}

              <Avatar
              className='
              cursor-pointer
              '
              showBorder={true}
              borderColor='cyan'
              name={authUser.displayName}
              //authUser.photoURL
              src={getUserProfile()?.avatar}
              >
              </Avatar>
              <span>{getUserProfile()?.username}</span>
            </nav>
          )
          else return <></>
        })()}
        {logoutBtn}
      </nav>  
    </header>
  )
}

export default Header