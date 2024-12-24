# Product Management REST API

A simple Node.js REST API for managing products, the product updates and respectively, the update points the updates consist of. This API enables creating, retrieving, updating, and deleting product information. This project was created as part of my effort to improve my backend skills and branch out a bit from my typical traditional frontend projects.

## Core features

-   REST architecture
-   TypeScript
-   Authentication
-   Request validation

---

## Table of Contents

-   [Requirements](#requirements)
-   [Installation](#installation)
-   [Getting Started](#getting-started)
-   [Environment Variables](#environment-variables)
-   [API Endpoints](#api-endpoints)
-   [Project Structure](#project-structure)
-   [License](#license)

---

## Requirements

-   **Node.js** v18.18+
-   **npm** v9.8.1+

---

## Installation

```bash
# Clone the repository
git clone https://github.com/developedbygeo/product-management-node-api.git

# Navigate into the project directory
cd product-management-node-api

# Install dependencies
npm install
```

## Getting Started

1. Set the environment variables (see `env.example`).
2. Start the server `npm run dev`

## Environment Variables

The core environment variables are set in `.env` but the current configuration allows for different settings for `local`, `production`, and `testing` environments. For more details, please refer to `config/index.ts`.

## API Endpoints

This concept project follows the REST architecture. There are two core route handlers that are used:

2. Non-auth: `/register` and `/login`
1. Auth-required: `/product`, `update`, `update-point` which allow for `GET, POST, PUT, DELETE`.

For more information about each, please refer to the `Artifacts` where each endpoint is documented through **Bruno API Client**.

## Project Structure

Below is a suggested project structure for an application where users can register and log in. Once authenticated, they can perform CRUD operations on Products, create and manage Product Updates, and also manage individual Update Points. This structure uses Prisma for database interactions and includes typical Node.js/TypeScript conventions.

Structure-wise, the `protectRoute` middleware is designed to run before any CRUD operation on any of the routers inside the `routes/` directory.

```bash
project-root/
├─ .env                              # Environment variables (see .env.example)
├─ prisma/
│  ├─ schema.prisma                  # Prisma schema
│  └─ migrations/
├─ src/
│  ├─ index.ts                      # Entry point; starts the server
│  ├─ server.ts                     # Configures Express app, middlewares, routes, etc.
│  ├─ config/
│  │  └─ *                          # Dynamic env variable configuration
│  ├─ handlers/
│  │  ├─ user.ts                    # Handler for login, register
│  │  ├─ product.ts                 # Handler for CRUD on products
│  │  ├─ update.ts                  # Handler for CRUD on product updates
│  │  └─ updatePoint.ts             # Handler for CRUD on update points
│  ├─ routes/
│  │  ├─ products.ts                # /api/product -> CRUD on products
│  │  ├─ updates.ts                 # /api/update -> CRUD on updates
│  │  ├─ updatePoint.ts             # /api/product-point CRUD on update points
│  ├─ middleware/
│  │  └─ handleError.ts             # Generic error middleware
│  │  └─ morganWithWinstonLogger.ts # Logging middleware
│  │  └─ protectRoute.ts            # Auth middleware
│  │  └─ validators.ts              # General validator middleware
│  ├─ modules/
│  │  ├─ auth.ts                    # Auth module
│  │  ├─ rawValidators.ts           # Validation logic
│  │  ├─ responses.ts               # Generic response rejection module
│  ├─ utils/
│  │  ├─ *                          # Logging and data transformation utils
│  └─ types/
│     └─ user.ts                    # Custom TS user definitions
```

## License

[MIT](./LICENSE.md)
