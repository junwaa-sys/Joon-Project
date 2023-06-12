import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mantine/core'
import { useEffect } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Home() {
  const { loginWithRedirect } = useAuth0()
  const isLoggedIn = document.cookie ? true : false
  function handleSignIn() {
    loginWithRedirect()
  }

  if (!isLoggedIn) {
    return (
      <>
        <IfNotAuthenticated>
          <div>Please Sign in to use the service.</div>
        </IfNotAuthenticated>
      </>
    )
  } else {
    return <></>
  }
}
