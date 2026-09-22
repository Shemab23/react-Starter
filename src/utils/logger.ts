import { isDev } from "../config/env.js";

type Level = "info" | "warn" | "error" | "debug";

function timestamp(): string {
  return new Date().toISOString();
}

function write(level: Level, message: string): void {
  const line = `[${timestamp()}] [${level.toUpperCase()}] ${message}`;
  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  info: (message: string) => write("info", message),
  warn: (message: string) => write("warn", message),
  error: (message: string) => write("error", message),
  debug: (message: string) => {
    if (isDev) write("debug", message);
  },
};
