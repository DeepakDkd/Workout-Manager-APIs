import express from "express"
    import { getWorkouts , getWorkout, postWorkout, deleteWorkout, updateWorkout} from "../Controller/workoutController.js";
const router = express.Router();


router.get("/", getWorkouts)

router.get("/:id", getWorkout )

router.post("/", postWorkout)

router.patch("/:id", updateWorkout)

router.delete("/:id", deleteWorkout)

export default router;