import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import session from "express-session";
import helmet from "helmet";
import { appConfig } from "./config/app.config.js";
import { corsOptions } from "./config/cors.config.js";
import { env, isProd } from "./config/env.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { apiRateLimiter } from "./middlewares/rate-limit.middleware.js";
import routes from "./routes/index.js";

/**
 * Answers "how is Express configured?" — never "how does a client's
 * business process work?" That belongs in services/.
 */
export function createApp(): Express {
  const app = express();

  // --- security / basic middleware ---
  app.use(helmet());
  app.disable("x-powered-by");
  app.use(apiRateLimiter);

  // --- body & cookie parsing ---
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // --- CORS ---
  app.use(cors(corsOptions));

  // --- sessions ---
  app.use(
    session({
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: appConfig.session.cookieMaxAgeMs,
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
      },
    })
  );

  // --- routes ---
  app.use("/api", routes);

  // --- 404 + central error handler (must be last, in this order) ---
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
