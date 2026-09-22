/**
 * Application-level settings that aren't secrets and don't come from .env,
 * but should still live in one place instead of being scattered as magic
 * numbers across the codebase.
 */
export const appConfig = {
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // requests per window per IP
  },
  upload: {
    maxFileSizeBytes: 5 * 1024 * 1024, // 5 MB
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"],
  },
  session: {
    cookieMaxAgeMs: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  pagination: {
    defaultPage: 1,
    defaultLimit: 20,
    maxLimit: 100,
  },
} as const;
