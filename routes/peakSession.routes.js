import { Router } from "express";
import {
  createOrUpdateAppData,
  getAppData,
  updateAppEntry,
  deleteAppEntry,
} from "../controllers/peakSession.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file




// secured routes
router.route("/createAppData").post(verifyJWT,  createOrUpdateAppData)
router.route("/getAppData").get(verifyJWT, getAppData)
router.route("/updateAppEntry").put(verifyJWT, updateAppEntry)
router.route("/deleteAppEntry").delete(verifyJWT, deleteAppEntry)

export default router