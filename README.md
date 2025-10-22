# 🧠 String Analyzer Service — HNG Backend Stage 1

A RESTful API that analyzes strings and returns detailed computed properties.
Built using **Node.js**, **Express**, and **ES Modules**, this service temporarily stores analyzed strings in memory while the server is running (no database required for Stage 1).

---

## 🚀 Features

For every submitted string, the API computes and returns:

| Property                    | Description                                              |
| --------------------------- | -------------------------------------------------------- |
| **length**                  | Number of characters in the string                       |
| **is_palindrome**           | `true` if the string reads the same backward and forward |
| **unique_characters**       | Count of distinct characters                             |
| **word_count**              | Number of words separated by whitespace                  |
| **sha256_hash**             | Unique hash identifier for the string                    |
| **character_frequency_map** | Object showing the frequency of each character           |

---

## ⚙️ Tech Stack

* **Node.js** — JavaScript runtime
* **Express.js** — Web framework
* **Dotenv** — Environment variable loader
* **Nodemon** — Dev server with live reload

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2️⃣ Install Dependencies

```bash
npm install express dotenv nodemon
```

### 3️⃣ Create `.env` File

```bash
PORT=5000
```

### 4️⃣ Run the Server

Development mode (auto restart):

```bash
npm run dev
```

Manual start:

```bash
node server.js
```

Server runs at:
👉 [http://localhost:5000](http://localhost:5000)

---

## 🧩 API Endpoints

### 1️⃣ **POST /strings** — Analyze a string

**Request Body:**

```json
{
  "value": "racecar"
}
```

**Responses:**
✅ `201 Created`

```json
{
  "id": "e00f9ef51a95f6e854862eed28dc0f1a68f154d9f75ddd841ab00de6ede9209b",
  "value": "racecar",
  "properties": {
    "length": 7,
    "is_palindrome": true,
    "unique_characters": 4,
    "word_count": 1,
    "sha256_hash": "e00f9ef51a95f6e854862eed28dc0f1a68f154d9f75ddd841ab00de6ede9209b",
    "character_frequency_map": {
      "r": 2,
      "a": 2,
      "c": 2,
      "e": 1
    }
  },
  "created_at": "2025-10-21T15:50:34.723Z"
}
```

❌ `400` — Missing or invalid string
❌ `409` — String already exists

---

### 2️⃣ **GET /strings/:string_value** — Get a specific string

Example:

```
GET http://localhost:5000/strings/racecar
```

✅ `200 OK`
Returns the stored string and its properties.
❌ `404` — String not found

---

### 3️⃣ **GET /strings** — Retrieve all strings (with optional filters)

Example Query:

```
GET /strings?is_palindrome=true&min_length=5
```

✅ `200 OK`

```json
{
  "data": [
    {
      "value": "racecar",
      "properties": { "length": 7, "is_palindrome": true }
    },
    {
      "value": "poop",
      "properties": { "length": 4, "is_palindrome": true }
    }
  ],
  "count": 2,
  "filters_applied": {
    "is_palindrome": true,
    "min_length": 5
  }
}
```

---

### 4️⃣ **DELETE /strings/:string_value** — Delete a stored string

Example:

```
DELETE http://localhost:5000/strings/racecar
```

✅ `200 OK`

```json
{
  "message": "String deleted successfully.",
  "deleted": {
    "value": "racecar",
    "id": "e00f9ef51a95..."
  }
}
```

❌ `404` — String not found

---

### 5️⃣ **GET /strings/filter-by-natural-language** — Filter using natural language

Example:

```
GET /strings/filter-by-natural-language?query=strings that are palindrome and length greater than 3
```

✅ `200 OK`

```json
{
  "data": [
    { "value": "racecar", "properties": { "is_palindrome": true, "length": 7 } }
  ],
  "count": 1,
  "query_interpreted": "strings that are palindrome and length greater than 3"
}
```

❌ `400` — Missing or invalid query parameter

---

## 🗄️ Data Storage

* Data is stored **temporarily in memory**.
* It resets each time the server restarts.
* No database connection required for this stage.

---

## 🧰 Project Structure

```
📦 string-analyzer-service
 ┣ 📂 controllers
 ┃ ┗ 📜 stringController.js
 ┣ 📂 routes
 ┃ ┗ 📜 stringRoutes.js
 ┣ 📜 server.js
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 package.json
 ┗ 📜 README.md
```

---

## 🌐 Live Deployment

✅ **Base URL (Railway):**
**[https://string-analyzer-service-hng-backend-stage-1-production.up.railway.app](https://string-analyzer-service-hng-backend-stage-1-production.up.railway.app)**

| Method | Endpoint                              | Example                                                                                           |
| ------ | ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| POST   | `/strings`                            | `/strings`                                                                                        |
| GET    | `/strings/:string_value`              | `/strings/racecar`                                                                                |
| GET    | `/strings`                            | `/strings?is_palindrome=true`                                                                     |
| DELETE | `/strings/:string_value`              | `/strings/racecar`                                                                                |
| GET    | `/strings/filter-by-natural-language` | `/strings/filter-by-natural-language?query=strings that are palindrome and length greater than 3` |

---

## 📚 Example Usage (via cURL)

```bash
# Create a string
curl -X POST https://string-analyzer-service-hng-backend-stage-1-production.up.railway.app/strings \
     -H "Content-Type: application/json" \
     -d '{"value":"racecar"}'

# Fetch all strings that are palindromes
curl "https://string-analyzer-service-hng-backend-stage-1-production.up.railway.app/strings?is_palindrome=true"

# Natural language query
curl "https://string-analyzer-service-hng-backend-stage-1-production.up.railway.app/strings/filter-by-natural-language?query=strings that are palindrome and length greater than 3"

# Delete a string
curl -X DELETE https://string-analyzer-service-hng-backend-stage-1-production.up.railway.app/strings/racecar
```

---

## 👤 Author

**Name:** Salim Sambo
**Email:** [004sas@gmail.com](mailto:004sas@gmail.com)
**Track:** Backend (Node.js)
**Stage:** HNG 13 — Stage 1

