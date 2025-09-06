
import { Router } from "express";
import {
  createOrUpdateProZone,
  getProZone,
  deleteProZone,
} from "../controllers/proZone.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();



// ✅ Routes
router.route("/:userId/createOrUpdateProZone").post(verifyJWT, createOrUpdateProZone);
router.route("/:userId/getProZone").get(verifyJWT, getProZone);
router.route("/:userId/deleteProZone").delete(verifyJWT, deleteProZone);

export default router;
