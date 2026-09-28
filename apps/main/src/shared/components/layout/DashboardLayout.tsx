import { Outlet } from 'react-router-dom';

import { Box } from '@mantine/core';

import './layout.css';

import Sitebar from './Sitebar';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export interface DashboardLayoutProperties {
  children?: React.ReactNode;
}

export function DashboardLayout({}: DashboardLayoutProperties) {
  return (
    <Box className="dashboard-layout">
      <SiteHeader />

      <Box className="dashboard-body" component="section">
        <Sitebar />

        <Box className="dashboard-content">
          <Box className="dashboard-scrollbar dashboard-main" component="main">
            <Outlet />
            <SiteFooter />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
