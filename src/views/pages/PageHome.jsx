import React, { useState } from 'react'
//import PropTypes from 'prop-types'

// components
//import Expense from '@/views/components/Expense'
import {Button} from '@mantine/core'
import {Link} from 'react-router-dom'

const PageHome = props => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div
    className='
    grid place-items-center
    '
    >
      <h1>
        Expense tracker app
      </h1>
    </div>
  )
}

//PageHome.propTypes = {}

export default PageHome