# BookHive

BookHive is a book review platform that allows users to share and discover book reviews. This application features user authentication, review management, and book ratings. Built with modern technologies like **Next.js**, **tRPC**, **Prisma**, and **Auth.js**, BookHive provides a seamless experience for book lovers.

## Features

- **User Authentication** using **Auth.js**
- **Book Reviews** with ratings and comments
- **Admin Panel** for managing reviews and users
- **Responsive UI** built with **Tailwind CSS**
- **Book Ratings** with star-based input
- **Server-side Database** powered by **Prisma** and **MongoDB**

## Technologies Used

- **Next.js** (React framework for SSR and static generation)
- **tRPC** (End-to-end typesafe APIs)
- **Prisma** (ORM for MongoDB/PostgreSQL)
- **Auth.js** (User authentication)
- **Tailwind CSS** (CSS utility framework)
- **Lucide-react** (Icons)
- **Framer Motion** (Animation library)
- **MongoDB** (Database)

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or later)
- **npm** or **bun** package manager
- **MongoDB** (for local development) or use a cloud service like **MongoDB Atlas**
- **Vercel CLI** (for deployment)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/TheGauravsahu/bookhive
   cd bookhive
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   bun install
   ```

3. Set up your environment variables. Create a `.env` file in the root of the project and add the variables as shown in `.env.example`:

4. Run the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   bun dev
   ```

   The app will be accessible at `http://localhost:3000`.

## Database Setup

BookHive uses **Prisma** for database management and MongoDB as Database.

1. Add Database Url to .env file

2. Initialize Prisma:

   ```bash
   npx prisma init
   ```

   or

   ```bash
   bunx prisma init
   ```

3. Set up your database schema in `prisma/schema.prisma`.

4. Run migrations to set up the database schema:

   ```bash
   npx prisma generate
   ```

   or

   ```bash
   bunx prisma generate
   ```

## Deployment

### Vercel

1. Create a Vercel account (if you don't have one).
2. Deploy directly from the GitHub repository by connecting it to Vercel.
3. Set up environment variables on Vercel (under **Project Settings → Environment Variables**).
4. Vercel will handle the deployment and provide a live URL for your app.

## Contributing

We welcome contributions to BookHive! Here’s how you can contribute:

1. Fork the repository.
2. Clone your fork to your local machine.
3. Create a new branch (`git checkout -b feature-name`).
4. Make your changes and commit them.
5. Push to your fork (`git push origin feature-name`).
6. Open a pull request to merge your changes into the main repository.


---

If you have any questions, feel free to open an issue or contact me directly.

Enjoy exploring BookHive! 📚✨
