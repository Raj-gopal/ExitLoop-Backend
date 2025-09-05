import { Router } from "express";
import { 

    createTimeLimit, 
    getTimeLimits,
    
} from "../controllers/timeLimit.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file




// secured routes
router.route("/:userId/createTimeLimit").post(verifyJWT,  createTimeLimit)
router.route("/:userId/getTimeLimits").get(verifyJWT, getTimeLimits)



export default router