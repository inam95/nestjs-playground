import { z } from 'zod';

const baseSchema = z.object({
  PORT: z.coerce
    .number()
    .int()
    .positive()
    .describe('The port the application will run on'),
  APP_NAME: z.string().describe('The name of the application'),
  NODE_ENV: z
    .enum(['development', 'production'])
    .default('development')
    .describe('The environment the application is running in'),
  DATABASE_URL: z.string().url().describe('The URL of the database'),
});

const devSchema = baseSchema.extend({
  NODE_ENV: z.literal('development'),
  LOG_QUERIES: z.coerce.boolean().describe('Log all queries'),
});

const prodSchema = baseSchema.extend({
  NODE_ENV: z.literal('production'),
  SENTRY_DSN: z.string().url().describe('The Sentry DSN'),
});

export const envSchema = z.discriminatedUnion('NODE_ENV', [
  devSchema, // NODE_ENV === 'development'
  prodSchema, // NODE_ENV === 'production'
]);

export type TEnv = z.infer<typeof envSchema>;
