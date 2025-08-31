# Portfolio Admin Dashboard

A modern portfolio management system built with Laravel, Inertia.js, React, and TypeScript. This application provides a comprehensive admin dashboard for managing portfolio projects with a clean, responsive interface.

## Features

### Admin Dashboard
- **Project Management**: Full CRUD operations for portfolio projects
- **Bulk Operations**: Mass delete functionality with validation
- **Featured Projects**: Mark projects as featured with automatic ordering
- **Responsive Design**: Mobile-friendly interface with sidebar navigation

### Project Features
- **Icon Integration**: Lucide icon support for project branding
- **GitHub Integration**: Automatic GitHub URL formatting (enter `username/project`, saves as full URL)
- **Project Dating**: Date-based project ordering
- **Detailed Descriptions**: Rich text descriptions with markdown support
- **Demo Links**: Live demo and repository links

### Security & Authentication
- **Secure Admin Access**: Protected admin routes with authentication middleware
- **Disabled Public Registration**: Only admins can create accounts via command line
- **Admin User Creation**: Artisan command for creating admin users with password confirmation
- **Email Verification**: Automatic email verification for admin users

## Technology Stack

- **Backend**: Laravel 12 with PHP 8.2+
- **Frontend**: React 19 with TypeScript
- **Routing**: Inertia.js for seamless SPA experience
- **Styling**: Tailwind CSS with custom components
- **Database**: configurable
- **UI Components**: Leverages shadcn/ui component library as well as custom additions
- **Build Tool**: Vite for fast development and optimized builds

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database setup**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

5. **Create admin user**
   ```bash
   php artisan admin:create
   ```

6. **Build assets**
   ```bash
   npm run build
   ```

## Development

Start the development servers:

```bash
# Laravel development server
php artisan serve

# Vite development server (in another terminal)
npm run dev
```

## Admin Commands

### Create Admin User
Create a new admin user with interactive prompts:
```bash
php artisan admin:create
```

Or with parameters (advise against password parameter for security):
```bash
php artisan admin:create --name="Admin Name" --email="admin@example.com" --password="secure-password"
```

### Generate Icon Bundle
Regenerate the icon bundle (automatically triggered on project saves):
```bash
php artisan icons:generate
```

## Project Structure

```
├── app/
│   ├── Console/Commands/          # Artisan commands
│   ├── Http/
│   │   ├── Controllers/Admin/     # Admin controllers
│   │   └── Requests/Admin/        # Form request validation
│   └── Models/                    # Eloquent models
├── resources/
│   ├── js/
│   │   ├── components/admin/      # Admin components
│   │   ├── layouts/               # Layout components
│   │   ├── pages/admin/           # Admin pages
│   │   └── hooks/                 # Custom React hooks
│   └── css/                       # Stylesheets
├── routes/
│   ├── admin.php                  # Admin routes
│   └── auth.php                   # Authentication routes
└── database/
    └── migrations/                # Database migrations
```

## API Endpoints

### Admin Routes (Protected)
- `GET /` - Admin dashboard
- `GET /projects` - Project index
- `POST /projects` - Create project
- `GET /projects/{project}` - View project
- `PUT /projects/{project}` - Update project
- `DELETE /projects/{project}` - Delete project
- `DELETE /projects/bulk-delete` - Bulk delete projects

## Database Schema

### Projects Table
- `id` - Primary key
- `icon_name` - Lucide icon identifier
- `title` - Project title
- `subtitle` - Brief description
- `description` - Detailed description
- `repo_link` - GitHub repository URL
- `demo_link` - Live demo URL
- `featured` - Featured status (boolean)
- `date` - Project date
- `created_at` / `updated_at` - Timestamps


- Planning to implement draft/published/archived status

## Features in Detail

### Breadcrumb System
Dynamic breadcrumb navigation with hierarchical structure:
- Dashboard → Projects → Create Project
- Automatic parent-child relationships
- Clean API: `getBreadcrumbs('create_project')`

### Form Validation
Comprehensive validation system:
- Server-side validation with Laravel Form Requests
- Real-time error display in React components
- Automatic GitHub URL processing
- Required field validation with user-friendly messages

### Project Ordering
Intelligent project ordering:
- Featured projects displayed first
- Date-based secondary sorting (newest first)
- Implemented via Eloquent scopes for consistency

## License

This project is proprietary and confidential.