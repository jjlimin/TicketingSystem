import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import ExcelJS from 'exceljs';

export const createEvent = async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    event.registrationLink = `/register/${event._id}`;
    await event.save();
    res.json(event);
};

export const getEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
};

export const exportAttendees = async (req, res) => {
    const {eventId} = req.params;
    const registrations = await Registration.find({eventId});

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(`${Event.name} Attendees`);

    sheet.columns = [
        {header: "Name", key: "name", width: 25},
        {header: "Email", key: "email", width: 30},
        {header: "Checked In", key: "checkedIn", width: 15},
        {header: "Registered At", key: "timestamp", width: 20},
    ];

    registrations.forEach(registration => { sheet.addRow(registration) });

    res.setHeader("Content-Disposition", "attachment; filename=attendees.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    await workbook.xlsx.write(res);
    res.end();
};