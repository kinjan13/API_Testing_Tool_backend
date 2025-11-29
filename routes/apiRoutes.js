import express from "express";
import { testRequest } from "../controllers/apiController.js";

const router = express.Router();

router.post("/test-request", testRequest);

export default router;
