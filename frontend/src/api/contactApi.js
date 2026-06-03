import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL?.trim() || "";
const API_URL = baseUrl
  ? baseUrl.endsWith("/api")
    ? baseUrl
    : `${baseUrl.replace(/\/$/, "")}/api`
  : "/api";

const api = axios.create({
  baseURL: API_URL,
});

export const submitContactForm = (formData) => api.post("/contact", formData);

export const getContactMessages = () => api.get("/contact");
