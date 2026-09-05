import { useEffect, useRef, useState } from "react";

const DEFAULT_TRACK = {
  title: "Midnight Compile",
  src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
};

export type PlayerState = {
  playing: boolean;
  title: string;
  time: number;
  duration: number;
  toggle: () => void;
  loadUrl: (url: string, name?: string) => void;
  loadFile: (file: File) => void;
};

export function useMusicPlayer(): PlayerState {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [title, setTitle] = useState(DEFAULT_TRACK.title);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pendingSrc, setPendingSrc] = useState<string | null>(null);
  useEffect(() => {
    const audio = new Audio(DEFAULT_TRACK.src);
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;
    const onTime = () => setTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, []);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !pendingSrc) return;
    audio.src = pendingSrc;
    audio.currentTime = 0;
    void audio.play().catch(() => setPlaying(false));
  }, [pendingSrc]);
  const loadUrl = (url: string, name?: string) => {
    const trimmed = url.trim();
    if (!trimmed) return;
    setTitle(name ?? trimmed.split("/").pop()?.split("?")[0] ?? "Custom track");
    setPendingSrc(trimmed);
  };
  const loadFile = (file: File) => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setTitle(file.name.replace(/\.[^.]+$/, ""));
    setPendingSrc(url);
  };
  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play().catch(() => setPlaying(false));
    else audio.pause();
  };
  return { playing, title, time, duration, toggle, loadUrl, loadFile };
}
