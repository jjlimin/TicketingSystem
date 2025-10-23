import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
    baseURL: `${API_URL}`
});

export const createEvent = (data) => API.post("/events", data);
export const getEvent = () => API.get("/events");
export const exportAttendees = (eventId) => API.get(`/events/${eventId}/export`, {responseType: "blob"});

export const registerUser = (eventId, data) => API.post(`/registrations/${eventId}`, data);
export const scanTicket = (qrCode) => API.post("/registrations/scan", {qrCode});