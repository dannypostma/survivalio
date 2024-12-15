import { defineConfig } from 'vite'

export default defineConfig({
  // Base public path when served in development or production
  base: './',
  
  // Development server configuration
  server: {
    port: 3000,
    open: true, // Automatically open browser on server start
  },
  
  // Build configuration
  build: {
    // Output directory for production build
    outDir: 'dist',
    
    // Enable chunk size warnings at 500kb
    chunkSizeWarningLimit: 500,
    
    // Optimize bundle splitting
    rollupOptions: {
      output: {
        // Use Vite's automatic chunking strategy
        manualChunks: undefined
      }
    }
  },

  // Asset handling
  assetsInclude: ['**/*.png'], // Ensure PNG files are handled as assets
})