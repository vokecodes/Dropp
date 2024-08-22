/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_SOME_ENV_VAR: string; // Add more environment variables as needed
    // You can also use `string | undefined` if the variable might not be defined
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  