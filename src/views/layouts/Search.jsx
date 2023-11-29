import React from 'react'

import {Input} from '@chakra-ui/react'

const Search = () => {
  return (
    <form>
      <Input 
      variant='outline' 
      placeholder='search for users' />
    </form>
  )
}

export default Search