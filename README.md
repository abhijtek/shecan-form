# SheCan Contact Form

Deployed form link: https://shecan-form-frontend.onrender.com/

A MERN stack contact form application for She Can Foundation. Users can submit their name, email, and message, and the submitted messages are stored in MongoDB and shown in a simple messages dashboard.

## Features

- Contact form with name, email, and message fields
- Form validation on frontend and backend
- MongoDB message storage
- Express API integration
- Axios-powered frontend requests
- Toast notifications with `react-hot-toast`
- Messages dashboard to view submitted responses
- Light and dark mode toggle
- Responsive Tailwind CSS UI

## Tech Stack

- MongoDB
- Express.js
- React
- Node.js
- Tailwind CSS
- Axios
- React Hot Toast

## Project Structure

```txt
SheCan/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── controllers/
│       │   └── contact.controller.js
│       ├── models/
│       │   └── contact.model.js
│       └── routes/
│           └── contact.routes.js
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── .env.example
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── styles.css
        └── api/
            └── contactApi.js
```

## Environment Variables

Create a `.env` file inside `backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Create a `.env` file inside `frontend`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Installation

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

## Run Locally

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

Backend runs on:

```txt
http://localhost:5000
```

## API Endpoints

```txt
POST /api/contact
```

Submits a new contact form message.

```txt
GET /api/contact
```

Fetches all submitted messages, newest first.

## Response Message

After successful form submission, the app displays:

```txt
Form Submitted Successfully
```
