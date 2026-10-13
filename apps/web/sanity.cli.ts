/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { existsSync } from 'node:fs'
import { defineCliConfig } from 'sanity/cli'

// The Sanity CLI only loads SANITY_STUDIO_* vars on its own; the project shares
// the Next app's NEXT_PUBLIC_* ones in .env.
if (existsSync('.env')) process.loadEnvFile('.env')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({
  api: { projectId, dataset },
  project: { basePath: '/studio' },
  /*
   * The studio is built as a static SPA and served from the Worker's assets
   * (see worker.ts), so sanity/env.ts's process.env reads have to be inlined.
   */
  vite: (config) => ({
    ...config,
    // Vite would otherwise copy the Next app's public/ (videos and all) in.
    publicDir: false,
    define: {
      ...config.define,
      'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID': JSON.stringify(projectId),
      'process.env.NEXT_PUBLIC_SANITY_DATASET': JSON.stringify(dataset),
      'process.env.NEXT_PUBLIC_SANITY_API_VERSION': JSON.stringify(
        process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      ),
    },
  }),
})
