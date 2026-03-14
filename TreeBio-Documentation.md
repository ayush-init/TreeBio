# TreeBio Project Documentation

## Project Overview

**TreeBio** is a Next.js-based link-in-bio application built as an alternative to Linktree. It allows users to create a personalized landing page with multiple links, social media profiles, and provides comprehensive analytics tracking.

### Tech Stack
- **Framework**: Next.js 15.4.4 with App Router
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts
- **Theme**: Dark/Light mode support with next-themes

---

## Database Schema

### Core Models

#### User Model
```typescript
- id: String (Primary Key)
- clerkId: String (Unique, for Clerk integration)
- email: String (Unique)
- username: String? (Unique, optional)
- firstName: String?
- lastName: String?
- imageUrl: String?
- role: Role (USER, CO_ADMIN, ADMIN)
- bio: String? (Max 500 chars)
- createdAt: DateTime
- updatedAt: DateTime
```

#### Link Model
```typescript
- id: String (Primary Key)
- title: String
- url: String
- description: String? (Max 500 chars)
- clickCount: Int (Default: 0)
- userId: String (Foreign Key)
- createdAt: DateTime
- updatedAt: DateTime
```

#### SocialLink Model
```typescript
- id: String (Primary Key)
- platform: String
- url: String
- userId: String (Foreign Key)
- createdAt: DateTime
- updatedAt: DateTime
```

#### Analytics Models
- **LinkAnalytics**: Tracks individual link clicks with IP and timestamp
- **ProfileAnalytics**: Tracks profile visits with IP and timestamp

---

## Routes Structure

### Public Routes

#### `/` - Home Page
- **File**: `app/(home)/page.tsx`
- **Purpose**: Landing page with hero section and username claim form
- **Features**:
  - Hero section with marketing copy
  - Username availability checker
  - Link claiming functionality
  - Redirects to dashboard if user already has username

#### `/sign-in` - Sign In Page
- **File**: `app/(auth)/sign-in/[[...sign-in]]/page.tsx`
- **Purpose**: User authentication
- **Features**: Clerk-powered sign-in interface

#### `/sign-up` - Sign Up Page
- **File**: `app/(auth)/sign-up/[[...sign-up]]/page.tsx`
- **Purpose**: New user registration
- **Features**: Clerk-powered sign-up interface

#### `/[username]` - Public Profile Page
- **File**: `app/(profile)/[username]/page.tsx`
- **Purpose**: Display user's public TreeBio profile
- **Features**:
  - Shows user's profile information
  - Displays all links and social links
  - Tracks profile visits for analytics
  - Responsive design

### Protected Routes (Authentication Required)

#### `/admin` - Dashboard Overview
- **File**: `app/admin/page.tsx`
- **Purpose**: Main dashboard with analytics overview
- **Features**:
  - Statistics cards (Total Links, Views, Clicks, Visitors)
  - Recent links display
  - Quick actions section
  - Navigation to other admin features

#### `/admin/my-tree` - Manage Links
- **File**: `app/admin/my-tree/page.tsx`
- **Purpose**: Link management interface
- **Features**:
  - Add/Edit/Delete links
  - Link preview functionality
  - Drag-and-drop reordering
  - Click tracking display

#### `/admin/overview` - Analytics Dashboard
- **File**: `app/admin/overview/page.tsx`
- **Purpose**: Detailed analytics and insights
- **Features**:
  - Profile visit statistics
  - Link click analytics
  - Time-based filtering
  - Chart visualizations

---

## Core Features

### 1. User Authentication & Onboarding
- **Clerk Integration**: Complete authentication flow
- **User Onboarding**: Automatic user creation in database on first login
- **Profile Management**: User can update profile information

### 2. Username System
- **Unique Usernames**: Each user gets a unique username for their TreeBio URL
- **Availability Checking**: Real-time username availability validation
- **Smart Suggestions**: Automatic username suggestions if desired name is taken
- **URL Format**: `treebio.com/username`

### 3. Link Management
- **Create Links**: Add custom links with title, URL, and description
- **Edit/Delete**: Full CRUD operations on links
- **Link Analytics**: Track clicks, views, and performance
- **Social Links**: Dedicated social media platform links
- **Link Preview**: Preview how links appear on public profile

### 4. Analytics & Tracking
- **Profile Visits**: Track profile views with unique visitor counting
- **Link Clicks**: Detailed click tracking for each link
- **Time-based Analytics**: Hourly, daily, weekly, monthly statistics
- **IP-based Tracking**: Prevent duplicate counting from same IP within time windows
- **Performance Metrics**: Most clicked links, visitor trends

### 5. Public Profile Display
- **Responsive Design**: Mobile-friendly profile pages
- **Customizable**: User can add bio, profile picture, and customize content
- **Social Integration**: Display social media links prominently
- **Clean UI**: Modern, minimalist design inspired by Linktree

### 6. Admin Dashboard
- **Statistics Overview**: Real-time dashboard with key metrics
- **Link Management**: Easy interface for managing all links
- **Analytics Dashboard**: Comprehensive analytics with charts
- **Quick Actions**: Fast access to common tasks

---

## API Endpoints

### `/api/og-data` - Open Graph Data Fetcher
- **Method**: GET
- **Purpose**: Extract Open Graph metadata from URLs
- **Parameters**: `url` (query parameter)
- **Features**:
  - Fetches title, description, image, and other OG data
  - Timeout protection (10 seconds)
  - Error handling for invalid URLs
  - User-Agent spoofing for better compatibility

---

## Key Components & Modules

### Authentication Module (`modules/auth/`)
- `onBoardUser()`: Creates/updates user in database on login
- Integrates with Clerk for user management

### Profile Module (`modules/profile/`)
- `checkProfileUsernameAvailability()`: Check if username is available
- `claimUsername()`: Reserve username for user
- `getCurrentUsername()`: Get current user's profile data
- `createUserProfile()`: Update user profile information
- `getUserByUsername()`: Fetch public profile data

### Links Module (`modules/links/`)
- `createLinkByUser()`: Add new links
- `getAllLinkForUser()`: Get user's links
- `getPreviewData()`: Get data for profile preview
- `deleteLink()` / `editLink()`: Link management
- `addSocialLink()` / `deleteSocialLink()` / `editSocialLink()`: Social media links

### Analytics Module (`modules/analytics/`)
- `logProfileVist()`: Track profile visits
- `logLinkClick()`: Track link clicks
- `getProfileVistCount()`: Get profile visit statistics
- `getLinkAnalytics()`: Get detailed link analytics
- `getDailyProfileVisits()` / `getDailyLinkClicks()`: Time-based data
- `getTopLinks()`: Get best performing links

---

## Security Features

### Authentication & Authorization
- **Clerk Middleware**: Protects routes requiring authentication
- **Public Routes**: Username profiles and auth pages are public
- **User Isolation**: Users can only access their own data

### Input Validation
- **Username Sanitization**: Removes special characters, enforces length limits
- **URL Validation**: Validates URLs before storing
- **SQL Injection Prevention**: Prisma ORM provides protection

### Analytics Privacy
- **IP Hashing**: Stores IP addresses for analytics
- **Rate Limiting**: Prevents duplicate tracking within time windows
- **Data Minimization**: Only stores necessary analytics data

---

## Performance Optimizations

### Database Design
- **Indexing**: Proper indexes on frequently queried fields
- **Relationship Optimization**: Efficient foreign key relationships
- **Query Optimization**: Selective field querying to reduce data transfer

### Frontend Performance
- **Next.js App Router**: Server-side rendering and caching
- **Component Lazy Loading**: Optimized bundle sizes
- **Image Optimization**: Next.js Image component usage

### Analytics Efficiency
- **Batch Processing**: Transaction-based analytics logging
- **Time-based Queries**: Optimized date range queries
- **Aggregation**: Pre-computed statistics for dashboard

---

## Development Features

### Environment Setup
- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Hot Reload**: Development with Turbopack

### UI/UX
- **Dark Mode**: Complete dark/light theme support
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG compliance with Radix UI
- **Loading States**: Proper loading and error handling

### Deployment Ready
- **Environment Variables**: Proper configuration management
- **Database Migrations**: Prisma migration system
- **Build Optimization**: Production-ready builds

---

## Future Enhancement Opportunities

### Potential Features
1. **Custom Themes**: Allow users to customize profile appearance
2. **Link Scheduling**: Schedule links to appear/disappear at specific times
3. **QR Code Generation**: Generate QR codes for profiles
4. **Link Groups**: Organize links into categories
5. **Advanced Analytics**: Heatmaps, geographic data, device tracking
6. **Integration APIs**: Allow third-party integrations
7. **Team Accounts**: Multiple users managing one profile
8. **Monetization**: Premium features, analytics, custom domains

### Technical Improvements
1. **Caching Layer**: Redis for frequently accessed data
2. **CDN Integration**: For faster asset delivery
3. **Background Jobs**: For analytics processing
4. **Real-time Updates**: WebSocket for live analytics
5. **Mobile App**: React Native companion app

---

## File Structure

```
treebio/
├── app/
│   ├── (auth)/                 # Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (home)/                 # Landing page
│   ├── (profile)/              # Public profiles
│   │   └── [username]/
│   ├── admin/                  # Protected admin area
│   │   ├── my-tree/
│   │   └── overview/
│   ├── api/                    # API routes
│   │   └── og-data/
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/                 # Reusable components
│   ├── ui/                     # shadcn/ui components
│   ├── theme-provider.tsx      # Theme context
│   └── theme-toggle.tsx        # Theme switcher
├── modules/                    # Feature modules
│   ├── analytics/              # Analytics logic
│   ├── auth/                   # Authentication actions
│   ├── dashboard/              # Dashboard components
│   ├── home/                   # Home page components
│   ├── links/                  # Link management
│   └── profile/                # Profile management
├── lib/                        # Utility libraries
├── prisma/                     # Database schema & migrations
├── public/                     # Static assets
└── hooks/                      # Custom React hooks
```

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Clerk account for authentication

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run database migrations: `npx prisma migrate dev`
5. Start development server: `npm run dev`

### Environment Variables
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
CLERK_SECRET_KEY="..."
```

This documentation provides a comprehensive overview of the TreeBio project's architecture, features, and implementation details. The project is well-structured, scalable, and follows modern web development best practices.
