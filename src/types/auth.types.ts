/**
 * Minimal shape a logged-in user's session carries. Extend this (role,
 * permissions, etc.) once the project's `users` table is designed —
 * keep it in sync with database/schema/users.schema.ts at that point.
 */
export interface SessionUser {
  id: number;
  email: string;
}
