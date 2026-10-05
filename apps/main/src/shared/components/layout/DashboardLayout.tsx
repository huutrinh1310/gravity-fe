import { Outlet } from 'react-router-dom';

import { AppShell, Burger, ScrollArea } from '@mantine/core';

import './layout.css';

import { useDisclosure } from '@mantine/hooks';
import Sitebar from './Sitebar';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export function DashboardLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: 57 }} footer={{ height: 60 }} navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }} padding="md">
      <AppShell.Header>
        <SiteHeader />
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>
      <AppShell.Navbar>
        <Sitebar />
      </AppShell.Navbar>

      <AppShell.Main component={ScrollArea}>
        <Outlet />
      </AppShell.Main>
      <SiteFooter />
    </AppShell>
  );
}
