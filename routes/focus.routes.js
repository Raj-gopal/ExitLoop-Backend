import { Router } from "express";
import {
  createOrUpdateFocus,
  getFocus,
  deleteFocus,
} from "../controllers/focus.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();


// ✅ Create or Update Focus for a user
router.route("/:userId/createOrUpdateFocus").post(verifyJWT,createOrUpdateFocus);

// ✅ Get Focus by userId
router.route("/:userId/getFocus").get(verifyJWT,getFocus);

// ✅ Delete Focus by userId
router.route("/:userId/deleteFocus").delete(verifyJWT,deleteFocus);

export default router;
