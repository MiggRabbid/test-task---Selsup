import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/test-task-Selsup/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    terserOptions: {
      compress: {
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    host: true,
    open: false,
  },
  appType: 'spa',
});
