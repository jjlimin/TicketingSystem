import express from "express"
import {registerUser, scanTicket } from "../controllers/registrationController.js";

const router = express.Router();

router.post("/:eventId", registerUser);
router.post("/scan", scanTicket);

export default router;