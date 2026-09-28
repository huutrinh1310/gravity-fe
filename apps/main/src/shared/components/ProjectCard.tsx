import { Link } from 'react-router';

import { Box, Group, SimpleGrid, Text, Title } from '@mantine/core';

import { ROUTES } from '../../app/router/paths';
import { type Project, PROJECTS } from '../data/projects';

export function OtherProjects({ currentSlug }: { currentSlug: string }) {
  return (
    <SimpleGrid className="other-projects-grid" cols={{ base: 1, xs: 2 }} spacing="1rem">
      {PROJECTS.filter((project) => project.slug !== currentSlug).map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </SimpleGrid>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="project-card chrome reveal" to={ROUTES.projectDetail(project.slug)}>
      <Box alt={project.alt} className="project-card-image" component="img" height={640} src={project.img} width={1024} loading="lazy" />
      <Box className="project-card-content">
        <Group className="project-card-heading" justify="space-between">
          <Title className="project-card-title" order={3}>
            {project.title}
          </Title>
          <Text className="project-card-year" component="span">
            {project.year}
          </Text>
        </Group>
        <Text className="project-card-description" component="p">
          {project.desc}
        </Text>
        <Text className="project-card-tags" component="p">
          {project.tags}
        </Text>
      </Box>
    </Link>
  );
}
