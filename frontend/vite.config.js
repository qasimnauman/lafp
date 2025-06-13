import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://api.lspf.qasimnauman.tech', // Backend server
        // changeOrigin: true, // Ensure the request appears to come from the frontend server
      },
    },
  },
});