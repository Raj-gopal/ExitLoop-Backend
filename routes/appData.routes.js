import { Router } from "express";
import {
  createOrUpdateAppData,
  getAppData,
  updateAppEntry,
  deleteAppEntry,
} from "../controllers/appData.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


// secured routes (userId in params)
router.route("/:userId/createOrUpdateAppData").post(verifyJWT,createOrUpdateAppData);
router.route("/:userId/getAppData").get(verifyJWT,getAppData);
router.route("/:userId/updateAppEntry").put(verifyJWT,updateAppEntry);
router.route("/:userId/deleteAppEntry").delete(verifyJWT,deleteAppEntry);

export default router;
