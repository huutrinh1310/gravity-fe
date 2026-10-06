import { useState } from 'react';

import { ActionIcon, Box, Button, Group, Paper, Progress, Text, TextInput } from '@mantine/core';

import type { PlayerState } from '../hooks/useMusicPlayer';
import { Dock, Upload } from 'lucide-react';

function Equalizer({ playing }: Readonly<{ playing: boolean }>) {
  const bars = ['1s', '1.15s', '0.9s', '1.25s', '1s'];

  return (
    <Box
      aria-hidden='true'
      className='equalizer'
    >
      {bars.map((duration, index) => (
        <span
          key={index}
          style={{
            animation: `eq ${duration} ease-in-out infinite`,
            animationDelay: `${index * 0.07}s`,
            animationPlayState: playing ? 'running' : 'paused',
          }}
          className='equalizer-bar'
        />
      ))}
    </Box>
  );
}

const fmt = (seconds: number) =>
  Number.isFinite(seconds) ? `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}` : '00:00';

export function NowPlayingCard({ player }: Readonly<{ player: PlayerState }>) {
  const pct = player.duration > 0 ? (player.time / player.duration) * 100 : 0;

  return (
    <Paper
      className='now-playing-card chrome'
      radius='md'
    >
      <Group
        className='now-playing-meta'
        justify='space-between'
        wrap='nowrap'
      >
        <Text component='span'>NOW PLAYING</Text>
        <Text component='span'>
          {fmt(player.time)} / {fmt(player.duration)}
        </Text>
      </Group>
      <Group
        className='now-playing-track'
        gap='0.75rem'
        wrap='nowrap'
      >
        <Equalizer playing={player.playing} />
        <Box className='now-playing-copy'>
          <Text
            className='now-playing-title'
            component='p'
          >
            {player.title}
          </Text>
          <Text
            className='now-playing-status'
            component='p'
          >
            {player.playing ? 'playing — background' : 'paused'}
          </Text>
        </Box>
      </Group>
      <Progress
        aria-label='Track progress'
        className='music-progress now-playing-progress'
        size={4}
        value={pct}
      />
    </Paper>
  );
}
export function PlayerDock({ player }: Readonly<{ player: PlayerState }>) {
  const [mode, setMode] = useState<'idle' | 'url'>('idle');
  const [url, setUrl] = useState('');
  const pct = player.duration > 0 ? (player.time / player.duration) * 100 : 0;

  const submitUrl = () => {
    player.loadUrl(url);
    setUrl('');
    setMode('idle');
  };

  return (
    <Box className='player-dock player-dock-expanded'>
      <Box
        aria-hidden='true'
        className='player-sheen'
      >
        <Box className='player-sheen-light' />
      </Box>
      <Group
        className='player-dock-main'
        gap='0.75rem'
        wrap='nowrap'
      >
        <ActionIcon
          aria-label={player.playing ? 'Pause music' : 'Play music'}
          className='player-play chromebtn'
          size={40}
          variant='unstyled'
          onClick={player.toggle}
        >
          {player.playing ? '❚❚' : '▶'}
        </ActionIcon>
        <Box className='player-track'>
          <Group
            className='player-track-heading'
            gap='0.5rem'
            justify='space-between'
            wrap='nowrap'
          >
            <Text
              className='player-track-title'
              component='p'
            >
              {player.title}
            </Text>
            <Text
              className='player-track-time'
              component='p'
            >
              {fmt(player.time)}
            </Text>
          </Group>
          <Progress
            aria-label='Track progress'
            className='music-progress dock-progress'
            size={4}
            value={pct}
          />
        </Box>
        <Group
          className='player-actions'
          gap='0.5rem'
          wrap='nowrap'
        >
          <Button
            className='player-chip pill player-upload'
            component='label'
            variant='unstyled'
          >
            <Upload size={16} />
            <input
              accept='audio/*'
              className='player-file-input'
              type='file'
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  player.loadFile(file);
                }
                event.target.value = '';
              }}
            />
          </Button>
          <Button
            className='player-chip pill'
            variant='unstyled'
            onClick={() => setMode(mode === 'url' ? 'idle' : 'url')}
          >
            <Dock size={16} />
          </Button>
        </Group>
      </Group>
      {mode === 'url' && (
        <Group
          className='player-url-row'
          gap='0.5rem'
          wrap='nowrap'
        >
          <TextInput
            className='player-url-input'
            classNames={{ input: 'player-url-field' }}
            placeholder='https://example.com/track.mp3'
            type='url'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && submitUrl()}
          />
          <Button
            className='player-load-button chromebtn'
            variant='unstyled'
            onClick={submitUrl}
          >
            load
          </Button>
        </Group>
      )}
    </Box>
  );
}
