import { Box, Group, Text } from '@mantine/core';
import { useAuth } from '../../../app/providers/auth';

export function CopyrightBlock() {
  const { user } = useAuth();
  const name = user?.name ?? 'Guest';

  return (
    <Group
      mx='auto'
      justify='space-between'
      px='md'
      w='100%'
    >
      <Box>
        <Text
          className='eyebrow'
          component='span'
          color='white'
        >
          (e) contact
        </Text>
        {user?.email && (
          <a
            className='footer-email chrometxt'
            href={`mailto:${user.email}`}
          >
            {user.email}
          </a>
        )}
      </Box>
      <Text
        className='footer-credit'
        component='p'
        color='white'
      >
        ©2026 {name} — built by hand
      </Text>
    </Group>
  );
}
