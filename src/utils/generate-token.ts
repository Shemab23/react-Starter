import { randomBytes, randomUUID } from "node:crypto";

/** A URL-safe random token, e.g. for password resets or invite links. */
export function generateToken(bytes = 32): string {
  return randomBytes(bytes).toString("hex");
}

/** A standard UUID v4, e.g. for public-facing resource IDs. */
export function generateId(): string {
  return randomUUID();
}
