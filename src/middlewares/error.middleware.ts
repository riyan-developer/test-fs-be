import { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // console.log(err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message.replace("Error: ", ""),
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

