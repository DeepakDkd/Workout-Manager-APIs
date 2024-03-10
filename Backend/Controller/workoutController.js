import mongoose from "mongoose";
import { workout } from "../Models/workoutModel.js";

//get all workout
const getWorkouts = async (req, res) => {
  try {
    const workouts = await workout.find({}).sort({ createdAt: -1 });
    if (workouts.length === 0) {
      return res.status(404).json({ message: "No workouts found" });
    }
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get single one workout
const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Id" });
    }
    const workoutItem = await workout.findById(id);
    if (!workoutItem) {
      return res.status(404).json({ error: "workout not found" });
    }
    res.status(200).json(workoutItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// post a workout
const postWorkout = async (req, res) => {
  try {
    const { title, loads, reps } = req.body;
    let emptyFields = []
    if(!title){
      emptyFields.push("title") 
    }
    if(!loads){
      emptyFields.push("loads")
    }
    if(!reps){
      emptyFields.push("reps")
    }
    if(emptyFields.length > 0 ){
      return res.status(400).json({ error : "Please fill in all the fields", emptyFields})
    }
    const newWorkout = await workout.create({ title, loads, reps });
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await workout.findByIdAndDelete({ _id: id });
    if (!deleted) {
      return res.status(404).json({ error: "workout not found" });
    }
    res.status(200).json(deleted);
  } catch (error) {
    res.status(400).json({ error: "Could not delete the workout" });
  }
};

// update a workout
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const item = await workout.findOneAndUpdate(
      { _id: id },
      { ...updates },
      { new: true }
    );
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getWorkouts, getWorkout, postWorkout, deleteWorkout, updateWorkout };
