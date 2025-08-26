# Reachio Backend

[![Node.js](https://img.shields.io/badge/Node.js-16.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-4.x-lightblue)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## Description

Backend for **Reachio**, a customer outreach platform. Built with **Node.js**, **Express**, and **Prisma ORM**, it handles:

- User authentication (email/password and Google OAuth)
- Business management
- Secure API endpoints for efficient data access
- JWT-based authentication for secure sessions

## Features

- **User Authentication:** Sign up, log in, and Google OAuth login  
- **Business Management:** CRUD operations for businesses  
- **Security:** Password hashing with bcrypt and JWT-based authentication  
- **Validation:** Input validation using Zod  

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (or your preferred database)
- JWT (JSON Web Tokens) for authentication
- Zod for input validation

## Getting Started

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- PostgreSQL or any other supported database

### Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/reachio-backend.git
cd reachio-backend
