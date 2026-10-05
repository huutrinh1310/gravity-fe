import { Link } from 'react-router';

import { Box, Button, Flex, Group, Text } from '@mantine/core';
import { Tag } from '@nx-vite-react-ts-mantine-boilerplate/ui-kit';
import { ArrowLeft } from 'lucide-react';

import { useAuth } from '../../../app/providers/auth/AuthProvider';
import { ROUTES } from '../../../app/router/paths';
import { ThemeToggle } from '../ThemeToggle';

export function SiteHeader({ detail = false }: Readonly<{ detail?: boolean }>) {
  const { user, isAuthenticated, logout } = useAuth();
  const name = user?.name ?? 'Guest';

  return (
    <Box className="site-header" component="header">
      <Group className="site-header-content" justify="space-between" wrap="nowrap">
        {detail ? (
          <Link className="site-header-back" to={ROUTES.home}>
            <ArrowLeft aria-hidden="true" size={14} />
            back to portfolio
          </Link>
        ) : (
          <Group className="site-header-brand" gap="0.75rem" wrap="nowrap">
            <a className="site-header-brand-link" href={ROUTES.sections.top}>
              <span className="brand-mark chromebtn">HT</span>
              <Text className="site-header-name" component="span">
                {name} — fullstack
              </Text>
            </a>
            <Tag content="V1.0 SPEC" variant="primary" />
          </Group>
        )}
        <Flex className="site-header-actions" gap="1rem" wrap="nowrap">
          {!detail && (
            <nav className="site-header-nav">
              {isAuthenticated ? (
                <Box component="button" onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                  Logout
                </Box>
              ) : (
                <Button variant="transparent">
                  <Link to={ROUTES.auth.login} style={{ textDecoration: 'none', color: 'inherit' }}>
                    Login
                  </Link>
                </Button>
              )}
            </nav>
          )}
          <ThemeToggle />
        </Flex>
      </Group>
    </Box>
  );
}
