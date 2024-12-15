export default defineConfig({
    // ...other config
    publicDir: 'public',
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.gif', '**/*.svg'],
    build: {
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                assetFileNames: 'assets/[name]-[hash][extname]'
            }
        }
    }
}) 