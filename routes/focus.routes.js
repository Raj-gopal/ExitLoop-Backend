import express from "express";
import {
  createOrUpdateFocus,
  getFocus,
  deleteFocus,
} from "../controllers/focus.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.use(verifyJWT);


// ✅ Create or Update Focus for a user
router.route("/:userId/createOrUpdateFocus").post(createOrUpdateFocus);

// ✅ Get Focus by userId
router.route("/:userId/getFocus").get(getFocus);

// ✅ Delete Focus by userId
router.route("/:userId/deleteFocus").delete(deleteFocus);

export default router;
