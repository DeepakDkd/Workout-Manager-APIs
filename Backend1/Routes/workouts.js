import express from "express"
import { getWorkouts , getWorkout, postWorkout, deleteWorkout, updateWorkout} from "../Controller/workoutController.js";
const router = express.Router();


router.get("/", getWorkouts)

router.get("/:id", getWorkout )

router.post("/", postWorkout)

router.delete("/:id", deleteWorkout)

router.patch("/:id", updateWorkout)

export default router;