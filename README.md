# Baltic Climate Action Platform

The Baltic Climate Action Platform is a full-stack web application that empowers communities across the Baltic Sea region to visualize climate risks, organize climate actions, and collaborate on environmental solutions. The platform combines interactive climate data visualization with a comprehensive community engagement system, enabling users to create, join, and track climate initiatives while building a network of climate activists across Nordic and Baltic countries.

## Project Overview

The Baltic Climate Action Platform integrates climate data visualization, community organizing, and impact tracking in the following comprehensive workflow:

1. **Interactive Climate Risk Visualization** - Display real-time climate data including sea-level rise, coastal erosion, temperature changes, and pollution levels across the Baltic Sea region
2. **Community Action Creation** - Enable users to create and organize climate actions including citizen science projects, workshops, protests, and local initiatives
3. **Geographic Action Discovery** - Provide location-based discovery of climate actions with interactive mapping and filtering capabilities
4. **User Authentication & Profiles** - Support user registration, authentication, and personalized profiles with activism tracking
5. **Participation Tracking** - Track user participation in climate actions with achievement systems and impact scoring
6. **Resource Sharing** - Allow sharing of educational materials, tools, and resources related to climate actions
7. **Cross-Border Collaboration** - Facilitate collaboration between climate activists across Baltic Sea region countries
8. **Success Story Showcase** - Highlight real-world climate success stories from the Baltic region to inspire action

This platform provides an intuitive, all-in-one climate action organizing experience that bridges the gap between climate data awareness and community-driven environmental solutions.

## Project Structure

```
├── backend/                     # Django REST API backend
│   ├── manage.py               # Django management script
│   ├── requirements.txt        # Python dependencies
│   ├── db.sqlite3             # SQLite database
│   ├── baltic_climate/        # Django project settings
│   │   ├── __init__.py        # Python package initialization
│   │   ├── settings.py        # Configuration and database setup
│   │   ├── urls.py            # Main URL routing
│   │   ├── wsgi.py            # WSGI configuration
│   │   └── asgi.py            # ASGI configuration
│   ├── accounts/              # User authentication and profiles
│   │   ├── __init__.py        # Python package initialization
│   │   ├── models.py          # User model with activism tracking
│   │   ├── views.py           # Authentication API endpoints
│   │   ├── serializers.py     # User data serialization
│   │   ├── urls.py            # Auth-related URL patterns
│   │   ├── admin.py           # Django admin configuration
│   │   ├── apps.py            # App configuration
│   │   ├── tests.py           # Unit tests
│   │   └── migrations/        # Database migrations
│   │       └── __init__.py    # Migration package initialization
│   ├── climate_data/          # Climate data models and API
│   │   ├── __init__.py        # Python package initialization
│   │   ├── models.py          # Climate data point, risk areas, weather data
│   │   ├── views.py           # Climate data API endpoints
│   │   ├── serializers.py     # Climate data serialization
│   │   ├── urls.py            # Climate data URL patterns
│   │   ├── admin.py           # Django admin configuration
│   │   ├── apps.py            # App configuration
│   │   ├── tests.py           # Unit tests
│   │   └── migrations/        # Database migrations
│   │       └── __init__.py    # Migration package initialization
│   └── actions/               # Climate action management
│       ├── __init__.py        # Python package initialization
│       ├── models.py          # Action, participation, resource models
│       ├── views.py           # Action management API endpoints
│       ├── serializers.py     # Action data serialization
│       ├── urls.py            # Action-related URL patterns
│       ├── admin.py           # Django admin configuration
│       ├── apps.py            # App configuration
│       ├── tests.py           # Unit tests
│       └── migrations/        # Database migrations
│           └── __init__.py    # Migration package initialization
├── frontend/                  # React TypeScript frontend
│   ├── package.json           # Node.js dependencies and scripts
│   ├── package-lock.json      # Locked dependency versions
│   ├── tsconfig.json          # TypeScript configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── postcss.config.js      # PostCSS configuration
│   ├── .env.example           # Environment variables template
│   ├── .gitignore             # Git ignore rules for frontend
│   ├── README.md              # Frontend-specific documentation
│   ├── public/                # Static assets and data
│   │   ├── index.html         # HTML template
│   │   ├── manifest.json      # Web app manifest
│   │   ├── robots.txt         # Search engine crawling rules
│   │   ├── logo.ico           # Application favicon
│   │   ├── logo.jpeg          # Application logo
│   │   ├── baltic_highlight.geojson # Baltic Sea geographic data
│   │   ├── story1.jpeg        # Success story images
│   │   ├── story2.jpeg        # Success story images
│   │   └── story3.jpeg        # Success story images
│   └── src/                   # React application source
│       ├── index.tsx          # Application entry point
│       ├── App.tsx            # Main application component
│       ├── App.css            # Application styles
│       ├── index.css          # Global styles
│       ├── App.test.tsx       # Application tests
│       ├── logo.svg           # React logo
│       ├── react-app-env.d.ts # React TypeScript definitions
│       ├── reportWebVitals.ts # Performance monitoring
│       ├── setupTests.ts      # Test setup configuration
│       ├── components/        # Reusable React components
│       │   ├── Auth/          # Authentication components
│       │   │   └── ProtectedRoute.tsx # Route protection component
│       │   ├── Layout/        # Navigation and layout components
│       │   │   └── Navbar.tsx # Navigation bar component
│       │   ├── CallForActionMap.tsx   # Action map visualization
│       │   ├── CallForActionMarker.tsx # Map action markers
│       │   ├── HeatmapLayer.tsx       # Climate data heatmap
│       │   └── MapClickHandler.tsx    # Map interaction handler
│       ├── pages/             # Page-level components
│       │   ├── LandingPage.tsx        # Homepage with success stories
│       │   ├── MapPage.tsx            # Interactive climate map
│       │   ├── MapPage.css            # Map page specific styles
│       │   ├── CallToActionPage.tsx   # Action listing and discovery
│       │   ├── CreateActionPage.tsx   # Action creation form
│       │   ├── ActionDetailPage.tsx   # Individual action details
│       │   ├── ProfilePage.tsx        # User profile and stats
│       │   ├── LoginPage.tsx          # User authentication
│       │   └── RegisterPage.tsx       # User registration
│       ├── contexts/          # React context providers
│       │   └── AuthContext.tsx        # Authentication context
│       ├── data/              # Static data and mock datasets
│       │   ├── callForActions.ts      # Climate action data
│       │   ├── seaLevelRise.ts        # Sea level rise data
│       │   ├── pollution.ts           # Pollution risk data
│       │   └── corrosion.ts           # Corrosion risk data
│       ├── hooks/             # Custom React hooks
│       │   └── useClimateRiskClick.ts # Climate risk interaction hook
│       ├── services/          # API service functions
│       │   └── climateRiskService.ts  # Climate data API client
│       ├── utils/             # Utility functions
│       │   └── balticSeaRegion.ts     # Baltic Sea region utilities
│       └── devTools/          # Development utilities
│           └── getCoordsList/ # Coordinate extraction tools
│               └── index.html # Development coordinate tool
├── .git/                      # Git repository metadata
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

## System Architecture

The Baltic Climate Action Platform consists of the following key modules working together to provide end-to-end climate action organizing and data visualization:

### Architecture Diagram

```
[ User Browser ]
       |
       v
[ React Frontend (TypeScript) ]
       |
       v
[ Django REST API Backend ]
       |
       |---> [ Authentication System ]
       |         |
       |         v
       |    [ JWT Token Management ]
       |         |
       |         v
       |    [ User Profile & Activity Tracking ]
       |
       |---> [ Climate Data API ]
       |         |
       |         v
       |    [ Geographic Climate Risk Data ]
       |         |
       |         v
       |    [ Weather Data Integration ]
       |
       |---> [ Climate Action Management ]
       |         |
       |         v
       |    [ Action Creation & Discovery ]
       |         |
       |         v
       |    [ Participation Tracking ]
       |
       |---> [ Interactive Map Visualization ]
       |         |
       |         v
       |    [ Leaflet.js with Climate Overlays ]
       |         |
       |         v
       |    [ Heatmap & Risk Area Rendering ]
       |
       v
[ SQLite Database ]
```

### Component Overview

**Frontend (React + TypeScript):**

Provides a modern, responsive user interface built with React 19 and TypeScript for type safety. Uses Tailwind CSS for consistent styling and Framer Motion for smooth animations. The frontend includes interactive maps powered by Leaflet.js for climate data visualization and action discovery.

**Django REST API Backend:**

Manages all server-side logic including user authentication, climate data storage, and action management. Built with Django 5.2 and Django REST Framework for robust API development. Uses JWT tokens for secure authentication and CORS headers for frontend communication.

**Authentication System:**

Custom user model extending Django's built-in authentication with climate activism tracking fields. Supports user registration, login, profile management, and activity tracking with achievement systems.

**Climate Data Management:**

Stores and serves climate risk data including sea-level rise projections, temperature changes, coastal erosion risks, and pollution levels. Integrates weather data for comprehensive environmental monitoring across the Baltic Sea region.

**Action Management System:**

Comprehensive system for creating, discovering, and participating in climate actions. Supports various action types including citizen science, workshops, protests, and community initiatives. Tracks participation, resources, and impact metrics.

**Interactive Mapping:**

Leaflet.js-based mapping system with custom overlays for climate risk visualization. Includes heatmap layers for pollution and risk data, geographic boundaries for the Baltic Sea region, and interactive markers for climate actions.

**Database Layer:**

SQLite database for development with models for users, climate data, actions, and participation tracking. Designed to be easily migrated to PostgreSQL for production deployment.

## Installation & Setup

### Prerequisites

Make sure you have the following installed:
- **Python 3.8+** for the Django backend
- **Node.js 16+** and **npm** for the React frontend
- **Git** for version control

### Backend Setup

1. **Navigate to the backend directory:**
```bash
cd backend
```

2. **Create a virtual environment:**
```bash
# macOS / Linux
python -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

3. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables:**
Create a `.env` file in the backend directory:
```bash
# Django Configuration
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database Configuration (optional for SQLite)
# DATABASE_URL=sqlite:///db.sqlite3
```

5. **Run database migrations:**
```bash
python manage.py migrate
```

6. **Create a superuser (optional):**
```bash
python manage.py createsuperuser
```

7. **Start the Django development server:**
```bash
python manage.py runserver
```

The backend API will be available at `http://127.0.0.1:8000/`

### Frontend Setup

1. **Navigate to the frontend directory:**
```bash
cd frontend
```

2. **Install Node.js dependencies with legacy peer deps flag:**
```bash
npm install --legacy-peer-deps
```

**Note:** The `--legacy-peer-deps` flag is required due to version conflicts between React 19.1.0 and some dependencies that haven't updated their peer dependency requirements yet.

3. **Configure environment variables (optional):**
Copy the example environment file and customize as needed:
```bash
cp .env.example .env
```

4. **Start the React development server:**
```bash
npm start
```

The frontend application will be available at `http://localhost:3000/`

### Full Application Access

Once both servers are running:
- **Frontend**: `http://localhost:3000/` - Main application interface
- **Backend API**: `http://127.0.0.1:8000/` - REST API endpoints
- **Django Admin**: `http://127.0.0.1:8000/admin/` - Admin interface (if superuser created)

## API Endpoints and Features

The platform provides comprehensive REST API endpoints for all functionality:

### Authentication Endpoints
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login (JWT token)
- `POST /api/auth/refresh/` - Token refresh
- `GET /api/auth/profile/` - User profile
- `PUT /api/auth/profile/` - Update profile

### Climate Data Endpoints
- `GET /api/climate/data-points/` - Climate risk data points
- `GET /api/climate/risk-areas/` - Climate risk areas
- `GET /api/climate/weather-data/` - Weather data
- `GET /api/climate/data-points/?country=Denmark` - Filter by country

### Climate Action Endpoints
- `GET /api/actions/` - List all climate actions
- `POST /api/actions/` - Create new climate action
- `GET /api/actions/{id}/` - Action details
- `PUT /api/actions/{id}/` - Update action
- `POST /api/actions/{id}/participate/` - Join action
- `GET /api/actions/{id}/participants/` - Action participants
- `GET /api/actions/?type=workshop&status=upcoming` - Filter actions

## Technology Stack and Dependencies

### Backend Dependencies
```python
Django==5.2                    # Web framework
djangorestframework==3.16.0    # REST API framework
djangorestframework_simplejwt==5.5.1  # JWT authentication
python-decouple==3.8          # Environment management
requests==2.31.0              # HTTP requests
django-cors-headers==4.4.0    # CORS handling
```

### Frontend Dependencies
```json
{
  "react": "^19.1.0",                    // Core React library
  "react-dom": "^19.1.0",               // React DOM rendering
  "typescript": "^4.9.5",               // TypeScript support
  "react-router-dom": "^7.7.1",         // Client-side routing
  "axios": "^1.11.0",                   // HTTP client
  "leaflet": "^1.9.4",                  // Interactive maps
  "react-leaflet": "^5.0.0",            // React Leaflet integration
  "leaflet.heat": "^0.2.0",             // Heatmap visualization
  "framer-motion": "^12.23.9",          // Animation library
  "tailwindcss": "^3.4.17",             // CSS framework
  "lucide-react": "^0.525.0"            // Icon library
}
```

### Development Tools
- **Create React App** - React application bootstrapping
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **Django Debug Toolbar** - Backend debugging (optional)

## Climate Data Sources and Geographic Focus

The platform focuses specifically on the **Baltic Sea Region** and includes data for:

### Countries Covered
- **Denmark** 🇩🇰 - Copenhagen and surrounding areas
- **Sweden** 🇸🇪 - Stockholm, Göteborg, Malmö regions
- **Finland** 🇫🇮 - Helsinki, Turku, and southern coastline
- **Estonia** 🇪🇪 - Tallinn and coastal areas
- **Latvia** 🇱🇻 - Riga and Baltic coastline
- **Lithuania** 🇱🇹 - Vilnius, Klaipėda regions
- **Poland** 🇵🇱 - Gdańsk, Szczecin coastal areas
- **Germany** 🇩🇪 - Northern coastal regions

### Climate Risk Data Types
- **Sea Level Rise Projections** - Measured in meters with timeline forecasts
- **Coastal Erosion Risk** - Categorized as low, medium, high risk levels
- **Temperature Increase** - Average temperature change in Celsius
- **Flood Risk Assessment** - Geographic flood-prone area identification
- **Pollution Levels** - Air and water quality measurements
- **Corrosion Risk** - Infrastructure impact from climate change

### Data Integration
The platform is designed to integrate with various climate data sources and can be extended to include:
- **Real-time weather APIs** for current conditions
- **Historical climate databases** for trend analysis
- **Satellite imagery** for environmental monitoring
- **Government climate data** from Baltic region countries
- **Research institution datasets** for scientific accuracy

## Community Features and Gamification

### User Achievement System
Users earn achievements based on their climate activism:
- **Climate Champion** - Active participation in multiple actions
- **Community Builder** - Organizing successful climate events
- **Citizen Scientist** - Contributing to data collection initiatives
- **Event Organizer** - Creating and managing climate actions
- **Mentor** - Helping other users get involved
- **Climate Advocate** - Promoting climate awareness

### Impact Tracking
- **Actions Joined** - Count of participated climate actions
- **Actions Organized** - Count of events created and managed
- **Impact Score** - Calculated based on participation and organization
- **Contribution Hours** - Tracked volunteer time commitment
- **Activity Graph** - Daily contribution visualization similar to GitHub

### Action Types Supported
- **Citizen Science** - Data collection and research projects
- **Local Climate Assembly** - Community decision-making forums
- **Lifestyle Changes** - Personal and community behavior change
- **Workshops/Events** - Educational and skill-building sessions
- **NGO Initiatives** - Non-profit organization projects
- **Resource Sharing** - Tool and knowledge sharing platforms
- **Participatory Budgeting** - Community funding decisions
- **Hackathons** - Technology and innovation events
- **Climate Protests** - Advocacy and awareness demonstrations
- **Educational Seminars** - Learning and awareness events

## Success Stories Integration

The platform showcases real success stories from the Baltic region:

### Featured Success Stories
1. **Green Kayak Initiative** 🚣‍♀️
   - **Location**: Copenhagen, Denmark & Baltic cities
   - **Impact**: 150,000kg+ waste removed from Baltic waters
   - **Method**: Free kayak rental in exchange for waste collection
   - **Timeframe**: 2017-2025

2. **MyForest Latvia** 🌲
   - **Location**: Riga, Latvia
   - **Impact**: 60,000+ hectares of urban forest managed
   - **Method**: Citizen-funded reforestation and urban forestry
   - **Certification**: FSC certified sustainable management

3. **Additional Stories** - Platform supports adding more success stories to inspire community action and demonstrate the effectiveness of climate initiatives across the Baltic region.

## Development and Deployment Notes

### Legacy Dependency Handling
The frontend uses React 19.1.0 with some packages that haven't updated their peer dependencies. Always use:
```bash
npm install --legacy-peer-deps
```

### Database Considerations
- **Development**: SQLite database included for easy setup
- **Production**: Recommend PostgreSQL with PostGIS for geographic features
- **Migrations**: Django migrations handle schema changes automatically

### Environment Configuration
The backend uses `python-decouple` for environment management. Create `.env` files for different deployment environments:
```bash
# Development
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Production
DEBUG=False
ALLOWED_HOSTS=yourdomain.com
DATABASE_URL=postgresql://user:pass@host:port/dbname
```

### API Versioning
Current API is unversioned (`/api/`). For production, consider:
```python
# Future API versioning
path("api/v1/auth/", include("accounts.urls")),
path("api/v1/climate/", include("climate_data.urls")),
path("api/v1/actions/", include("actions.urls")),
```

## Contributing and Extension

### Adding New Climate Data Sources
1. Extend models in `backend/climate_data/models.py`
2. Create serializers in `backend/climate_data/serializers.py`
3. Add API endpoints in `backend/climate_data/views.py`
4. Update frontend data services in `frontend/src/services/`

### Adding New Action Types
1. Update `ACTION_TYPES` choices in `backend/actions/models.py`
2. Add corresponding frontend filtering logic
3. Create specialized UI components if needed

### Internationalization
The platform is designed for multiple countries and can be extended with:
- **Django i18n** for backend internationalization
- **React i18n** libraries for frontend translations
- **Multi-language content** management for actions and data

### Custom Map Layers
Add new climate visualization layers by:
1. Creating data sources in `frontend/src/data/`
2. Implementing React components in `frontend/src/components/`
3. Integrating with Leaflet.js mapping system

## Built for Baltic Hackathon 2025

This platform was developed as part of the Baltic Hackathon 2025, focusing on empowering communities across the Baltic Sea region to take action on climate change through technology, data visualization, and community organizing.

**Project Goals:**
- Bridge the gap between climate data and community action
- Enable cross-border collaboration on climate initiatives
- Gamify climate activism to increase engagement
- Showcase successful climate solutions from the Baltic region
- Provide accessible tools for non-technical climate activists

**Regional Focus:**
The platform specifically addresses climate challenges in the Baltic Sea region, including sea-level rise, coastal erosion, and urban climate adaptation, while celebrating the collaborative spirit of Nordic and Baltic countries in addressing environmental challenges.

---

**Note**: This project uses legacy peer dependencies (`npm install --legacy-peer-deps`) due to React 19 compatibility with some map visualization libraries. This is a temporary requirement until ecosystem packages update their peer dependency specifications.
