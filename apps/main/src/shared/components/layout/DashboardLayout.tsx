import { Outlet } from 'react-router-dom';

import { Burger, Flex, ScrollArea, Splitter, Stack } from '@mantine/core';

import './layout.css';

import { useDisclosure } from '@mantine/hooks';

import { CopyrightBlock } from './CopyrightBlock';
import { Sitebar } from './Sitebar';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export function DashboardLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Flex direction='column' h='100vh'>
      <Stack justify='space-between'>
        <SiteHeader />
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
      </Stack>

      <Splitter
        w='100%'
        withHandle={false}
        lineSize={1}
        style={{
          overflow: 'hidden',
        }}
      >
        <Splitter.Pane defaultSize={30} min={0} max={30} component={ScrollArea}>
          <Sitebar />
        </Splitter.Pane>
        <Splitter.Pane defaultSize={70} min={20} p='md' component={ScrollArea}>
          <Outlet />
          <CopyrightBlock />
        </Splitter.Pane>
      </Splitter>

      <SiteFooter />
    </Flex>
  );
}
