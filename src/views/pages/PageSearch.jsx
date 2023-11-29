import React from 'react'

import {Button, Input, List, ListItem} from '@chakra-ui/react'
import { HiOutlineSearch } from "react-icons/hi";

const PageSearch = () => {
  return (
    <main
    id='page-search'
    className='
    flex items-center justify-center
    '
    >
      <div
      id='page-search-wrap'
      className='
      flex flex-col gap-3
      bg-white 
      md:w-1/2
      max-w-7xl
      '
      >
        <form
        className='
        flex gap-3 items-center w-full
        '
        >
          <Input 
          size='lg'
          placeholder='search for users...' 
          />
          {/* <Button
          variant='outline'
          type='submit'
          >
            <HiOutlineSearch
            size={24}
            />
          </Button> */}
        </form>

        {/* list of profiles */}
        <ul
        className='
        '
        >
          <SearchItem/>
          <SearchItem/>
          <SearchItem/>

        </ul>
      </div>
    </main>
  )
}

const SearchItem = ({
  item,
}) => {

  return (
    <li
    className='
    p-6 bg-slate-50 border-b
    '
    >
      item
    </li> 
  )
}

export default PageSearch