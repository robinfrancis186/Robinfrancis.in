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
        sourcemap: false, // Disabled for production - reduces bundle size and parser overhead
        rollupOptions: {
            output: {
                manualChunks: {
                    // Separate Three.js and heavy 3D libraries into their own chunk
                    'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
                    // Separate Lottie animations
                    'lottie-vendor': ['lottie-react'],
                    // Separate Sanity CMS
                    'sanity-vendor': ['@sanity/client', '@sanity/image-url', '@portabletext/react'],
                    // Separate animation libraries
                    'animation-vendor': ['framer-motion', 'gsap'],
                },
            },
        },
        modulePreload: {
            resolveDependencies: (_url, deps) =>
                deps.filter(
                    (dep) =>
                        !dep.includes('threejs-') &&
                        !dep.includes('lottie-') &&
                        !dep.includes('gsap-') &&
                        !dep.includes('sanityClient-')
                ),
        },
        chunkSizeWarningLimit: 600, // Warn if chunks exceed 600KB
    },
})
