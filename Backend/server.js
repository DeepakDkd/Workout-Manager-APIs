import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import workouts from "./Routes/workouts.js";
import mongoose from "mongoose";
import userRoutes from "./Routes/UserRoutes.js"

dotenv.config();

//express app
const app = express();


// middleware
app.use(express.json());

app.use(cors({ origin: "*",
credentials: true,
optionsSuccessStatus: 200,
preflightContinue: false,
methods: "GET,HEAD,PUT,PATCH,POST,DELETE",})); //enable CORS for all requests

app.use("/api/workouts", workouts);//routes
app.use('/api/user', userRoutes)



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
