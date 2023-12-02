import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup, Button, IconButton } from '@chakra-ui/react'
import { FaArrowRightToBracket,  } from "react-icons/fa6";
import useAuthStore from '@/modules/auth/store.auth'
import {useNavigate} from 'react-router-dom'
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import {signOut} from 'firebase/auth'
import {auth} from '@/firebase/firedb'

import useProfilesStore from '@/modules/profiles/store.profile'
import usePostsStore from '@/modules/posts/store.post'
import useCommentsStore from '@/modules/comments/store.comments'

const MenuDropProfile = () => {
  const {authUser, authProfile, emptyAuthStore} = useAuthStore();
  const {emptyProfilesStore} = useProfilesStore();
  const {emptyPostsStore} = usePostsStore();
  const {emptyCommentsStore} = useCommentsStore();
  const navigate = useNavigate();

  function handLogout() {
    console.log('logout')
    //window.alert('');
    signOut(auth)
      .then(() => {

        emptyCommentsStore();
        emptyPostsStore();
        emptyAuthStore();
        emptyProfilesStore();

        navigate('/login');
        console.log('user has logged out!!');
      })
      .catch((error) => {
        console.log('error during logout: ', error.message)
      })
  }

  return (
    <>
      <Menu>
        <MenuButton 
        //as={IconButton} 
        //isRound={true}
        //size={'2xl'}
        >
          <Avatar
          className='
          cursor-pointer
          '
          size='md'
          //showBorder={true}
          //borderColor='cyan'
          name={authProfile?.username}
          //authUser.photoURL
          src={authProfile?.avatar}
          >
          </Avatar>
        </MenuButton>
        <MenuList>
          <MenuItem
          >
          <span
          className='
          text-blue-500 font-bold text-lg
          text-center w-full
          '
          >
          {authProfile?.username}
          </span>
          </MenuItem>
          <MenuItem
          //as={Button}
          //icon={}
          display='flex'
          justifyContent='space-between'
          flex={1}
          color={'red.500'}

          onClick={handLogout}
          >
            <span>
              Logout
            </span>
            <HiArrowRightOnRectangle size={24}/>
          </MenuItem>
          {/* <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem> */}
        </MenuList>
      </Menu>
    </>
  )
}

export default MenuDropProfile