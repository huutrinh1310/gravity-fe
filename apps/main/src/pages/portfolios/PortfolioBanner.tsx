import { Flex, Image, Title } from '@mantine/core';

import { ProjectItem, type ProjectItemProperties } from './ProjectItem';

import classes from './Portfolio.module.css';

export function PortfolioBanner() {
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
    <Flex className={classes["portfolio-banner-wrapper"]} direction="column" h="100%">
      <Image src={''} alt="Banner" />
      <Title fz="h5">Recently</Title>
      <Flex className={classes["portfolio-activities"]} direction="column" gap={'sm'}>
        {portfolioActives.map((item) => (
          <ProjectItem key={item.href} content={item.content} href={item.href} lastUpdated={item.lastUpdated} />
        ))}
      </Flex>
    </Flex>
  );
}
