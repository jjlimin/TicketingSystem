import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    eventId: {type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    name: String,
    email: String,
    qrCode: String,
    checkedIn: { type: Boolean, default: false },
    timestamp: {type: Date, default: Date.now },
    description: String,
    date: Date,
    location: String,
    registrationLink: String,
    attendeesCount: { type: Number, default: 0 }
});

export default mongoose.model("Registration", registrationSchema);