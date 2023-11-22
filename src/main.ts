import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

import todoRoutes from "./routes/todos";

// auth stuff
import authRoutes from "./routes/auth";

// require("crypto").randomBytes(64).toString("hex");

const app = express();

app.use(json());

app.use("/auth", authRoutes);

app.use("/todos", todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ messsage: err.message });
});

app.listen(3000);
