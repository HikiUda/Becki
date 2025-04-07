import { z } from 'zod';

const EnvScheme = z.object({
    DATABASE_URL: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
});

export function validateEnv(config: Record<string, unknown>) {
    const validatedConfig = EnvScheme.parse(config);
    return validatedConfig;
}
