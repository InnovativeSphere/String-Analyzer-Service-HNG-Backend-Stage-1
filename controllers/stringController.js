import crypto from "crypto";

// Temporary in-memory storage (reset when server restarts)
const storedStrings = [];

// ✅ POST /strings → Analyze and store a string
export const analyzeString = (req, res) => {
  try {
    const { value } = req.body;

    if (!value || typeof value !== "string") {
      return res.status(400).json({ error: "A valid string value is required." });
    }

    // Check for duplicates
    const existing = storedStrings.find((s) => s.value === value);
    if (existing) {
      return res.status(409).json({ error: "String already exists." });
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

    storedStrings.push(analyzed);
    return res.status(201).json(analyzed);
  } catch (err) {
    console.error("Error analyzing string:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ GET /strings/:string_value → Fetch one string by its value
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

// ✅ GET /strings → Fetch all strings (with query filters)
export const getAllStrings = (req, res) => {
  try {
    let filtered = [...storedStrings];
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

// ✅ DELETE /strings/:string_value → Remove a stored string
export const deleteStringByValue = (req, res) => {
  try {
    const { string_value } = req.params;
    const index = storedStrings.findIndex((s) => s.value === string_value);

    if (index === -1) {
      return res.status(404).json({ error: "String not found." });
    }

    const deleted = storedStrings.splice(index, 1)[0];
    return res.status(200).json({
      message: "String deleted successfully.",
      deleted,
    });
  } catch (err) {
    console.error("Error deleting string:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ GET /strings/filter-by-natural-language
// Example: /strings/filter-by-natural-language?query=strings that are palindrome and length greater than 3
export const filterByNaturalLanguage = (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "A valid 'query' parameter is required." });
    }

    let filtered = [...storedStrings];
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("palindrome")) {
      filtered = filtered.filter((s) => s.properties.is_palindrome === true);
    }

    const greaterMatch = lowerQuery.match(/length (greater|more) than (\d+)/);
    if (greaterMatch) {
      const num = parseInt(greaterMatch[2]);
      filtered = filtered.filter((s) => s.properties.length > num);
    }

    const lessMatch = lowerQuery.match(/length (less|smaller) than (\d+)/);
    if (lessMatch) {
      const num = parseInt(lessMatch[2]);
      filtered = filtered.filter((s) => s.properties.length < num);
    }

    const equalMatch = lowerQuery.match(/length (equal|equals|exactly) (\d+)/);
    if (equalMatch) {
      const num = parseInt(equalMatch[2]);
      filtered = filtered.filter((s) => s.properties.length === num);
    }

    return res.status(200).json({
      data: filtered,
      count: filtered.length,
      query_interpreted: query,
    });
  } catch (err) {
    console.error("Error in natural language filter:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
