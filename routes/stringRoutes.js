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
router.get("/strings", getAllStrings);
router.get("/strings/filter-by-natural-language", filterByNaturalLanguage);
router.get("/strings/:string_value", getStringByValue);
router.delete("/strings/:string_value", deleteStringByValue);


export default router;
