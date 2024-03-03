import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

const validatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0]?.msg);
  }
  next();
};

export const createRiskOwnerValidations = [
  check("name").notEmpty().withMessage("Name cannot be empty"),
  check("email").notEmpty().withMessage("Email cannot be empty").isEmail().withMessage("Invalid email address"),
  check("role").notEmpty().withMessage("Role cannot be empty"),
  check("title").notEmpty().withMessage("Title cannot be empty"),

  validatorMiddleware,
];
