import express from "express";
import {
  analyzeString,
  getStringByValue,
  getAllStrings, 
} from "../controllers/stringController.js";

const router = express.Router();

router.post("/strings", analyzeString);

router.get("/strings/:string_value", getStringByValue);

router.get("/strings", getAllStrings); 

export default router;
