import { Router } from "express";
import { 

    createStreakDay, 
    getStreakDays,

} from "../controllers/streakDay.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file




// secured routes
router.route("/:streakZoneId/createStreakDay").post(verifyJWT,  createStreakDay)
router.route("/:streakZoneId/getStreakDays").get(verifyJWT, getStreakDays)


export default router