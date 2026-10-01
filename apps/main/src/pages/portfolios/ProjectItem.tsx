import { useNavigate } from 'react-router-dom';

import { Box, Flex } from '@mantine/core';
import { Edit2Icon } from 'lucide-react';

import classes from './Portfolio.module.css';

export interface ProjectItemProperties {
  content: string;
  lastUpdated: string;
  href: string;
}

export function ProjectItem({ href, lastUpdated, content }: Readonly<ProjectItemProperties>) {
  const navigate = useNavigate();

  const handleOpenProjectDetail = () => {
    navigate(href);
  };

  return (
    <Flex className={classes['portfolio-button']} variant="transparent" onClick={handleOpenProjectDetail} align="center" justify="start" gap={3}>
      <Box className={classes['portfolio-button-icon']}>
        <Edit2Icon width="12px" height="12px" />
      </Box>

      <Flex className={classes['portfolio-button-label']} flex={1}>
        {content}
        <span className={classes['portfolio-button-last-update']}>{lastUpdated}</span>
      </Flex>
    </Flex>
  );
}
