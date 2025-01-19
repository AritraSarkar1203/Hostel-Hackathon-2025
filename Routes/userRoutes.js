import express from"express";
import {checkStudentName, registerUser,logoutUser} from "../controllers/authControllers.js";

const router=express.Router();

router.post("/register", registerUser);

router.post("/check-student-details", checkStudentName);

router.post('/logout', logoutUser);


export default router;