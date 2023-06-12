import { Routes, Route } from 'react-router-dom'
import { AppShell, Navbar, Header } from '@mantine/core'

import HeaderBar from './HeaderBar'
import SideNavBar from './SideNavBar'
import Home from './Home'
import DashBoard from './DashBoard'
import Transactions from './transactions/Transactions'
import Payables from './Payables'
import Categories from './Categories'
import Budgets from './Budgets'
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const { isAuthenticated } = useAuth0()
  if (!isAuthenticated) {
    return (
      <>
        <AppShell
          padding="md"
          header={
            <Header height={60} p="xs">
              <HeaderBar />
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
          </Routes>
        </AppShell>
      </>
    )
  } else {
    return (
      <>
        <AppShell
          padding="md"
          navbar={
            <Navbar width={{ base: 300 }} height={1024} p="xs">
              <SideNavBar path={location.pathname} />
            </Navbar>
          }
          header={
            <Header height={60} p="xs">
              <HeaderBar />
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budgets" element={<Budgets />} />
          </Routes>
        </AppShell>
      </>
    )
  }
}

export default App
