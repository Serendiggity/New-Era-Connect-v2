# New Era Connect

> AI-powered business card management and networking application

Transform your business networking with intelligent contact management, smart business card scanning, and automated follow-ups.

## 🚀 Features

- **AI-Powered Business Card Scanning**: Upload photos of business cards and automatically extract contact information
- **Smart Contact Organization**: Organize contacts by events and create targeted lead groups
- **Natural Language Search**: Find contacts using plain English queries
- **Automated Email Drafting**: Generate personalized email drafts for lead groups
- **Event Management**: Track networking events and associate contacts with specific events
- **Gmail Integration**: Connect your Gmail account for seamless email management

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN/UI** - Beautiful, accessible components
- **TanStack Query** - Powerful data fetching
- **Clerk** - Authentication and user management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe server development
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL** - Robust relational database

### Services
- **OpenAI** - AI-powered text processing
- **Google Cloud** - Gmail API integration
- **Supabase** - File storage and database hosting
- **Clerk** - Authentication service

## 📦 Project Structure

```
new-era-connect/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── services/      # API service functions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Express backend
│   ├── src/
│   │   ├── features/      # Feature-based modules
│   │   ├── services/      # Business logic services
│   │   ├── middleware/    # Express middleware
│   │   └── utils/         # Utility functions
│   └── package.json
├── shared/                # Shared types and schemas
│   ├── schema.ts          # Database schema
│   └── package.json
└── package.json          # Root workspace configuration
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/your-username/new-era-connect.git
cd new-era-connect
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp env.example server/.env
cp env.example client/.env
```

Fill in the required environment variables:
- Database connection string
- Clerk authentication keys
- OpenAI API key
- Google Cloud credentials
- Supabase configuration

### 4. Set up the database
```bash
npm run db:push
```

### 5. Start the development servers
```bash
npm run dev
```

This starts both the frontend (http://localhost:5173) and backend (http://localhost:3001) servers.

## 🎯 Usage

### Getting Started
1. Sign up for a new account or sign in
2. Create your first event to organize contacts
3. Upload business card photos to extract contact information
4. Use natural language search to find specific contacts
5. Create lead groups for targeted outreach
6. Generate personalized email drafts with AI

### Key Workflows

#### Business Card Scanning
1. Navigate to the "Scan Card" page
2. Select the event for the new contact
3. Upload a business card photo
4. Review and edit the extracted information
5. Save the contact to your database

#### Email Campaign Creation
1. Go to the "Emails" page
2. Create or select an email template
3. Choose a lead group for targeting
4. Generate AI-powered personalized drafts
5. Review and send emails through Gmail

## 🧪 Development

### Running Tests
```bash
npm test
```

### Database Management
```bash
# Push schema changes
npm run db:push

# Open database studio
npm run db:studio

# Generate migrations
npm run db:migrate
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## 📚 API Documentation

### Authentication
All API routes require authentication via Clerk. Include the session token in the Authorization header:

```
Authorization: Bearer <session_token>
```

### Core Endpoints

#### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/search?q=query` - Search contacts
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

#### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `GET /api/events/:id` - Get event details

#### Email Templates
- `GET /api/emails/templates` - Get all templates
- `POST /api/emails/templates` - Create new template

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ShadCN/UI](https://ui.shadcn.com/) for the beautiful component library
- [Clerk](https://clerk.com/) for authentication services
- [Drizzle ORM](https://orm.drizzle.team/) for the excellent database toolkit
- [OpenAI](https://openai.com/) for AI capabilities

---

Built with ❤️ for the modern networking professional 