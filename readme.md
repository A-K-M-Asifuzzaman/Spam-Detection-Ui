# SpamShield — ML Spam Detection

A real-time spam classifier built as a full-stack ML portfolio project. The frontend is a React SPA; the backend is a Python REST API powered by a Naive Bayes + TF-IDF model trained on the SMS Spam Collection dataset.

![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?style=flat-square&logo=fastapi)
![scikit-learn](https://img.shields.io/badge/scikit--learn-ML-orange?style=flat-square&logo=scikit-learn)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square)

**Live API:** https://spam-detection-e1hd.onrender.com

---

## Overview

The model is trained on the UCI SMS Spam Collection dataset (~5,500 labelled messages). Text is preprocessed and vectorized with TF-IDF; a Multinomial Naive Bayes classifier then predicts the label. Accuracy on the held-out test set is approximately 98%.

The React frontend calls the `/predict` endpoint on every submission and displays an immediate verdict.

---

## Tech Stack

| Layer     | Technology                            |
|-----------|---------------------------------------|
| Frontend  | React 18, Vite, Lucide React, CSS3    |
| Backend   | Python, FastAPI, Uvicorn              |
| ML        | scikit-learn (TF-IDF + Naive Bayes)   |
| NLP       | NLTK (tokenization, stopwords)        |
| Deploy    | Render (API), static hosting (UI)     |

---

## Project Structure

```
Spam-Detection-Ui/       # React frontend
├── src/
│   ├── App.jsx          # Main component & API integration
│   ├── App.css          # Component styles
│   ├── index.css        # Global styles & font import
│   └── main.jsx         # Entry point
├── index.html
├── vite.config.js
└── package.json
```

The backend repository contains the model training notebook, serialized model artifacts, and the FastAPI server.

---

## Getting Started

### Prerequisites

- Node.js v16+
- npm

### Run locally

```bash
git clone https://github.com/zasif855/spam-detection.git
cd spam-detection/Spam-Detection-Ui

npm install
npm run dev
```

The app starts at `http://localhost:5173`.

By default, the frontend points at the hosted API. To use a local backend, change the `API_URL` constant in `src/App.jsx`:

```js
const API_URL = 'http://localhost:8000';
```

### Build for production

```bash
npm run build   # outputs to dist/
```

---

## API Reference

Base URL: `https://spam-detection-e1hd.onrender.com`

### GET `/`

Health check.

```json
{ "message": "Spam Detection API Running!" }
```

### POST `/predict`

Classify a message.

**Request**
```json
{ "text": "Congratulations, you've won a free prize! Click here." }
```

**Response**
```json
{ "spam": true }
```

---

## Sample Messages

**Spam**
```
Congratulations! You've won $1,000,000. Claim your prize now.
URGENT: Your account has been suspended. Reply with your password.
Make $500/day working from home — limited spots available!
```

**Legitimate**
```
Hey, are we still on for coffee tomorrow at 3pm?
The project deadline has been moved to next Friday.
Can you send me the slides from today's meeting?
```

---

## Environment Variables

To configure the API URL via an env file instead of hardcoding it:

```env
# .env
VITE_API_URL=https://spam-detection-e1hd.onrender.com
```

```js
// src/App.jsx
const API_URL = import.meta.env.VITE_API_URL;
```

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

Built by **Asif Zaman**
