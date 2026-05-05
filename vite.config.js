import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        blog: resolve(__dirname, 'blog.html'),
        careers: resolve(__dirname, 'careers.html'),
        contact: resolve(__dirname, 'contact.html'),
        dmca: resolve(__dirname, 'dmca-validation.html'),
        gateway: resolve(__dirname, 'gateway.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        services: resolve(__dirname, 'services.html'),
        terms: resolve(__dirname, 'terms.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
