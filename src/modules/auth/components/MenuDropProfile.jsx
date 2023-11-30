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

const MenuDropProfile = () => {
  const {authUser, authProfile} = useAuthStore();
  const navigate = useNavigate();

  function handLogout() {

    //window.alert('');
    signOut(auth)
      .then(() => {
        navigate('/');
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