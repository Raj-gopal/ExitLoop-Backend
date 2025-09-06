import express from "express";
import {
  createPeakCal,
  getPeakCal,
  updatePeakCal,
  deletePeakCal,
} from "../controllers/peakCal.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.use(verifyJWT);


// Create (userId in params)
router.route("/:userId/createPeakCal").post(verifyJWT, createPeakCal);

// Get by userId
router.route("/:userId/getPeakCal").get(verifyJWT, getPeakCal);

// Update by userId
router.route("/:userId/updatePeakCal").put(verifyJWT, updatePeakCal);

// Delete by userId
router.route("/:userId/deletePeakCal").delete(verifyJWT, deletePeakCal);

export default router;