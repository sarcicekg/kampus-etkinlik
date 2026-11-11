// Express Server Configuration - Sprint 7git add backend/src/server.js
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API http://localhost:${PORT}`);
});