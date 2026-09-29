import { Box, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';

import { NowPlayingCard, PlayerDock } from '../../shared/components/MusicPlayer';
import { ProjectCard } from '../../shared/components/ProjectCard';
import { PROJECTS } from '../../shared/data/projects';
import { useMusicPlayer } from '../../shared/hooks/useMusicPlayer';

const STACK = ['TypeScript', 'Go', 'Rust', 'React', 'Node', 'Postgres', 'K8s', 'GraphQL'];
const LOG = [
  {
    note: 'Leading platform & realtime infra.',
    role: 'Staff Engineer · Northgrid',
    years: '2022—',
  },
  { note: 'Shipped 0→1 products end to end.', role: 'Fullstack · Lumen Labs', years: '2019—22' },
  { note: 'Web apps for early-stage teams.', role: 'Dev · Freelance', years: '2016—19' },
];

export function HomePage() {
  const player = useMusicPlayer();

  return (
    <Box className="home-page">
      <Box className="home-hero" component="section">
        <Box className="home-hero-copy reveal">
          <Text className="eyebrow home-welcome" component="p">
            — welcome to the machine
          </Text>
          <Title className="home-title" order={1}>
            <span>I build</span>
            <span className="chrometxt">full-stack</span>
            <span>systems.</span>
          </Title>
          <Text className="home-summary" component="p">
            Fullstack developer crafting resilient products across the stack — from the database to the pixel, with an equalizer always loaded.
          </Text>
        </Box>
        <Box className="home-player reveal home-player-delay">
          <NowPlayingCard player={player} />
        </Box>
      </Box>
      <Box id="work" className="home-section" component="section">
        <Group align="baseline" className="home-section-heading reveal" justify="space-between">
          <Title className="section-title" order={2}>
            Selected work
          </Title>
          <Text className="eyebrow" component="span">
            (b) 03 projects
          </Text>
        </Group>
        <SimpleGrid className="project-grid" cols={{ base: 1, md: 3, xs: 2 }} spacing="1rem">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </SimpleGrid>
      </Box>
      <SimpleGrid className="home-details home-section" cols={{ base: 1, sm: 2 }} component="section" spacing="2.5rem">
        <Box id="stack" className="reveal">
          <Text className="eyebrow" component="span">
            (c) stack
          </Text>
          <Title className="section-title detail-title" order={2}>
            Tech
          </Title>
          <Group className="tech-list" gap="0.5rem">
            {STACK.map((item) => (
              <Text key={item} className="tech-pill" component="span">
                {item}
              </Text>
            ))}
          </Group>
        </Box>
        <Box id="log" className="reveal home-log-delay">
          <Text className="eyebrow" component="span">
            (d) log
          </Text>
          <Title className="section-title detail-title" order={2}>
            Experience
          </Title>
          <Stack className="experience-list" component="ul" gap="1rem">
            {LOG.map((entry) => (
              <Group key={entry.years} align="flex-start" className="experience-entry" component="li" gap="1rem" wrap="nowrap">
                <Text className="experience-years" component="span">
                  {entry.years}
                </Text>
                <Box>
                  <Text className="experience-role" component="p">
                    {entry.role}
                  </Text>
                  <Text className="muted-copy" component="p">
                    {entry.note}
                  </Text>
                </Box>
              </Group>
            ))}
          </Stack>
        </Box>
      </SimpleGrid>
      <PlayerDock player={player} />
    </Box>
  );
}
