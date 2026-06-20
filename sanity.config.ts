import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import { exportTool } from './sanity/tools/exportTool'

export default defineConfig({
  name: 'default',
  title: 'The Trail Run Collective',

  projectId: 'x0eosm5j',
  dataset: 'production',

  basePath: '/studio',

  plugins: [structureTool({ structure })],

  tools: [exportTool],

  schema: {
    types: schemaTypes,
  },
})
