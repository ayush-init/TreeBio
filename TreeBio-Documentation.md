#  Project Documentation

## Project Overview

 This  is a comprehensive Next.js-based link-in-bio application built as a modern alternative to Linktree. It enables users to create personalized landing pages with multiple links, social media profiles, QR code generation, and provides detailed analytics tracking with customizable appearance settings.

### Tech Stack
- **Framework**: Next.js 15.4.4 with App Router and Turbopack
- **Authentication**: Clerk with complete user management
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **UI Components**: 47+ Radix UI primitives
- **Icons**: Lucide React (525+ icons)
- **Charts**: Recharts for analytics visualization
- **Theme**: Complete dark/light/system mode support with next-themes
- **Forms**: React Hook Form with Zod validation
- **QR Codes**: QRCode generation for profile sharing
- **Image Handling**: Cloudinary integration
- **Notifications**: Sonner for toast notifications

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
- theme: String (Default: "system") // "light", "dark", "system"
- buttonStyle: String (Default: "rounded") // "rounded", "pill", "minimal"
- createdAt: DateTime
- updatedAt: DateTime
```

#### Link Model
```typescript
- id: String (Primary Key)
- title: String
- url: String
- description: String? (Max 500 chars)
- image: String? (Max 500 chars, for link previews)
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

#### `/admin/qr` - QR Code Generation
- **File**: `app/admin/qr/page.tsx`
- **Purpose**: Generate QR codes for profile sharing
- **Features**:
  - Custom QR code generation for user profiles
  - High-quality QR code export
  - Profile URL integration
  - Customizable QR code styling

#### `/admin/settings` - Settings Management
- **File**: `app/admin/settings/page.tsx`
- **Purpose**: Comprehensive settings management
- **Features**:
  - Profile settings (name, bio, username, profile picture)
  - Appearance customization (theme, button styles)
  - Social links management
  - Account settings and preferences

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

### 6. QR Code Generation
- **Profile QR Codes**: Generate QR codes for easy profile sharing
- **Custom Styling**: Customizable QR code appearance
- **High Quality**: Export-ready QR code images
- **URL Integration**: Automatic profile URL embedding

### 7. Settings & Customization
- **Profile Management**: Complete control over profile information
- **Appearance Settings**: Theme selection (light/dark/system)
- **Button Styles**: Customizable button appearances (rounded/pill/minimal)
- **Social Links Management**: Add/edit/remove social media profiles
- **Account Preferences**: User preferences and settings

### 8. Admin Dashboard
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

### Settings Module (`modules/settings/`)
- `updateProfileSettings()`: Update user profile information
- `updateAppearanceSettings()`: Customize theme and button styles
- `addSocialLink()` / `deleteSocialLink()`: Manage social media links
- `getSettingsData()`: Retrieve all user settings
- `deleteAccount()`: Account deletion (with verification)

### QR Code Module (`modules/qr/`)
- `generateQRCode()`: Generate QR codes for user profiles
- `getUserProfileData()`: Get profile data for QR generation

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

### UI/UX Features
- **Dark Mode**: Complete dark/light/system theme support
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Accessibility**: WCAG compliance with Radix UI components
- **Loading States**: Skeleton loaders and proper error handling
- **Form Validation**: Zod schema validation with React Hook Form
- **Toast Notifications**: Sonner for user feedback
- **Component Library**: 47+ reusable shadcn/ui components

### Development Experience
- **TypeScript**: Full type safety across the application
- **ESLint**: Code quality and consistency enforcement
- **Hot Reload**: Development with Turbopack for faster builds
- **Component Structure**: Modular architecture with clear separation

### Analytics Efficiency
- **Batch Processing**: Transaction-based analytics logging
- **Time-based Queries**: Optimized date range queries
- **Aggregation**: Pre-computed statistics for dashboard

---

## Advanced Features & Integrations

### Social Media Integration
- **Platform Support**: Instagram, YouTube, Twitter, LinkedIn, GitHub, Email, and more
- **Icon Mapping**: Automatic icon selection based on platform
- **Custom Platforms**: Support for custom social media platforms
- **Link Validation**: URL validation for social media links

### Link Preview System
- **Open Graph Fetching**: Automatic metadata extraction from URLs
- **Image Previews**: Rich link previews with thumbnails
- **Title & Description**: Automatic extraction of page metadata
- **Fallback Handling**: Graceful handling of unavailable previews

### QR Code System
- **Profile Sharing**: QR codes for easy profile sharing
- **Custom Styling**: Customizable colors and appearance
- **High Resolution**: Export-ready QR code images
- **URL Generation**: Automatic profile URL creation

---

## Component Architecture

### UI Component Library
The project uses **47+ shadcn/ui components** built on Radix UI primitives:
- **Form Components**: Input, Select, Checkbox, Radio, Textarea
- **Navigation**: Sidebar, Menubar, Breadcrumb, Pagination
- **Feedback**: Alert, Dialog, Drawer, Toast (Sonner)
- **Data Display**: Table, Card, Badge, Avatar, Skeleton
- **Charts**: Recharts integration for analytics
- **Layout**: Separator, Scroll Area, Resizable Panels

### Module Structure
```
modules/
├── analytics/     # Analytics tracking and reporting
├── auth/          # Authentication and user onboarding
├── dashboard/     # Dashboard components and layouts
├── home/          # Landing page components
├── links/         # Link management and preview
├── profile/       # Public profile display
├── qr/            # QR code generation
└── settings/      # Settings and preferences
```

---

## Future Enhancement Opportunities

### Potential Features
1. **Advanced Customization**: Enhanced profile themes and layouts
2. **Link Scheduling**: Schedule links to appear/disappear at specific times
3. **Link Groups**: Organize links into categories and folders
4. **Advanced Analytics**: Heatmaps, geographic data, device tracking
5. **Integration APIs**: Allow third-party integrations and webhooks
6. **Team Accounts**: Multiple users managing one profile
7. **Monetization**: Premium features, advanced analytics, custom domains
8. **Mobile App**: React Native companion application
9. **Email Campaigns**: Newsletter integration and email marketing
10. **A/B Testing**: Test different profile layouts and link placements

### Technical Improvements
1. **Caching Layer**: Redis for frequently accessed data
2. **CDN Integration**: For faster asset delivery
3. **Background Jobs**: For analytics processing and email campaigns
4. **Real-time Updates**: WebSocket for live analytics and notifications
5. **Performance Monitoring**: Integration with APM tools
6. **API Rate Limiting**: Prevent abuse and ensure stability
7. **Database Optimization**: Query optimization and connection pooling

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
│   │   ├── my-tree/            # Link management
│   │   ├── overview/           # Analytics dashboard
│   │   ├── qr/                 # QR code generation
│   │   └── settings/           # Settings management
│   ├── api/                    # API routes
│   │   └── og-data/           # Open Graph data fetcher
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/                 # Reusable components
│   ├── ui/                     # shadcn/ui components (47+ components)
│   ├── theme-provider.tsx      # Theme context
│   └── theme-toggle.tsx        # Theme switcher
├── modules/                    # Feature modules
│   ├── analytics/              # Analytics logic and components
│   ├── auth/                   # Authentication actions
│   ├── dashboard/              # Dashboard components
│   ├── home/                   # Home page components
│   ├── links/                  # Link management and preview
│   ├── profile/                # Profile management
│   ├── qr/                     # QR code generation
│   └── settings/               # Settings and preferences
├── lib/                        # Utility libraries
│   ├── db.ts                   # Database connection
│   ├── utils.ts                # Utility functions
│   └── cloudinary.ts           # Image handling
├── prisma/                     # Database schema & migrations
├── public/                     # Static assets
├── hooks/                      # Custom React hooks
└── middleware.ts               # Clerk authentication middleware
```

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Clerk account for authentication
- Cloudinary account (for image handling)

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see below)
4. Run database migrations: `npx prisma migrate dev`
5. Start development server: `npm run dev`

### Environment Variables
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
CLERK_SECRET_KEY="..."
NEXT_PUBLIC_APP_URL="http://localhost:3000" # or your production URL
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

### Development Commands
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio
npx prisma migrate dev  # Run database migrations
```

---

## Project Statistics & Metrics

### Codebase Overview
- **Total Files**: 200+ files including components, modules, and configurations
- **UI Components**: 47+ shadcn/ui components
- **Modules**: 8 feature modules with clear separation of concerns
- **Database Models**: 5 main models with optimized relationships
- **API Endpoints**: RESTful API with Open Graph integration
- **Pages**: 8 main pages with authentication protection

### Dependencies Summary
- **Production Dependencies**: 65 packages
- **Development Dependencies**: 8 packages
- **Core Technologies**: Next.js, React, TypeScript, Prisma, Clerk
- **UI Framework**: Tailwind CSS v4, Radix UI, Lucide React
- **Analytics**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation

---

## Security & Best Practices

### Authentication Security
- **Clerk Integration**: Enterprise-grade authentication
- **Route Protection**: Middleware-based route protection
- **Session Management**: Secure session handling
- **User Isolation**: Proper data access controls

### Data Security
- **Input Validation**: Zod schema validation throughout
- **SQL Injection Prevention**: Prisma ORM protection
- **XSS Prevention**: React's built-in protections
- **CSRF Protection**: Next.js built-in CSRF protection

### Privacy & Analytics
- **IP Hashing**: Secure IP storage for analytics
- **Rate Limiting**: Prevention of duplicate tracking
- **Data Minimization**: Only essential data collection
- **GDPR Compliance**: Privacy-focused design

---

This comprehensive documentation showcases TreeBio as a production-ready, feature-rich link-in-bio platform with modern architecture, extensive functionality, and excellent development practices. The project demonstrates expertise in full-stack development with Next.js, proper database design, and user experience optimization.
