import { Router } from "express";
import { 

    createStreakZone, 
    getStreakZones,
} from "../controllers/streakZone.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file




// secured routes
router.route("/createStreakZone").post(verifyJWT,  createStreakZone)
router.route("/getStreakZones").get(verifyJWT, getStreakZones)


export default router