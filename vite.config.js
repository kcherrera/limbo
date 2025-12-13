import { defineConfig } from 'vite';

export default defineConfig({
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
