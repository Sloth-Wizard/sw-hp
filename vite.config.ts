import { defineConfig } from 'vite'

export default defineConfig({
    base: '/',
    build: {
        rollupOptions: {
            external: [new RegExp('.htaccess')]
        }
    }
})
