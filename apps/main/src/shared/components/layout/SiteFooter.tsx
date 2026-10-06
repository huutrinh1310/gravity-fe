import { Flex, Group } from '@mantine/core';

import { useMusicPlayer } from '../../hooks/useMusicPlayer';
import { PlayerDock } from '../MusicPlayer';

export function SiteFooter() {
  const player = useMusicPlayer();

  return (
    <Flex id='contact' className='site-footer' component='footer'>
      <Group mx='auto' justify='space-between' px='md' w='100%' h="60px">
        <PlayerDock player={player} />
      </Group>
    </Flex>
  );
}
