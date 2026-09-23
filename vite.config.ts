import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const publicUrl = env.VITE_PUBLIC_URL || process.env.VITE_PUBLIC_URL || "http://localhost:3000";
  const publicHost = new URL(publicUrl).hostname;
  const allowedHosts = [publicHost, "gravity-fe.onrender.com"];

  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      allowedHosts,
    },
    preview: {
      allowedHosts,
    },
  };
});
