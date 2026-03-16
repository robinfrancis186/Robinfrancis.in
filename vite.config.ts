import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        ViteImageOptimizer({
            png: { quality: 80 },
            jpeg: { quality: 80 },
            jpg: { quality: 80 },
            webp: { quality: 80 },
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        outDir: 'docs',
        // Disable sourcemaps in production - they were adding ~3x to total payload size
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    // Core React framework separate from app code
                    reactConfig: ['react', 'react-dom', 'react-router-dom'],
                    // Framer motion standalone (used widely across the site)
                    animations: ['framer-motion'],
                    // Sanity CMS client in its own async chunk
                    sanityClient: ['@sanity/client', '@sanity/image-url', '@portabletext/react'],
                    // NOTE: gsap removed (replaced with CSS transitions in MasonryGallery)
                    // NOTE: three.js removed (lazy-imported only in Contact section now)
                    // NOTE: lottie-react removed (already lazy-imported via LottieClient.tsx)
                }
            }
        }
    },
})

