import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log('Vite is building with this config...');

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './index.html', // Path to the entry point
    },
    outDir: 'dist', // Output directory
  },
});
