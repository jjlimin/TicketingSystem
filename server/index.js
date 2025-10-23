import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: ["https://ticketing-system-ten.vercel.app/"],
    methods: ["GET", "POST"],
    credentials: true,
  }));
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is running..."));

// mongodb+srv://jjlimin:wPrYafqbSj3BzsWr@cluster.ldaw7f9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster