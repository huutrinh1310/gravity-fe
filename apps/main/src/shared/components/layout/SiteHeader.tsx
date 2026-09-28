import { Link } from 'react-router';

import { useAuth } from '@/app/providers/AuthProvider';
import { ROUTES } from '@/app/router/paths';
import { Box, Group, Text } from '@mantine/core';
import { Tag } from '@nx-vite-react-ts-mantine-boilerplate/ui-kit';
import { ArrowLeft } from 'lucide-react';

import { ThemeToggle } from '../ThemeToggle';

export function SiteHeader({ detail = false }: { detail?: boolean }) {
  const { name } = useAuth();

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
        {!detail && <nav className="site-header-nav" />}
        <ThemeToggle />
      </Group>
    </Box>
  );
}
