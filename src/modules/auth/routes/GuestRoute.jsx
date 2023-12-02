import {Route, Navigate, Outlet} from 'react-router-dom'

import useAuthStore from '@/modules/auth/store.auth'

const GuestRoute = ({
  children,
  ...rest
}) => {
  const {authUser} = useAuthStore();

  if (authUser === null) return <></>

  // if authUser=true =: stop (only Guest)
  return (
    authUser ? <Navigate to='/'/> : <Outlet/>
  )
}

export default GuestRoute