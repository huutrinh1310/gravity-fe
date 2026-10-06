import { useState, type SubmitEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextInput, PasswordInput, Button, Divider, Container, Paper, Title, Text, Group } from '@mantine/core';
import { useAuth } from '../../app/providers/auth/AuthProvider';
import { ROUTES } from '../../app/router/paths';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithOAuth } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError('');
      await login(email, password);
      navigate(ROUTES.home);
    } catch (error_: unknown) {
      setError(error_ instanceof Error ? error_.message : 'Login failed');
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Link to={ROUTES.auth.register}>Create account</Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="you@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          {error && (
            <Text c="red" size="sm" mt="sm">
              {error}
            </Text>
          )}
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>

        <Divider label="Or continue with" labelPosition="center" my="lg" />

        <Group grow mb="md" mt="md">
          <Button variant="default" onClick={() => loginWithOAuth('google')}>
            Google
          </Button>
          <Button variant="default" onClick={() => loginWithOAuth('github')}>
            GitHub
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
