import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: false,
    watch: {
      ignored: [
        '**/client-assets/**',
        '**/docs/**',
        '**/.npm-cache/**',
        '**/temp-anthropic-skills/**',
        '**/.agents/**',
      ],
    },
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three'],
          'vendor-gsap': ['gsap', '@gsap/react'],
          'vendor-react': ['react', 'react-dom'],
          'vendor-utils': ['lenis', 'topojson-client'],
        },
      },
    },
  },
});
