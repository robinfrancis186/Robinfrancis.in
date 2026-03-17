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
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    reactConfig: ['react', 'react-dom', 'react-router-dom'],
                    threejs: ['three', '@react-three/fiber', '@react-three/drei'],
                    animations: ['framer-motion', 'gsap', 'lottie-react'],
                    sanityClient: ['@sanity/client', '@sanity/image-url', '@portabletext/react']
                }
            }
        }
    },
})
