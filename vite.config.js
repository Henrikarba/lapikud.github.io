import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    svelte()
  ],
  base: '/lapikud.github.io/',
  server: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': '/src',
      '$components': '/src/components',
      '$lib': '/src/lib'
    }
  }
})
