# Ebenezer Senior High School Website - Local Setup Guide

## Prerequisites

Before running this project locally, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - Install with: `npm install -g pnpm`
- **MySQL** (v8.0 or higher) - [Download](https://www.mysql.com/downloads/)

## Installation Steps

### 1. Extract the Project
```bash
unzip ebenezer-shs-website.zip
cd ebenezer-shs-website
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Set Up the Database

#### Create a MySQL Database
```bash
mysql -u root -p
```

In the MySQL prompt:
```sql
CREATE DATABASE ebenezer_shs;
EXIT;
```

#### Create a `.env.local` file in the project root:
```bash
cat > .env.local << 'ENVEOF'
DATABASE_URL=mysql://root:your_password@localhost:3306/ebenezer_shs
JWT_SECRET=your-secret-key-here-change-this
NODE_ENV=development
ENVEOF
```

Replace `your_password` with your MySQL root password.

#### Run Database Migrations
```bash
node migrate.mjs
```

#### Seed the Database with Sample Content
```bash
node seed-db.mjs
```

### 4. Start the Development Server
```bash
pnpm dev
```

The application will start at **http://localhost:3000**

## Project Structure

```
ebenezer-shs-website/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── App.tsx        # Main app with routing
│   │   └── index.css      # Global styles
│   └── public/            # Static assets
├── server/                # Express backend
│   ├── routers.ts         # tRPC procedures
│   ├── db.ts              # Database queries
│   └── _core/             # Core server setup
├── drizzle/               # Database schema
│   └── schema.ts          # Table definitions
└── package.json           # Dependencies
```

## Available Scripts

- `pnpm dev` - Start development server (frontend + backend)
- `pnpm build` - Build for production
- `pnpm start` - Run production build
- `pnpm test` - Run unit tests
- `pnpm format` - Format code with Prettier

## Features

### Public Pages
- **Home** - Hero section with school stats and quick links
- **About** - School history, mission, vision, and motto
- **Academics** - 6 academic programmes offered
- **Admissions** - Admission process and inquiry form
- **News** - Latest news and announcements
- **Events** - Upcoming school events
- **Staff** - Staff directory with profiles
- **Gallery** - Photo gallery by category
- **Contact** - Contact form and school information

### Admin Features (Protected)
- Access at `/admin` (requires authentication)
- Manage news articles
- Manage events
- Manage staff profiles
- View contact submissions
- Manage gallery images

## Authentication

The site uses Manus OAuth for authentication. To use admin features locally:

1. You'll need to configure OAuth credentials (optional for local development)
2. Or create a test admin user directly in the database:

```bash
mysql -u root -p ebenezer_shs
INSERT INTO users (openId, name, email, role, createdAt, updatedAt, lastSignedIn) 
VALUES ('test-admin', 'Admin User', 'admin@ebenezer-shs.edu.gh', 'admin', NOW(), NOW(), NOW());
```

## Database Schema

The project includes the following tables:
- `users` - User accounts and authentication
- `news` - News articles and announcements
- `events` - School events
- `staff` - Staff directory
- `gallery` - Photo gallery images
- `contact_messages` - Contact form submissions
- `admission_inquiries` - Admission inquiry forms

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error
- Verify MySQL is running
- Check DATABASE_URL in `.env.local`
- Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Dependencies Installation Issues
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Development Tips

- Hot reload is enabled - changes save automatically
- Check browser console for frontend errors
- Check terminal for backend errors
- Database changes require migration: `node migrate.mjs`

## Production Deployment

For production deployment:

1. Build the project: `pnpm build`
2. Set `NODE_ENV=production`
3. Use a production database
4. Configure proper environment variables
5. Use a process manager like PM2

## Support

For issues or questions, refer to the project documentation or contact the development team.

---

**Enjoy your Ebenezer SHS website!** 🎓
