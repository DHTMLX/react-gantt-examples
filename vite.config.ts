import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  // Cast works around a duplicate vite install: @vitejs/plugin-react resolves its
  // own nested vite, producing a Plugin type that is structurally identical but a
  // distinct type identity from this project's vite. Runtime is unaffected.
  plugins: [react() as PluginOption],
  build:{
    sourcemap:true,
    minify: false,
  },
  server: {
    port: 3000,
    open: true,
    watch: {
      // Needed for workspace symlinks
      followSymlinks: true,
    },
  }
})
