import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
  origin: "*",
  credentials: true
}));


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import peakZoneRouter from './routes/peakZone.routes.js'
import proZoneRouter from './routes/proZone.routes.js'
import streakZoneRouter from './routes/streakZone.routes.js'
import streakDayRouter from './routes/streakDay.routes.js'
import timeLimitRouter from './routes/timeLimit.routes.js'
import focusRouter from './routes/focus.routes.js'
import peakSessionRouter from './routes/peakSession.routes.js'
import usageSessionRouter from './routes/usageSession.routes.js'  
import peckCalRouter from './routes/peakCal.routes.js'
import noticationRouter from './routes/notification.routes.js'
import futureWhisperRouter  from "./routes/futureWhisper.routes.js";
import appDataRoutes  from "./routes/appData.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/users", peakZoneRouter)
app.use("/api/v1/users", proZoneRouter)
app.use("/api/v1/users", streakZoneRouter)
app.use("/api/v1/users/streakZones", streakDayRouter)
app.use("/api/v1/users", timeLimitRouter)
app.use("/api/v1/users", focusRouter)
app.use("/api/v1/users", peakSessionRouter)
app.use("/api/v1/users", usageSessionRouter)
app.use("/api/v1/users", peckCalRouter)
app.use("/api/v1/users", noticationRouter)
app.use("/api/v1/users/streakZones", futureWhisperRouter)
app.use("/api/v1/users", appDataRoutes)






// http://localhost:8000/api/v1/users/register

export { app }