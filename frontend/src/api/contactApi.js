import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

export const submitContactForm = (formData) => api.post("/contact", formData);

export const getContactMessages = () => api.get("/contact");
