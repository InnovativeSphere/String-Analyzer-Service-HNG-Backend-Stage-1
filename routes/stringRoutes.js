import express from "express";
import {
  analyzeString,
  getStringByValue,
  getAllStrings,
  deleteStringByValue,
  filterByNaturalLanguage,
} from "../controllers/stringController.js";

const router = express.Router();

router.post("/strings", analyzeString);
router.get("/strings/:string_value", getStringByValue);
router.get("/strings", getAllStrings);
router.delete("/strings/:string_value", deleteStringByValue);
router.get("/strings/filter-by-natural-language", filterByNaturalLanguage);

export default router;
