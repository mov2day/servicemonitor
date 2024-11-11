import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3001'),
  TEAMS_WEBHOOK_URL: z.string(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('❌ Invalid environment variables:', result.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = {
  port: parseInt(result.data.PORT, 10),
  teamsWebhookUrl: result.data.TEAMS_WEBHOOK_URL,
  isDevelopment: result.data.NODE_ENV === 'development',
  notificationCooldown: 30 * 60 * 1000, // 30 minutes
  defaultTimeout: 5000, // 5 seconds
} as const;