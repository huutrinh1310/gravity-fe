/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="@welldone-software/why-did-you-render" />

export {};

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_GITHUB_API_ENDPOINT: string;
    readonly VITE_GITHUB_TOKEN: string;
  }
}
