import { useState } from 'react'
import {
  IconGauge,
  IconFingerprint,
  IconActivity,
  IconChevronRight,
} from '@tabler/icons-react'
import { Box, NavLink } from '@mantine/core'

const data = [
  { icon: IconGauge, label: 'Dashboard', link: '/dashboard' },
  {
    icon: IconFingerprint,
    label: 'Transactions',
    link: '/transactions',
  },
  { icon: IconActivity, label: 'Budgets', link: '/budgets' },
]

export default function SideNavBar() {
  const [active, setActive] = useState(0)

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      component="a"
      href={item.link}
      icon={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => setActive(index)}
    />
  ))

  return <Box w={220}>{items}</Box>
}
