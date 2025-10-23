import express from "express"
import {createEvent, getEvents, exportAttendees } from "../controllers/eventController.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:eventId/export", exportAttendees);

export default router;