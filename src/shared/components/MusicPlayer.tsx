import { useState } from "react";
import type { PlayerState } from "../hooks/useMusicPlayer";

const fmt = (seconds: number) =>
  !Number.isFinite(seconds)
    ? "00:00"
    : `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

function Equalizer({ playing }: { playing: boolean }) {
  const bars = ["1s", "1.15s", "0.9s", "1.25s", "1s"];
  return (
    <div className="flex h-6 items-end gap-[3px]" aria-hidden="true">
      {bars.map((duration, index) => (
        <span
          key={index}
          className="w-1 origin-bottom rounded bg-primary animate-eq"
          style={{
            animation: `eq ${duration} ease-in-out infinite`,
            animationDelay: `${index * 0.07}s`,
            animationPlayState: playing ? "running" : "paused",
          }}
        />
      ))}
    </div>
  );
}
export function NowPlayingCard({ player }: { player: PlayerState }) {
  const pct = player.duration > 0 ? (player.time / player.duration) * 100 : 0;
  return (
    <div className="chrome rounded-xl p-4">
      <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
        <span>NOW PLAYING</span>
        <span>
          {fmt(player.time)} / {fmt(player.duration)}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Equalizer playing={player.playing} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{player.title}</p>
          <p className="truncate font-mono text-[10px] text-muted-foreground">
            {player.playing ? "playing — background" : "paused"}
          </p>
        </div>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-foreground/10">
        <div
          className="progress-chrome h-full rounded-full transition-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
export function PlayerDock({ player }: { player: PlayerState }) {
  const [mode, setMode] = useState<"idle" | "url">("idle");
  const [url, setUrl] = useState("");
  const pct = player.duration > 0 ? (player.time / player.duration) * 100 : 0;
  const submitUrl = () => {
    player.loadUrl(url);
    setUrl("");
    setMode("idle");
  };
  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2">
      <div className="chrome relative overflow-hidden rounded-2xl p-3">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-sheen absolute inset-y-0 w-1/3 bg-white/40" />
        </div>
        <div className="relative flex items-center gap-3">
          <button
            onClick={player.toggle}
            className="chromebtn grid size-10 shrink-0 cursor-pointer place-items-center rounded-full transition-transform hover:-translate-y-0.5"
            aria-label={player.playing ? "Pause music" : "Play music"}
          >
            {player.playing ? "❚❚" : "▶"}
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-medium">{player.title}</p>
              <p className="shrink-0 font-mono text-[10px] text-muted-foreground">
                {fmt(player.time)}
              </p>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-foreground/10">
              <div
                className="progress-chrome h-full rounded-full transition-[width]"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <label className="pill cursor-pointer rounded-full px-3 py-1.5 font-mono text-[11px] transition-transform hover:-translate-y-0.5">
              upload
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) player.loadFile(file);
                  event.target.value = "";
                }}
              />
            </label>
            <button
              onClick={() => setMode(mode === "url" ? "idle" : "url")}
              className="pill cursor-pointer rounded-full px-3 py-1.5 font-mono text-[11px] transition-transform hover:-translate-y-0.5"
            >
              paste url
            </button>
          </div>
        </div>
        {mode === "url" && (
          <div className="relative mt-2 flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && submitUrl()}
              placeholder="https://example.com/track.mp3"
              className="min-w-0 flex-1 rounded-lg border border-input bg-background/70 px-3 py-1.5 font-mono text-xs outline-none focus:border-ring"
            />
            <button
              onClick={submitUrl}
              className="chromebtn cursor-pointer rounded-lg px-3 py-1.5 font-mono text-[11px]"
            >
              load
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
