import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        outDir: 'docs',
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
