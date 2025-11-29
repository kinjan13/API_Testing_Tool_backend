import express from "express";
import { saveHistory, getHistory } from "../controllers/historyController.js";

const router = express.Router();

router.post("/save", saveHistory);
router.get("/get", getHistory);

export default router;
