import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from 'next-themes'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <HelmetProvider>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    <App />
                </ThemeProvider>
            </HelmetProvider>
        </ErrorBoundary>
    </React.StrictMode>,
)
