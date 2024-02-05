/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COIN_STATS_KEY: string;
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
