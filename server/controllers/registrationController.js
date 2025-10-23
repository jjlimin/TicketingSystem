import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import QRCode from "qrcode";

export const registerUser = async (req, res) => {
    const { eventId } = req.params;
    const { name, email } = req.body;

    const qrData = `${eventId}-${email}-${Date.now()}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const registration = new Registration({eventId, name, email, qrCode});
    await registration.save();

    await Event.findByIdAndUpdate(eventId, { $inc: { attendeesCount: 1 } });

    res.json({success: true, qrCode});
};

export const scanTicket = async (req, res) => {
    const {prCode} = req.Body;
    const registration = await Registration.findOne({qrCode});
    if (!registration) {
        return res.status(404).json({message: "Ticket not found..."});
    }

    registration.checkedIn = true;
    await registration.save();

    res.json({success: true, message: `${registration.name} checked in`});
}