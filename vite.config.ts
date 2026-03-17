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
    },
})
