import { Box, Flex, Image, Title } from '@mantine/core';

import { ProjectItem, type ProjectItemProperties } from './ProjectItem';

import classes from './Portfolio.module.css';
import { useBannerProfileQuery, usePortfolioProfileQuery } from '../../shared/hooks/useProfile';
import { useAuth } from '../../app/providers/auth';
import { PortfolioCard } from './PortfolioCard';

export function PortfolioBanner() {
  const { user } = useAuth();
  const { data: banner } = useBannerProfileQuery(user?.id ?? '', {
    enabled: !!user?.id,
  });

  const { data: portfolios } = usePortfolioProfileQuery(user?.id ?? '', {
    enabled: !!user?.id,
  });

  const portfolioActives: ProjectItemProperties[] = [
    {
      content: 'Published changes to Editorial',
      href: '/',
      lastUpdated: '12/12/2001',
    },
    {
      content: 'Added a new project layer to Product Design',
      href: '/',
      lastUpdated: '12/12/2001',
    },
    {
      content: 'Created draft site Archive 24',
      href: '/',
      lastUpdated: '12/12/2001',
    },
  ];
  

  return (
    <Flex className={classes['portfolio-banner-wrapper']} direction="column" h="100%">
      <Box h="300px" mb="md">
        <Image src={banner?.imageUrl} alt={banner?.title || 'Banner image'} radius="md" h="100%" fit="cover" />
      </Box>
      <Title fz="h5">Recently</Title>
      <Flex className={classes['portfolio-activities']} direction="column" gap={'sm'} mb="md">
        {portfolioActives.map((item) => (
          <ProjectItem key={item.href} content={item.content} href={item.href} lastUpdated={item.lastUpdated} />
        ))}
      </Flex>
      <Title fz="h5" mb="md">
        Portfolios
      </Title>
      <Flex className={classes['portfolio-blocks']} gap={'sm'} mb="md">
        {portfolios?.map((item) => (
          <PortfolioCard key={item.id} data={item} />
        ))}
      </Flex>
    </Flex>
  );
}
