import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

// Middleware'ler
app.use(cors());
app.use(express.json());

// ADIM 4: Health-check endpoint'i
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2221032076",
  });
});

// ADIM 7: Event Route Bağlantısı
app.use("/events", eventRoutes);

// Tanımsız adresler için 404 handler
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;