import express from "express";
import dotenv from "dotenv";
import stringRoutes from "./routes/stringRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 String Analyzer API is running successfully on Railway!",
    endpoints: {
      analyze_string: "/api/strings (POST)",
      get_all_strings: "/api/strings (GET)",
      get_string_by_value: "/api/strings/:string_value (GET)",
    },
  });
});

app.use("/", stringRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: "Please check your endpoint path or method.",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
