import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import cors from "cors";

import { errorHandler, notFound } from "./middlewares/error.middleware";

import riskOwnerRoutes from "./routes/riskOwner.routes";

const app = express();
dotenv.config();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/risk-owners", riskOwnerRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Full Stack Developer Test");
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
