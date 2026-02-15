import path from 'node:path'
import { config } from 'dotenv'
import { defineConfig, env } from 'prisma/config'

// Load .env from monorepo root and package directory
config({ path: path.resolve(process.cwd(), '../../.env') })
config({ path: path.resolve(process.cwd(), '.env') })

// Fallback for prisma generate when no .env exists (create .env with real DATABASE_URL for runtime)
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://localhost:5432/ugkted_dev?schema=public'
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
