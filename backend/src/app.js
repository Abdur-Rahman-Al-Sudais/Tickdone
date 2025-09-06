import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOrigin } from "./config/config.js";

import express from "express";
const app = express();

// middlewares
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes imports
import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";

// routes configuration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

// Error handler
app.use(errorMiddleware);

export { app };
