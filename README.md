# QuickHire - Job Board Application

QuickHire is a modern, full-stack job board application built with Next.js, Express, and MongoDB. It allows users to browse job listings, view details, and apply for jobs, whilst providing an administration panel to manage job listings and applications.

## Project Structure

This is a monorepo setup consisting of two main parts:

- `/qtech` - The Frontend (Next.js App Router, Tailwind CSS, TypeScript).
- `/backend` - The Backend API (Node.js, Express, MongoDB, TypeScript).

## Features

- **User Face:** Browse jobs, filter by categories/location, apply through a modal.
- **Admin Panel:** Secure panel (`/admin/login`) to view statistics, manage job listings (Add/Edit/Delete), and view submitted applications.
- **Data Fetching:** Fully integrated Server and Client Components with dynamic data fetching using Next.js.
- **Validation:** Type-safe API request validation using Zod.

---

## Getting Started Locally

### Prerequisites

- Node.js (v18+)
- MongoDB connection string (Atlas or Local)

### 1. Setup Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:8080`.*

### 2. Setup Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd qtech
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the `qtech` directory with the following variable mapping to your backend server:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The application will start on `http://localhost:3000`.*

---

## Admin Panel Access

Once both servers are running, access the admin panel via:
- **URL:** `http://localhost:3000/admin`
- **Username:** `admin`
- **Password:** `admin123`

---

## API Endpoints

The backend exposes the following RESTful API endpoints:

### Jobs
- `GET /api/jobs` - Get all jobs (supports query filters: `q`, `category`, `location`, `section`, `limit`)
- `GET /api/jobs/:id` - Get a single job by ID
- `POST /api/jobs` - Create a new job (Admin only)
- `PUT /api/jobs/:id` - Update an existing job (Admin only)
- `DELETE /api/jobs/:id` - Delete a job (Admin only)

### Applications
- `GET /api/applications` - Get all submitted applications (Admin only)
- `POST /api/applications` - Submit a new job application
