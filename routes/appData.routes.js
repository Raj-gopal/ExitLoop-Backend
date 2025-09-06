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
router.route("/:userId/createOrUpdateAppData").post(createOrUpdateAppData);
router.route("/:userId/getAppData").get(getAppData);
router.route("/:userId/updateAppEntry").put(updateAppEntry);
router.route("/:userId/deleteAppEntry").delete(deleteAppEntry);

export default router;
