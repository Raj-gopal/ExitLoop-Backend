
import { Router } from "express";
import {
  createOrUpdateProZone,
  getProZoneByUserId,
  deleteProZoneByUserId,
} from "../controllers/proZone.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ Protect all routes
router.use(verifyJWT);

// ✅ Routes
router.route("/:userId/createOrUpdateProZone").post(createOrUpdateProZone);
router.route("/:userId/getProZone").get(getProZoneByUserId);
router.route("/:userId/deleteProZone").delete(deleteProZoneByUserId);

export default router;
