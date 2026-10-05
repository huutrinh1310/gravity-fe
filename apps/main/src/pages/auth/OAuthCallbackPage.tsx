import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Container, Text, Loader, Center } from '@mantine/core';
import { ROUTES } from '../../app/router/paths';
import { useAuth } from '../../app/providers/auth/AuthProvider';

export function OAuthCallbackPage() {
  const navigate = useNavigate();
  const { completeOAuth } = useAuth();
  const accessTokenRef = useRef<string | null>(null);

  if (accessTokenRef.current === null) {
    accessTokenRef.current = new URLSearchParams(globalThis.location.hash.slice(1)).get('access_token');
  }

  useEffect(() => {
    const accessToken = accessTokenRef.current;

    if (!accessToken) {
      navigate(ROUTES.auth.login);

      return;
    }

    globalThis.history.replaceState(null, '', globalThis.location.pathname + globalThis.location.search);
    let active = true;

    completeOAuth(accessToken)
      .then(() => {
        if (active) {navigate(ROUTES.home);}
      })
      .catch(() => {
        if (active) {navigate(ROUTES.auth.login);}
      });

    return () => {
      active = false;
    };
  }, [completeOAuth, navigate]);

  return (
    <Container size="sm" my={40}>
      <Center>
        <Loader size="xl" />
        <Text ml="md">Completing authentication...</Text>
      </Center>
    </Container>
  );
}
