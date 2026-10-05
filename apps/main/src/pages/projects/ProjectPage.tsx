import { Link, useParams } from 'react-router-dom';

import { Box, Button, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';

import { ROUTES } from '../../app/router/paths';
import { SiteHeader } from '../../shared/components/layout/SiteHeader';
import { PlayerDock } from '../../shared/components/MusicPlayer';
import { OtherProjects } from '../../shared/components/ProjectCard';
import { getProject } from '../../shared/data/projects';
import { useMusicPlayer } from '../../shared/hooks/useMusicPlayer';

import classes from './ProjectPage.module.css';

const ProjectMissing = () => (
  <Stack align="center" className="not-found-page" gap="1rem" justify="center">
    <Box className="not-found-content">
      <Title className="not-found-title chrometxt" order={1}>
        404
      </Title>
      <Text className="muted-copy" component="p">
        Project not found.
      </Text>
      <Button className="chrome-link-button" component={Link} mt="1.5rem" to={ROUTES.home} variant="unstyled">
        <ArrowLeft aria-hidden="true" size={14} />
        Back home
      </Button>
    </Box>
  </Stack>
);

export function ProjectPage() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  const player = useMusicPlayer();

  if (!project) {
    return <ProjectMissing />;
  }

  return (
    <Box className={classes['project-page']}>
      <SiteHeader detail />
      <Box className={classes['project-page-main']} component="main">
        <Box className={`${classes['project-intro']} reveal`} component="section">
          <Text className="eyebrow" component="p">
            (case study) {project.timeline}
          </Text>
          <Title className={`${classes['project-title']} chrometxt`} order={1}>
            {project.title}
          </Title>
          <Text className={`${classes['project-overview']} muted-copy`} component="p">
            {project.overview}
          </Text>
          <Group className={classes['project-stack']} gap="0.5rem">
            {project.stack.map((item) => (
              <Text key={item} className="tech-pill" component="span">
                {item}
              </Text>
            ))}
          </Group>
        </Box>
        <img alt={project.alt} className={`${classes['case-study-image']} chrome reveal`} height={640} src={project.img} width={1024} />
        <SimpleGrid className={`${classes['project-metrics']} reveal`} cols={{ base: 1, xs: 3 }} component="section" spacing="1rem">
          {project.metrics.map((metric) => (
            <Box key={metric.label} className={`${classes['metric-block']} chrome`}>
              <Text className={`${classes['metric-value']} chrometxt`} component="p">
                {metric.value}
              </Text>
              <Text className={classes['metric-label']} component="p">
                {metric.label}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
        <SimpleGrid className={classes['project-details']} cols={{ base: 1, sm: 2 }} component="section" spacing="2.5rem">
          <Box className="reveal">
            <Text className="eyebrow" component="span">
              (a) role
            </Text>
            <Title className={`section-title ${classes['project-detail-title']}`} order={2}>
              What I did
            </Title>
            <Text className={classes['detail-copy']} component="p">
              {project.role}
            </Text>
            <Text className={classes['project-tags']} component="p">
              {project.tags}
            </Text>
          </Box>
          <Box className="reveal home-log-delay">
            <Text className="eyebrow" component="span">
              (b) highlights
            </Text>
            <Title className={`section-title ${classes['project-detail-title']}`} order={2}>
              Engineering notes
            </Title>
            <Stack className="highlight-list" component="ul" gap="0.75rem">
              {project.highlights.map((highlight) => (
                <Group key={highlight} align="flex-start" className={classes['highlight-entry']} component="li" gap="0.75rem" wrap="nowrap">
                  <Text className={classes['highlight-marker']} component="span">
                    —
                  </Text>
                  <Text className={classes['detail-copy']} component="span">
                    {highlight}
                  </Text>
                </Group>
              ))}
            </Stack>
          </Box>
        </SimpleGrid>
        <Box className={classes['other-work-section']} component="section">
          <Title className={`section-title ${classes['other-work-title']}`} order={2}>
            Other work
          </Title>
          <OtherProjects currentSlug={project.slug} />
        </Box>
      </Box>
      <PlayerDock player={player} />
    </Box>
  );
}
