import { Routes, Route } from 'react-router-dom'
import { AppShell, Navbar, Header } from '@mantine/core'

import HeaderBar from './HeaderBar'
import Home from './Home'
import DashBoard from './DashBoard'
import Payables from './Payables'
import Categories from './Categories'
import Budgets from './Budgets'

function App() {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          TEST NAV BAR
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
        <Route path="/" element={<Home />} />
      </Routes>
    </AppShell>
  )
}

export default App
