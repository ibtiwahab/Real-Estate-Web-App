# Pakistan Real Estate Marketplace

A full-stack MERN real estate platform for listing, browsing, and managing properties across Pakistan. Users can register, authenticate, post properties with images, filter listings, and interact with an AI chat assistant.

---

## Tech Stack

**Frontend**
- React 18, React Router DOM v6
- Tailwind CSS, Bootstrap 5, React Bootstrap
- Axios, i18next (internationalization)
- Lucide React, React Icons, FontAwesome

**Backend**
- Node.js, Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT), bcryptjs
- Cloudinary (image uploads)
- Helmet, CORS, express-rate-limit, xss-clean

---

## Project Structure

```
Imarat 2.0/
├── frontend/          # React app (Create React App)
│   ├── public/
│   └── src/
│       ├── components/    # Header, Footer, PropertyCard, FilterSidebar, etc.
│       ├── contexts/      # AuthContext (JWT state management)
│       ├── pages/         # HomePage, PropertyListPage, PropertyDetailPage, etc.
│       └── api.js         # Axios API helpers
│
└── backend/           # Express.js REST API
    ├── controllers/   # authController, propertyController
    ├── models/        # User, Property (Mongoose schemas)
    ├── routes/        # auth, properties, ai
    ├── middleware/    # authentication, error-handler, not-found
    ├── errors/        # Custom error classes
    └── db/            # MongoDB connection
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "Imarat 2.0"
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/imarat
JWT_SECRET=your_jwt_secret_here
JWT_LIFETIME=30d
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Start the backend:

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm start
```

The app will be available at `http://localhost:3000`.

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register` | Register a new user | No |
| POST | `/api/v1/auth/login` | Login and receive JWT | No |
| GET | `/api/v1/auth/verify` | Verify JWT token | Yes |

### Properties

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/properties` | Get all properties (filterable) | No |
| GET | `/api/v1/properties/:id` | Get property details | No |
| POST | `/api/v1/properties` | Create a property | Yes |
| PATCH | `/api/v1/properties/:id` | Update a property | Yes |
| DELETE | `/api/v1/properties/:id` | Delete a property | Yes |
| GET | `/api/v1/properties/user/properties` | Get current user's properties | Yes |

### AI

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/ai/response` | AI chat (coming soon) |

---

## Features

- **Authentication** — JWT-based auth with bcrypt password hashing, localStorage token persistence, protected routes
- **Property Listings** — Full CRUD, filter by type (House/Apartment), purpose (Sale/Rent), price, location, and size (Marla/Kanal)
- **Image Uploads** — Cloudinary integration for property images
- **Internationalization** — i18next with browser language detection
- **AI Chat** — Voice input with waveform visualization and text-to-speech (coming soon)
- **Security** — Helmet headers, rate limiting (100 req/15 min), XSS protection, CORS

---

## Environment Variables Reference

### Backend

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `JWT_LIFETIME` | JWT expiry duration (e.g. `30d`) |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |

### Frontend

| Variable | Description |
|----------|-------------|
| `REACT_APP_BACKEND_URL` | Base URL for the backend API |

---

## Scripts

### Backend (`cd backend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon (development) |
| `npm start` | Start production server |

### Frontend (`cd frontend`)

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run test suite |

---

## License

This project is for private use. All rights reserved.
