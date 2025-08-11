# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Setup

This is a React-based personal portfolio website built with Create React App and styled with Tailwind CSS.

### Required Node.js Version
- Node.js >= 14.17.0 (use nvm if available)

### Development Commands
- `npm run setup` - Clean environment and install dependencies (removes node_modules, clears cache)
- `npm start` - Start development server (typically runs on localhost:3000)
- `npm run build` - Create production build
- `npm test` - Run test suite with Jest
- `npm run eject` - Eject from Create React App (irreversible)

### Environment Setup Issues
If encountering installation or dependency issues:
1. Delete `node_modules` folder
2. Run `npm cache clean --force`
3. Run `npm install`

## Architecture Overview

### Single Page Application Structure
The app uses React Router but implements a custom navigation system with state-based section switching rather than traditional routing. All content sections (Home, Projects, Blog, Contact) are rendered conditionally based on `currentSection` state.

### Key Components
- **App.js**: Main component containing all page sections as functions
  - `HomePage()` - About/bio section with hero layout
  - `ProjectsPage()` - UX/design project showcase
  - `BlogPage()` - Blog posts with categorization
  - `ContactPage()` - Contact form and social links
- **Navigation**: Custom button-based navigation (not Link components)
- **Theme**: Dark mode enabled by default with toggle functionality

### Styling Architecture
- **Tailwind CSS**: Primary styling framework
- **PostCSS**: Build tool integration via `postcss.config.js`
- **Dark Mode**: Controlled via React state with `document.documentElement.classList`
- **Responsive Design**: Mobile-first approach with breakpoint prefixes (lg:, md:)

### Data Structure
Static data arrays defined in App.js:
- `projects[]` - Portfolio projects with metadata (title, description, role, methods)
- `blogPosts[]` - Blog entries with categorization and reading time

### Dependencies
- **React 18.3.1** with Router DOM 6.26.2
- **Tailwind CSS 3.x** with PostCSS and Autoprefixer
- **Lucide React** for iconography
- **Testing Library** suite for testing

## Development Notes

### Navigation Behavior
The app uses simple state-based navigation with `setCurrentSection()` state changes. This means:
- No URL changes when navigating
- No browser back/forward functionality
- All sections mount/unmount on navigation
- React Router has been removed as it was not being used properly

### Dark Mode Implementation
Dark mode is enabled by default and toggleable via state. The implementation:
- Uses `document.documentElement.classList` for Tailwind dark mode
- Properly removes/adds 'dark' class based on state
- Component-level conditional styling for theme switching

### Contact Form
The contact form now includes:
- Form validation (requires all fields)
- Simulated submission with loading states
- Success/error message display
- Form reset after successful submission
- Data is logged to console (placeholder for real submission)

### Search Functionality
Search feature includes:
- Toggle search bar via search icon
- Form submission shows alert with search query
- Auto-focus when search bar opens
- Placeholder functionality for future implementation

### Image Placeholders
All images currently use placeholder URLs (`https://via.placeholder.com/`) and will need to be replaced with actual assets.

### Recent Fixes Applied
- Removed duplicate dependencies from package.json
- Fixed dark mode toggle logic
- Removed unused React Router dependency
- Added functional contact form with validation
- Added search functionality placeholder
- Updated tests to match current content