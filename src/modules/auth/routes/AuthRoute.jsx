import {Route, Navigate, Outlet} from 'react-router-dom'

import useAuthStore from '@/modules/auth/store.auth'

const AuthRoute = ({
  children,
  ...rest
}) => {
  const {authUser} = useAuthStore();

  // wait for authUser to be fetched
  if (authUser === null) return <></>;

  // if authUser=false =: stop (only auth)
  return (
    authUser ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default AuthRoute