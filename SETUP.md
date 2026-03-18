# Environment Configuration Templates

This directory contains template files for environment configuration.

## Setup Instructions

### 1. Frontend Configuration
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your actual values
```

### 2. Backend Configuration
```bash
cd backend
cp .env.example .env
# Edit .env with your actual values
```

### 3. Database Setup
- Ensure PostgreSQL 13+ is installed and running
- Create database: `createdb blog_db`
- Database migrations will run automatically on application startup (Flyway)

### 4. Cloudflare R2 Setup
1. Create a Cloudflare account and set up R2
2. Create an API token with S3 compatibility
3. Update backend `.env` with credentials:
   - `CLOUDFLARE_R2_ENDPOINT`
   - `CLOUDFLARE_R2_ACCESS_KEY_ID`
   - `CLOUDFLARE_R2_SECRET_ACCESS_KEY`

### 5. Email Service Setup
Choose one of the email services and update the configuration:
- **Mailgun**: Update `MAILGUN_*` variables
- **SendGrid**: Update `SENDGRID_*` variables
- **Resend**: Update `RESEND_*` variables

## Docker Setup

Run the entire application with Docker Compose:

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database
- Backend (Spring Boot)
- Frontend (Vue.js + Nginx)
- MailHog (for email testing)

Access the application at `http://localhost`

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
mvn spring-boot:run
```
