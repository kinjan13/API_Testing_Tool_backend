import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import apiRoutes from "./routes/apiRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// CORS configuration - allow development and production URLs
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002'
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
