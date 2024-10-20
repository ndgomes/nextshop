import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  APP_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(
    `❌ Invalid environment variables: ${parsedEnv.error.issues}`
  );
}

export const env = parsedEnv.data;
