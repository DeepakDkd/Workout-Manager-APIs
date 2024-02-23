import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./Routes/workouts.js";
import mongoose from "mongoose";

dotenv.config();

//express app
const app = express();


// middleware
app.use(express.json());

app.use(cors({ origin: "*" })); //enable CORS for all requests

app.use("/api/workouts", router);//routes



//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `connected to db & serve at http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
