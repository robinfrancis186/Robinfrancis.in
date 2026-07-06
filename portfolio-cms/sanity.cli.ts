import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'so8fb28i',
    dataset: 'image'
  },
  deployment: {
    autoUpdates: false,
  },
  vite: (config) => ({
    ...config,
    base: '/cms/',
  })
})
