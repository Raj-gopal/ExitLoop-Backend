import { Router } from "express";
import { 

    createPeakZone, 
    getPeakZones,
    
} from "../controllers/peakZone.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file




// secured routes
router.route("/createPeakZone").post(verifyJWT,  createPeakZone)
router.route("/getPeakZones").get(verifyJWT, getPeakZones)
// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/change-password").post(verifyJWT, changeCurrentPassword)
// router.route("/current-user").get(verifyJWT, getCurrentUser)
// router.route("/update-account").patch(verifyJWT, updateAccountDetails)

export default router