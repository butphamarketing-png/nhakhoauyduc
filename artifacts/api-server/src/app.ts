import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

function getErrorDetails(err: unknown) {
  if (!(err instanceof Error)) {
    return { message: "Internal Server Error" };
  }

  const cause = err.cause;
  const causeRecord =
    cause && typeof cause === "object" ? (cause as Record<string, unknown>) : null;

  return {
    message: err.message,
    cause:
      cause instanceof Error
        ? cause.message
        : causeRecord?.["message"] ?? null,
    code: causeRecord?.["code"] ?? null,
    detail: causeRecord?.["detail"] ?? null,
  };
}

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api", router);
app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    logger.error({ err }, "Unhandled API error");
    res.status(500).json({ error: getErrorDetails(err) });
  },
);

export default app;
