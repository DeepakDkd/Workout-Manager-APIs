import mongoose from "mongoose";

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title:{
        type:String,
        required : true
    },
    reps :{
        type:Number,
        required:true
    },
    loads:{
        type:Number,    
        required:true
    }
}, { timestamps: true });

export const  workout = mongoose.model( "Workout", workoutSchema);
