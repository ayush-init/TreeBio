# TreeBio - Modern Link-in-Bio Platform

A comprehensive Next.js 15 link-in-bio application built as a premium alternative to Linktree. Features user authentication, customizable profiles, QR code generation, and detailed analytics tracking.

## 🚀 Features

- **🔐 Authentication** - Clerk-powered user management with social login
- **👤 Profile Management** - Customizable user profiles with bio, avatar, and social links
- **🔗 Link Management** - Add, edit, delete, and reorder links with click tracking
- **📊 Analytics Dashboard** - Real-time statistics, charts, and performance metrics
- **📱 QR Code Generation** - High-quality QR codes for profile sharing
- **🎨 Theme System** - Complete dark/light/system mode support
- **📱 Responsive Design** - Mobile-first approach with breakpoint optimization
- **✨ Modern UI** - Glass morphism, animations, and premium user experience

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15.4.4** - App Router with Turbopack
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Full type safety across the application

### Authentication & Database
- **Clerk** - Enterprise-grade authentication and user management
- **PostgreSQL** - Robust relational database
- **Prisma ORM** - Type-safe database operations and migrations

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - 47+ accessible Radix UI components
- **Lucide React** - 525+ beautiful icons
- **next-themes** - Theme management (light/dark/system)

### Additional Libraries
- **React Hook Form** - Form handling with Zod validation
- **Recharts** - Analytics data visualization
- **Sonner** - Toast notifications
- **Cloudinary** - Image upload and optimization

## Project Structure

```
treebio/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/page.tsx
│   │   └── sign-up/
│   │       └── [[...sign-up]]/page.tsx
│   ├── (home)/                   # Landing page
│   │   ├── page.tsx              # Home page with hero section
│   │   └── loading.tsx           # Home page loading state
│   ├── (profile)/                # Public profiles
│   │   └── [username]/
│   │       └── page.tsx          # Public profile display
│   ├── admin/                    # Protected admin area
│   │   ├── page.tsx             # Admin overview
│   │   ├── my-tree/
│   │   │   ├── page.tsx         # Link management
│   │   │   └── loading.tsx      # My-tree loading state
│   │   ├── overview/
│   │   │   ├── page.tsx         # Analytics dashboard
│   │   │   └── loading.tsx      # Overview loading state
│   │   ├── qr/
│   │   │   ├── page.tsx         # QR code generation
│   │   │   └── loading.tsx      # QR loading state
│   │   └── settings/
│   │       ├── page.tsx         # Settings management
│   │       └── loading.tsx      # Settings loading state
│   ├── api/                     # API routes
│   │   └── og-data/
│   │       └── route.ts          # Open Graph data fetcher
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components (47+)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── skeleton.tsx           # Skeleton loading components
│   │   ├── shimmer.tsx           # Shimmer animation components
│   │   ├── shimmer-card.tsx      # Card skeleton
│   │   ├── shimmer-text.tsx       # Text skeleton
│   │   ├── shimmer-avatar.tsx     # Avatar skeleton
│   │   └── shimmer-button.tsx     # Button skeleton
│   ├── theme-provider.tsx        # Theme context
│   └── theme-toggle.tsx          # Theme switcher
├── modules/                     # Feature modules
│   ├── analytics/               # Analytics logic
│   │   ├── actions.ts            # Analytics server actions
│   │   └── components/
│   │       └── overview-shimmer.tsx
│   ├── auth/                    # Authentication
│   │   └── actions.ts            # Auth server actions
│   ├── dashboard/               # Dashboard components
│   │   └── Dashboard.tsx         # Main dashboard with animations
│   ├── home/                   # Home page
│   │   ├── components/
│   │   │   └── claim-link-form.tsx
│   │   ├── LandingPage.tsx
│   │   └── LandingPageShimmer.tsx
│   ├── links/                  # Link management
│   │   ├── actions.ts            # Link CRUD operations
│   │   └── components/
│   │       ├── my-tree-shimmer.tsx
│   │       └── link-card.tsx
│   ├── profile/                # Profile management
│   │   ├── actions.ts            # Profile operations
│   │   └── components/
│   │       └── treebio-profile.tsx
│   ├── qr/                     # QR code generation
│   │   ├── actions.ts            # QR generation logic
│   │   └── components/
│   │       ├── qr-generator.tsx
│   │       └── qr-shimmer.tsx
│   └── settings/               # Settings management
│       ├── actions.ts            # Settings operations
│       ├── settings-page.tsx
│       └── components/
│           └── settings-shimmer.tsx
├── lib/                        # Utility libraries
│   ├── db.ts                   # Database connection
│   ├── utils.ts                # Utility functions
│   └── cloudinary.ts           # Image handling
├── prisma/                     # Database schema
│   ├── schema.prisma            # Database models
│   └── migrations/              # Database migrations
├── public/                     # Static assets
│   ├── icons/                  # App icons
│   └── favicon.ico
├── hooks/                      # Custom React hooks
├── middleware.ts               # Clerk authentication middleware
├── tailwind.config.ts          # Tailwind configuration
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🗄️ Database Schema

### Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ Link : creates
    User ||--o{ SocialLink : creates
    User ||--o{ LinkAnalytics : tracks
    User ||--o{ ProfileAnalytics : tracks
    
    User {
        string id PK
        string clerkId UK
        string email UK
        string username UK
        string firstName
        string lastName
        string imageUrl
        enum role
        string bio
        string theme
        string buttonStyle
        datetime createdAt
        datetime updatedAt
    }
    
    Link {
        string id PK
        string title
        string url
        string description
        string image
        int clickCount
        string userId FK
        datetime createdAt
        datetime updatedAt
    }
    
    SocialLink {
        string id PK
        string platform
        string url
        string userId FK
        datetime createdAt
        datetime updatedAt
    }
    
    LinkAnalytics {
        string id PK
        string linkId FK
        string ipAddress
        string userAgent
        string referer
        datetime timestamp
    }
    
    ProfileAnalytics {
        string id PK
        string userId FK
        string ipAddress
        string userAgent
        string referer
        datetime timestamp
    }
```

### Model Details

#### 👤 User Model
```typescript
interface User {
  id: string;                    // Primary Key (UUID)
  clerkId: string;                // Clerk integration ID (unique)
  email: string;                 // User email (unique)
  username: string;               // Profile username (unique, optional)
  firstName: string;              // First name (optional)
  lastName: string;               // Last name (optional)
  imageUrl: string;               // Profile picture URL (optional)
  role: Role;                    // User role (USER | CO_ADMIN | ADMIN)
  bio: string;                   // Profile bio (max 500 chars, optional)
  theme: string;                 // UI theme ("light" | "dark" | "system")
  buttonStyle: string;            // Button style ("rounded" | "pill" | "minimal")
  createdAt: DateTime;             // Account creation timestamp
  updatedAt: DateTime;             // Last update timestamp
}
```

#### 🔗 Link Model
```typescript
interface Link {
  id: string;                    // Primary Key (UUID)
  title: string;                 // Link display title
  url: string;                   // Destination URL
  description: string;            // Link description (max 500 chars, optional)
  image: string;                 // Link preview image (max 500 chars, optional)
  clickCount: number;             // Total clicks counter (default: 0)
  userId: string;                 // Foreign Key to User
  createdAt: DateTime;             // Link creation timestamp
  updatedAt: DateTime;             // Last update timestamp
}
```

#### 📱 SocialLink Model
```typescript
interface SocialLink {
  id: string;                    // Primary Key (UUID)
  platform: string;               // Social platform name
  url: string;                   // Social profile URL
  userId: string;                 // Foreign Key to User
  createdAt: DateTime;             // Social link creation timestamp
  updatedAt: DateTime;             // Last update timestamp
}
```

#### 📊 LinkAnalytics Model
```typescript
interface LinkAnalytics {
  id: string;                    // Primary Key (UUID)
  linkId: string;                 // Foreign Key to Link
  ipAddress: string;               // Visitor IP address (hashed)
  userAgent: string;               // Browser user agent
  referer: string;                // Referral URL
  timestamp: DateTime;             // Click timestamp
}
```

#### 👁️ ProfileAnalytics Model
```typescript
interface ProfileAnalytics {
  id: string;                    // Primary Key (UUID)
  userId: string;                 // Foreign Key to User
  ipAddress: string;               // Visitor IP address (hashed)
  userAgent: string;               // Browser user agent
  referer: string;                // Referral URL
  timestamp: DateTime;             // Visit timestamp
}
```

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** - JavaScript runtime
- **PostgreSQL** - Database server
- **Clerk Account** - Authentication provider
- **Cloudinary Account** - Image hosting (optional)

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/your-username/treebio.git
cd treebio
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Variables**
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/treebio"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

4. **Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio
npx prisma studio
```

5. **Start Development Server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues

# Database
npx prisma generate  # Generate Prisma client
npx prisma migrate dev # Run migrations
npx prisma studio    # Open database GUI
```

## 🚀 Deployment Guide

### Build Status: ✅ **Successfully Built**

The project has been successfully built for production deployment. Here are the deployment options:

### 🌐 Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# For production deployment
vercel --prod
```

### 🐳 Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run Docker container
docker build -t treebio .
docker run -p 3000:3000 treebio
```

### 🪄 Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=.next
```

### ☁️ AWS/CloudFront
```bash
# Build for static export (if needed)
npm run build

# Deploy to S3 + CloudFront
aws s3 sync .next/static s3://your-bucket-name
```

### 📱 Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

### 🔧 Environment Variables for Production

Make sure these environment variables are set in your deployment platform:

```env
# Required
DATABASE_URL="postgresql://username:password@host:port/database"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# Optional
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 🗄️ Database Setup for Production

1. **PostgreSQL Database**
   - Use managed PostgreSQL (AWS RDS, Railway, Neon, etc.)
   - Update `DATABASE_URL` in production

2. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

3. **Seed Database** (if needed)
   ```bash
   npx prisma db seed
   ```

### 📊 Build Output Analysis

**Build Performance:**
- ✅ **Compilation Time**: 10.0s
- ✅ **Bundle Size**: Optimized
- ✅ **Static Generation**: 12/12 pages
- ✅ **Middleware**: 78.3 kB

**Bundle Analysis:**
- **Home Page**: 7.04 kB (156 kB First Load JS)
- **Admin Pages**: 45.3 kB - 105 kB
- **API Routes**: 156 B each
- **Shared JS**: 100 kB

### 🔍 Production Checklist

Before deploying to production:

- [ ] **Environment Variables** configured
- [ ] **Database** connected and migrated
- [ ] **Clerk Authentication** set up with production keys
- [ ] **Domain** configured and SSL enabled
- [ ] **Analytics** (Google Analytics, etc.) added
- [ ] **Error Monitoring** (Sentry, etc.) configured
- [ ] **Performance Monitoring** set up
- [ ] **Backup Strategy** for database
- [ ] **CDN** configured for static assets

### 🚨 Troubleshooting

**Common Issues:**

1. **Build Errors**
   - Check environment variables
   - Verify database connection
   - Update dependencies

2. **Runtime Errors**
   - Check Prisma migrations
   - Verify Clerk configuration
   - Check API endpoints

3. **Performance Issues**
   - Enable caching
   - Optimize images
   - Monitor bundle size

### 📈 Performance Optimization

The build includes several optimizations:
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Optimized chunk sizes
- **Static Generation**: Where possible
- **Middleware**: Efficient request handling

## 🎯 Key Features Explained

### 🔐 Authentication System
- **Clerk Integration** - Complete auth flow with social providers
- **Route Protection** - Middleware-based route guarding
- **User Onboarding** - Automatic database user creation
- **Session Management** - Secure session handling

### 📊 Analytics & Tracking
- **Link Click Tracking** - Individual link performance metrics
- **Profile Visit Analytics** - Profile view statistics
- **IP-based Deduplication** - Prevents duplicate counting
- **Time-based Analytics** - Hourly, daily, weekly, monthly data
- **Performance Metrics** - Most clicked links, visitor trends

### 🎨 UI/UX Features
- **Dark Mode Support** - Complete theme system with system preference
- **Responsive Design** - Mobile-first approach with breakpoint optimization
- **Loading States** - Skeleton loaders and shimmer animations
- **Form Validation** - Zod schema validation with React Hook Form
- **Toast Notifications** - User feedback with Sonner
- **Glass Morphism** - Modern frosted glass effects

### 📱 Profile Management
- **Customizable Profiles** - Bio, avatar, username management
- **Social Media Integration** - Dedicated social platform links
- **Link Management** - Full CRUD operations with drag-and-drop
- **QR Code Generation** - High-quality QR codes for sharing
- **Appearance Settings** - Theme and button style customization

## 🔒 Security Features

### Authentication Security
- **Clerk Middleware** - Enterprise-grade authentication
- **Route Protection** - Secure route access control
- **Session Management** - Secure session handling
- **User Isolation** - Proper data access controls

### Data Security
- **Input Validation** - Zod schema validation throughout
- **SQL Injection Prevention** - Prisma ORM protection
- **XSS Prevention** - React's built-in protections
- **CSRF Protection** - Next.js built-in CSRF protection

### Privacy & Analytics
- **IP Hashing** - Secure IP storage for analytics
- **Rate Limiting** - Prevents duplicate tracking
- **Data Minimization** - Only essential data collection
- **GDPR Compliance** - Privacy-focused design

## 📈 Performance Optimizations

### Database Design
- **Indexing Strategy** - Optimized indexes on frequently queried fields
- **Relationship Optimization** - Efficient foreign key relationships
- **Query Optimization** - Selective field querying to reduce data transfer

### Frontend Performance
- **Component Lazy Loading** - Dynamic imports for better initial load
- **Image Optimization** - Next.js Image component with Cloudinary
- **Code Splitting** - Automatic route-based code splitting
- **Caching Strategy** - Proper caching headers and strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Clerk** - For the authentication solution
- **Prisma** - For the excellent ORM
- **shadcn/ui** - For the beautiful component library
- **Tailwind CSS** - For the utility-first CSS framework

---

**Built with ❤️ using modern web technologies**
