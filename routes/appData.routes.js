import { Router } from "express";
import {
  createOrUpdateAppData,
  getAppData,
  updateAppEntry,
  deleteAppEntry,
} from "../controllers/appData.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Apply verifyJWT to all routes in this router
router.use(verifyJWT);

// secured routes (userId in params)
router.post("/:userId/create", createOrUpdateAppData);
router.get("/:userId", getAppData);
router.put("/:userId/update", updateAppEntry);
router.delete("/:userId/delete", deleteAppEntry);

export default router;
