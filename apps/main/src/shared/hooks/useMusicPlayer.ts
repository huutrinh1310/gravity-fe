import { useEffect, useRef, useState } from 'react';

const DEFAULT_TRACK = {
  title: 'Midnight Compile',
  src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
};

export type PlayerState = {
  title: string;
  duration: number;
  playing: boolean;
  time: number;
  loadFile: (file: File) => void;
  loadUrl: (url: string, name?: string) => void;
  toggle: () => void;
};

export function useMusicPlayer(): PlayerState {
  const audioReference = useRef<HTMLAudioElement | null>(null);
  const objectUrlReference = useRef<null | string>(null);
  const [playing, setPlaying] = useState(false);
  const [title, setTitle] = useState(DEFAULT_TRACK.title);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pendingSource, setPendingSource] = useState<null | string>(null);

  useEffect(() => {
    const audio = new Audio(DEFAULT_TRACK.src);

    audio.loop = true;
    audio.volume = 0.6;
    audioReference.current = audio;
    const onTime = () => setTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audioReference.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioReference.current;

    if (!audio || !pendingSource) {
      return;
    }
    audio.src = pendingSource;
    audio.currentTime = 0;
    void audio.play().catch(() => setPlaying(false));
  }, [pendingSource]);

  const loadUrl = (url: string, name?: string) => {
    const trimmed = url.trim();

    if (!trimmed) {
      return;
    }
    setTitle(name ?? trimmed.split('/').pop()?.split('?')[0] ?? 'Custom track');
    setPendingSource(trimmed);
  };

  const loadFile = (file: File) => {
    if (objectUrlReference.current) {
      URL.revokeObjectURL(objectUrlReference.current);
    }
    const url = URL.createObjectURL(file);

    objectUrlReference.current = url;
    setTitle(file.name.replace(/\.[^.]+$/, ''));
    setPendingSource(url);
  };

  const toggle = () => {
    const audio = audioReference.current;

    if (!audio) {
      return;
    }
    if (audio.paused) {
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  };

  return { title, duration, playing, time, loadFile, loadUrl, toggle };
}
