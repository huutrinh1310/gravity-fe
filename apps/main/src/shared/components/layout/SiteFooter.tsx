import { AppShell, Box, Group, Text } from '@mantine/core';

import { useAuth } from '../../../app/providers/auth/AuthProvider';

export function SiteFooter() {
  const { user } = useAuth();
  const name = user?.name ?? 'Guest';

  return (
    <AppShell.Footer id="contact" className="site-footer" component="footer">
      <Group mx="auto" justify="space-between" px="md" w="100%">
        <Box>
          <Text className="eyebrow" component="span">
            (e) contact
          </Text>
          {user?.email && (
            <a className="footer-email chrometxt" href={`mailto:${user.email}`}>
              {user.email}
            </a>
          )}
        </Box>
        <Text className="footer-credit" component="p">
          ©2026 {name} — built by hand
        </Text>
      </Group>
    </AppShell.Footer>
  );
}
