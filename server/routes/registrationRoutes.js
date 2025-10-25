import express from "express"
import {registerUser, scanTicket } from "../controllers/registrationController.js";

const router = express.Router();

router.post("/scan", scanTicket);
router.post("/:eventId", registerUser);


export default router;