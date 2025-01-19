import express from"express";
import {checkStudentName, registerUser} from "../controllers/authControllers.js";

const router=express.Router();

router.post("/register", registerUser);

router.post("/check-student-details", checkStudentName);


export default router;