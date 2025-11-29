import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import apiRoutes from "./routes/apiRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Robust CORS configuration
// - Uses FRONTEND_URL from env when set
// - Allows a documented Vercel frontend fallback and localhost dev ports
// - Allows non-browser requests (no origin)
// - Returns a descriptive error when an origin is blocked
app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser tools (Postman/curl) with no origin
      if (!origin) return callback(null, true);

      const configured = (process.env.FRONTEND_URL || "").trim();
      const fallback = "https://api-testing-tool-frontend-umber.vercel.app";

      const allowedOrigins = new Set([
        configured,
        fallback,
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://127.0.0.1:3000'
      ].filter(Boolean));

      if (allowedOrigins.has(origin)) return callback(null, true);

      // allow any localhost:PORT pattern
      if (/^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return callback(null, true);

      const err = new Error(`CORS policy: origin '${origin}' is not allowed. Set FRONTEND_URL to allow it.`);
      return callback(err);
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
