import { useState } from 'react'
import {
  IconDashboard,
  IconList,
  IconCoin,
  IconCategory,
} from '@tabler/icons-react'
import { Box, NavLink } from '@mantine/core'

interface Props {
  path: string
}
const data = [
  { icon: IconDashboard, label: 'Dashboard', link: '/dashboard' },
  {
    icon: IconList,
    label: 'Transactions',
    link: '/transactions',
  },
  { icon: IconCoin, label: 'Budgets', link: '/budgets' },
  { icon: IconCategory, label: 'Categories', link: '/categories' },
]

export default function SideNavBar(props: Props) {
  const linkData = data.filter((linkData) => {
    if (linkData.link === props.path) {
      return linkData.link
    }
  })

  const [active, setActive] = useState(linkData[0] ? linkData[0].link : null)
  const items = data.map((item) => (
    <NavLink
      key={item.label}
      active={item.link === active}
      label={item.label}
      component="a"
      href={item.link}
      icon={<item.icon size="1.5rem" stroke={1.5} />}
      onClick={() => setActive(item.link)}
    />
  ))

  return <Box w={220}>{items}</Box>
}
