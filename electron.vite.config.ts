import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

if (process.platform === 'linux') {
  process.env.ELECTRON_DISABLE_SANDBOX = '1'
}

export default defineConfig({
  main: {},
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/preload/index.ts'),
          'content-preload': resolve(__dirname, 'src/preload/content-preload.ts'),
          'spotlight-preload': resolve(__dirname, 'src/preload/spotlight-preload.ts'),
          'voice-input-preload': resolve(__dirname, 'src/preload/voice-input-preload.ts')
        }
      }
    }
  },
  renderer: {
    server: process.env.USE_LOCAL_CORE === 'true' ? { port: 5180, strictPort: true } : undefined,
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/renderer/index.html'),
          spotlight: resolve(__dirname, 'src/renderer/spotlight.html'),
          'voice-input': resolve(__dirname, 'src/renderer/voice-input.html')
        }
      }
    },
    plugins: [tailwindcss(), svelte()]
  }
})
