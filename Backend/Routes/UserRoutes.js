import { Router } from "express";
import { loginUser, signUpUser ,getUser} from "../Controller/UserController.js";
const router = Router();

router.post("/login", loginUser);

router.post("/signup", signUpUser);

router.get("/getuser", getUser);

export default router;
