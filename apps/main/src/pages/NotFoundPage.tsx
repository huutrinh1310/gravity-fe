import { Link } from 'react-router';

import { Box, Button, Stack, Text, Title } from '@mantine/core';

import { ROUTES } from '../app/router/paths';

export function NotFoundPage() {
  return (
    <Stack align="center" className="not-found-page" justify="center">
      <Box className="not-found-content">
        <Title className="not-found-title chrometxt" order={1}>
          404
        </Title>
        <Text className="muted-copy" component="p">
          Page not found.
        </Text>
        <Button className="chrome-link-button" component={Link} mt="1.5rem" to={ROUTES.home} variant="unstyled">
          Back home
        </Button>
      </Box>
    </Stack>
  );
}
