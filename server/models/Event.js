import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    location: String,
    registrationLink: String,
    attendeesCount: { type: Number, default: 0 }
});

export default mongoose.model("Event", eventSchema);