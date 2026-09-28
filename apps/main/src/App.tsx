import { BrowserRouter, Route, Routes } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { type AuthProperties, AuthProvider } from './app/providers/AuthProvider';
import ThemeProvider from './app/providers/ThemeProvider';
import { ROUTES } from './app/router/paths';
import { HomePage } from './pages/home/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectPage } from './pages/projects/ProjectPage';
import { DashboardLayout } from './shared/components/layout/DashboardLayout';

const queryClient = new QueryClient();

function App() {
  const authValue: AuthProperties = {
    name: 'Huu Trinh',
    avatar: '',
    email: 'huutrinh@gmail.com',
    role: 'Fullstack',
  };

  return (
    <ThemeProvider>
      <AuthProvider value={authValue}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route element={<DashboardLayout />} path={ROUTES.home}>
                <Route element={<HomePage />} path={ROUTES.home} />
              </Route>
              <Route element={<ProjectPage />} path={ROUTES.projectDetailPattern} />
              <Route element={<NotFoundPage />} path="*" />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
