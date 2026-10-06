import { ChartLine, Dot, HomeIcon, LayoutTemplate, Link } from 'lucide-react';

import { SitebarItem, type SitebarItemProperties } from './SitebarItem';

import { Box } from '@mantine/core';
import { ROUTES } from '../../../app/router/paths';

export function Sitebar() {
  const sitebars: SitebarItemProperties[] = [
    {
      label: 'Portfolios',
      href: ROUTES.portfolios.root,
      icon: <HomeIcon />,
    },
    {
      label: 'Templates',
      href: '/templates',
      icon: <LayoutTemplate />,
    },
    {
      label: 'Integrations',
      href: '/integrations',
      icon: <Link />,
    },
    {
      label: 'Domain Settings',
      href: '/domain-settings',
      icon: <Dot />,
    },
    {
      label: 'Analytics',
      href: '/analytics',
      icon: <ChartLine />,
    },
  ];

  return (
    <Box className='sitebar'>
      {sitebars.map((item) => (
        <SitebarItem key={item.href} {...item} />
      ))}
    </Box>
  );
}
