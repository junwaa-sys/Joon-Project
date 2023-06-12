import { Button, Group } from '@mantine/core'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

export default function HeaderBar() {
  const { logout, loginWithRedirect, user } = useAuth0()
  let userName = ''
  useEffect(() => {
    if (!userName && user?.name) {
      userName = user?.name
    }
  })
  async function handleSignOut() {
    logout()
  }

  async function handleSignIn() {
    await loginWithRedirect()
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
