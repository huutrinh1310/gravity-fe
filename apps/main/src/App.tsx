import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { HomePage } from './pages/home/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectPage } from './pages/projects/ProjectPage'
import { ROUTES } from './app/router/paths'
import ThemeProvider from './app/providers/ThemeProvider'

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.projectDetailPattern} element={<ProjectPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
