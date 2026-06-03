import express from "express";
import {
  getContactMessages,
  submitContactForm,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/", getContactMessages);
router.post("/", submitContactForm);

export default router;
