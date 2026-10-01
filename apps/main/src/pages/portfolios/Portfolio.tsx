import { Box, Flex, Text, Title } from '@mantine/core';

import { PortfolioBanner } from './PortfolioBanner';
import { PortfolioCreate } from './PortfolioCreate';


export function Portfolio() {
  return (
    <Flex className="portfolio-wrapper" direction="column" gap={50} h="100%">
      <Flex align="center" className="portfolio-header" justify="space-between">
        <Box className="portfolio-header-info">
          <Title>Your Portfolios</Title>
          <Text fz="sm" lh="sm">
            Manage, edit, and publish your monograph sites from one workspace.
          </Text>
        </Box>
        <PortfolioCreate content="Create Portfolio" />
      </Flex>
      <PortfolioBanner />
    </Flex>
  );
}
