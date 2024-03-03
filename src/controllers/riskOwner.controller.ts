import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import RiskOwner from "../models/riskOwner.schema";
import { RiskOwnerAttributes, RiskOwnerDocument } from "../types/RiskOwner";

/**
 * Get all risk owners.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns {Promise<void>} - Resolves to an array of RiskOwnerDocuments.
 */
export const getAllRiskOwners = asyncHandler(async (req: Request, res: Response) => {
  const riskOwners: RiskOwnerDocument[] = await RiskOwner.find({});
  res.json(riskOwners);
});

/**
 * Create a new risk owner.
 *
 * @param req - Express request object containing RiskOwnerAttributes in the request body.
 * @param res - Express response object.
 * @returns {Promise<void>} - Resolves to a JSON response indicating the success of the operation.
 */
export const createRiskOwner = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, title, role }: RiskOwnerAttributes = req.body;
  const riskOwnerExists: RiskOwnerDocument = await RiskOwner.findOne({ email }).select("_id");

  if (riskOwnerExists) {
    res.status(400);
    throw new Error("Risk Owner already exists");
  }

  const riskOwner: RiskOwnerDocument = await RiskOwner.create({
    name,
    email,
    title,
    role
  });

  res.status(201).json({
    message: "Risk Owner Created Successfully",
    riskOwner,
  });
});

/**
 * Get a risk owner by ID.
 *
 * @param req - Express request object with the risk owner's ID as a parameter.
 * @param res - Express response object.
 * @returns {Promise<void>} - Resolves to a RiskOwnerDocument or throws an error if not found.
 */
export const getRiskOwnerById = asyncHandler(async (req: Request, res: Response) => {
  const riskOwner: RiskOwnerDocument | null = await RiskOwner.findById(req.params.id);

  if (riskOwner) {
    res.json(riskOwner);
  } else {
    res.status(404);
    throw new Error("Risk Owner not found");
  }
});

/**
 * Update an existing risk owner by ID.
 *
 * @param req - Express request object with the risk owner's ID as a parameter and RiskOwnerAttributes in the body.
 * @param res - Express response object.
 * @returns {Promise<void>} - Resolves to the updated RiskOwnerDocument or throws an error if not found.
 */
export const updateRiskOwner = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, title, role }: RiskOwnerAttributes = req.body;
  const riskOwnerId: string = req.params.id;
  
  const riskOwnerExists: RiskOwnerDocument | null = await RiskOwner.findOne({ email });

  if (riskOwnerExists && riskOwnerExists._id.toString() !== riskOwnerId){
    res.status(400);
    throw new Error("Risk Owner already exists");
  }

  const riskOwner: RiskOwnerDocument | null = await RiskOwner.findById(riskOwnerId);

  if (riskOwner) {
    riskOwner.name = name || riskOwner.name;
    riskOwner.email = email || riskOwner.email;
    riskOwner.title = title || riskOwner.title;
    riskOwner.role = role || riskOwner.role;

    const updatedRiskOwner: RiskOwnerDocument = await riskOwner.save();

    res.json(updatedRiskOwner);
  } else {
    res.status(404);
    throw new Error("Risk Owner not found");
  }
});

/**
 * Delete a risk owner by ID.
 *
 * @param req - Express request object with the risk owner's ID as a parameter.
 * @param res - Express response object.
 * @returns {Promise<void>} - Resolves to a JSON response indicating the success of the deletion or throws an error if not found.
 */
export const deleteRiskOwner = asyncHandler(async (req: Request, res: Response) => {
  const riskOwner: RiskOwnerDocument | null = await RiskOwner.findById(req.params.id);

  if (riskOwner) {
    await riskOwner.deleteOne();

    res.json({ message: "Risk Owner removed" });
  } else {
    res.status(404);
    throw new Error("Risk Owner not found");
  }
});
