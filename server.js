import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import apiRoutes from "./routes/apiRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Simple CORS using FRONTEND_URL from env
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api", apiRoutes);
app.use("/history", historyRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Testing Tool Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
