# 🧠 String Analyzer Service — HNG Backend Stage 1
A RESTful API service that analyzes strings and stores their computed properties.
Built with **Node.js**, **Express**, and **ES Modules**, this service temporarily stores analyzed strings while the server runs.

---

## 🚀 Features

For each analyzed string, the API computes and returns the following:

| Property                    | Description                                              |
| --------------------------- | -------------------------------------------------------- |
| **length**                  | Number of characters in the string                       |
| **is_palindrome**           | `true` if the string reads the same forward and backward |
| **unique_characters**       | Count of distinct characters                             |
| **word_count**              | Number of words separated by whitespace                  |
| **sha256_hash**             | Unique hash for identifying the string                   |
| **character_frequency_map** | Object mapping each character to its count               |

---

## ⚙️ Tech Stack

- **Node.js** — Runtime environment
- **Express.js** — Web framework
- **Dotenv** — Environment variable management
- **Nodemon** — Development server auto-restart

---

## 📦 Installation and Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2️⃣ Install Dependencies

```bash
npm install express dotenv nodemon
```

### 3️⃣ Create a `.env` File

```bash
PORT=5000
```

### 4️⃣ Run the Server

Development mode (auto-restart):

```bash
npm run dev
```

or manual start:

```bash
node server.js
```

The server runs at:
👉 **[http://localhost:5000](http://localhost:5000)**

---

## 🧩 API Endpoints

### 1️⃣ Create / Analyze a String

**POST** `/strings`

#### Request Body

```json
{
  "value": "racecar"
}
```

#### Success Response — `201 Created`

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

### 2️⃣ Get a Specific String

**GET** `/strings/:string_value`

#### Example

`GET http://localhost:5000/strings/racecar`

#### Success Response — `200 OK`

```json
{
  "id": "e00f9ef51a95f6e854862eed28dc0f1a68f154d9f75ddd841ab00de6ede9209b",
  "value": "racecar",
  "properties": {
    /* ... */
  },
  "created_at": "2025-10-21T15:50:34.723Z"
}
```

#### Error Response

- `404` — String not found

---

### 3️⃣ Get All Strings (with Filters)

**GET** `/strings`

#### Example Query

```
GET /strings?is_palindrome=true&min_length=5
```

#### Success Response — `200 OK`

```json
{
  "data": [
    {
      "id": "e00f9ef51a95f6e854862eed28dc0f1a68f154d9f75ddd841ab00de6ede9209b",
      "value": "racecar",
      "properties": {
        /* ... */
      },
      "created_at": "2025-10-21T15:58:45.899Z"
    },
    {
      "id": "12e90b8e74f20fc0a7274cff9fcbae14592db12292757f1ea0d7503d30799fd2",
      "value": "poop",
      "properties": {
        /* ... */
      },
      "created_at": "2025-10-21T17:33:09.407Z"
    }
  ],
  "count": 2,
  "filters_applied": {
    "is_palindrome": true,
    "min_length": 5
  }
}
```

#### Error Response

- `400` — Invalid query parameter(s)

#### Success Response

`204 No Content`

#### Error Response

- `404` — String not found

---

## 🗄️ Data Persistence

- Strings are stored **temporarily in memory** (cleared when the server restarts).
- No database used for Stage 1, per task requirements.

---

## 🧰 Project Structure

```
📦 string-analyzer-api
 ┣ 📂 controllers
 ┃ ┗ 📜 stringController.js
 ┣ 📂 routes
 ┃ ┗ 📜 stringRoutes.js
 ┣ 📜 server.js
 ┣ 📜 .env
 ┣ 📜 package.json
 ┗ 📜 README.md
```

---

## 📚 Example Usage (via cURL)

```bash
# Create a string
curl -X POST http://localhost:5000/strings \
     -H "Content-Type: application/json" \
     -d '{"value":"racecar"}'

# Get all palindromic strings longer than 5 characters
curl "http://localhost:5000/strings?is_palindrome=true&min_length=5"
```

## 👤 Author

**Name:** Salim Sambo
**Email:** 004sas@gmail.com
**HNG-13 — Backend Wizards Stage 1**
