import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'assets/*',
          dest: 'assets'
        }
      ]
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Three.js core into its own chunk
          'three-core': ['three'],
          // Split Three.js addons into separate chunk
          'three-addons': [
            'three/addons/loaders/HDRLoader.js'
          ]
        }
      }
    },
    // Optional: increase the warning limit if needed
    chunkSizeWarningLimit: 600
  }
});
