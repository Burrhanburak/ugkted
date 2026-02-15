import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'ugkted',

  projectId: 'svpy9p3y',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: [],
  },
})
