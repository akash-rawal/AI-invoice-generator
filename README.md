# AI Invoice Generator & Dashboard Insights

An AI-powered web application for managing invoices, extracting invoice details from raw text, generating personalized payment reminder emails, and providing actionable dashboard insights using AI models.

## Key Features

- **AI Invoice Parser**: Extract client name, email, address, items, quantities, and prices directly from unstructured raw text.
- **AI-Powered Reminders**: Generate professional and polite payment reminder emails customized with specific invoice details.
- **Dashboard Financial Insights**: Receive encouraging, actionable analysis of total revenue, outstanding amounts, and payment trends.
- **Smart AI Fallback Engine**:
  - **Primary**: Runs using **Groq API** (llama-3.1-8b-instant) for ultra-fast completions.
  - **Fallback**: Automatically falls back to **Google Gemini API** (gemini-2.0-flash) if Groq encounters any issues or limits.
- **User Authentication**: Secure JWT-based authentication.
- **Single Page App Routing**: Complete SPA routing optimized with vercel.json rewrites for Vercel deployment.

---

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **AI Integration**: Groq Cloud Developer API & Google Generative AI (@google/generative-ai)
- **Security**: JSON Web Tokens (JWT) & bcryptjs

### Frontend

- **Framework**: React 19 (Vite bundler)
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Icons & Toast Notifications**: Lucide React & React Hot Toast
- **HTTP Client**: Axios

---

## Project Structure

```text
AI_INVOICE_GENERATOR/
├── backend/                  # Express API Server
│   ├── config/               # Database connection settings
│   ├── controllers/          # Business logic (AI extraction, email generation, CRUD)
│   ├── middlewares/          # JWT and Auth middleware
│   ├── models/               # MongoDB models (User, Invoice)
│   ├── routes/               # API endpoints (/api/auth, /api/invoices, /api/ai)
│   ├── server.js             # Server entrypoint
│   └── .env                  # Backend environment variables
│
└── frontend/
    └── invoice-generator/    # Vite + React + Tailwind v4 Client
        ├── src/
        │   ├── components/   # UI components
        │   ├── utils/        # Axios & Route helpers
        │   ├── index.css     # CSS with Tailwind v4 setup
        │   └── main.jsx      # React entrypoint
        ├── vercel.json       # Routing configuration for Vercel
        └── package.json
```

---

## Setup and Installation

### Prerequisites

- Node.js installed (v18+)
- MongoDB Atlas database or local instance running

### 1. Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the backend/ directory:

   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   GROQ_API_KEY=your_groq_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend/invoice-generator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

---

## AI Engine and Fallback Strategy

The application wraps AI calls in a resilient helper utility:

- The system checks if GROQ_API_KEY is present and attempts a request to Groq's completions endpoint using the llama-3.1-8b-instant model.
- If the request fails (e.g., rate limits, network error) or the key is not defined, it seamlessly handles the request using the Google Gemini (gemini-2.0-flash) model.
