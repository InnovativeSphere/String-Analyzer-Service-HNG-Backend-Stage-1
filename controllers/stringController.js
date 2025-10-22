import crypto from "crypto";

// Temporary in-memory storage (reset when server restarts)
const storedStrings = [];

export const analyzeString = (req, res) => {
  try {
    const { value } = req.body;

    if (!value || typeof value !== "string") {
      return res.status(400).json({ error: "A valid string value is required." });
    }

    const isPalindrome = value === value.split("").reverse().join("");
    const uniqueChars = new Set(value).size;
    const wordCount = value.trim().split(/\s+/).length;

    const frequencyMap = {};
    for (const char of value) {
      frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }

    const sha256 = crypto.createHash("sha256").update(value).digest("hex");

    const analyzed = {
      id: sha256,
      value,
      properties: {
        length: value.length,
        is_palindrome: isPalindrome,
        unique_characters: uniqueChars,
        word_count: wordCount,
        sha256_hash: sha256,
        character_frequency_map: frequencyMap,
      },
      created_at: new Date().toISOString(),
    };

    // Store temporarily
    storedStrings.push(analyzed);

    return res.status(201).json(analyzed);
  } catch (err) {
    console.error("Error analyzing string:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /strings/:string_value
export const getStringByValue = (req, res) => {
  try {
    const { string_value } = req.params;
    const found = storedStrings.find((s) => s.value === string_value);

    if (!found) {
      return res.status(404).json({ error: "String not found." });
    }

    return res.status(200).json(found);
  } catch (err) {
    console.error("Error fetching string:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ NEW: GET /strings (fetch all, with optional filters)
export const getAllStrings = (req, res) => {
  try {
    let filtered = [...storedStrings];

    // Extract filters from query params
    const { is_palindrome, min_length, max_length } = req.query;

    const filtersApplied = {};

    if (is_palindrome !== undefined) {
      const boolVal = is_palindrome === "true";
      filtered = filtered.filter(
        (item) => item.properties.is_palindrome === boolVal
      );
      filtersApplied.is_palindrome = boolVal;
    }

    if (min_length) {
      filtered = filtered.filter(
        (item) => item.properties.length >= Number(min_length)
      );
      filtersApplied.min_length = Number(min_length);
    }

    if (max_length) {
      filtered = filtered.filter(
        (item) => item.properties.length <= Number(max_length)
      );
      filtersApplied.max_length = Number(max_length);
    }

    return res.status(200).json({
      data: filtered,
      count: filtered.length,
      filters_applied: filtersApplied,
    });
  } catch (err) {
    console.error("Error fetching strings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
