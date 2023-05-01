import { Button, Group } from '@mantine/core'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'

export default function HeaderBar() {
  const { logout, loginWithRedirect, user } = useAuth0()

  function handleSignOut() {
    logout()
  }

  function handleSignIn() {
    loginWithRedirect()
  }

  return (
    <Group px={20} position="apart">
      Hello! {user?.name}
      <IfAuthenticated>
        <Button onClick={handleSignOut}>Log Out</Button>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Button onClick={handleSignIn}>Log In</Button>
      </IfNotAuthenticated>
    </Group>
  )
}
