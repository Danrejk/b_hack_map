# Visualising Baltic (VisBaltic)

Visualising Baltic (VisBaltic) is a full-stack web application that empowers communities across the Baltic Sea region to visualize climate risks, organize climate actions, and collaborate on environmental solutions. The platform combines interactive climate data visualization with a comprehensive community engagement system, enabling users to create, join, and track climate initiatives while building a network of climate activists across Nordic and Baltic countries.

## Project Overview

Visualising Baltic integrates climate data visualization, community organizing, and impact tracking in the following comprehensive workflow:

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
├── backend/ # Django REST API backend
│ ├── manage.py # Django management script
│ ├── requirements.txt # Python dependencies
│ ├── db.sqlite3 # SQLite database
│ ├── visbaltic/ # Django project settings (renamed from baltic_climate)
│ │ ├── init.py # Python package initialization
│ │ ├── settings.py # Configuration and database setup
│ │ ├── urls.py # Main URL routing
│ │ ├── wsgi.py # WSGI configuration
│ │ └── asgi.py # ASGI configuration
│ ├── accounts/ # User authentication and profiles
│ │ ├── init.py # Python package initialization
│ │ ├── models.py # User model with activism tracking
│ │ ├── views.py # Authentication API endpoints
│ │ ├── serializers.py # User data serialization
│ │ ├── urls.py # Auth-related URL patterns
│ │ ├── admin.py # Django admin configuration
│ │ ├── apps.py # App configuration
│ │ ├── tests.py # Unit tests
│ │ └── migrations/ # Database migrations
│ │ └── init.py # Migration package initialization
│ ├── climate_data/ # Climate data models and API
│ │ ├── init.py # Python package initialization
│ │ ├── models.py # Climate data point, risk areas, weather data
│ │ ├── views.py # Climate data API endpoints
│ │ ├── serializers.py # Climate data serialization
│ │ ├── urls.py # Climate data URL patterns
│ │ ├── admin.py # Django admin configuration
│ │ ├── apps.py # App configuration
│ │ ├── tests.py # Unit tests
│ │ └── migrations/ # Database migrations
│ │ └── init.py # Migration package initialization
│ └── actions/ # Climate action management
│ ├── init.py # Python package initialization
│ ├── models.py # Action, participation, resource models
│ ├── views.py # Action management API endpoints
│ ├── serializers.py # Action data serialization
│ ├── urls.py # Action-related URL patterns
│ ├── admin.py # Django admin configuration
│ ├── apps.py # App configuration
│ ├── tests.py # Unit tests
│ └── migrations/ # Database migrations
│ └── init.py # Migration package initialization
├── frontend/ # React TypeScript frontend
│ ├── package.json # Node.js dependencies and scripts
│ ├── package-lock.json # Locked dependency versions
│ ├── tsconfig.json # TypeScript configuration
│ ├── tailwind.config.js # Tailwind CSS configuration
│ ├── postcss.config.js # PostCSS configuration
│ ├── .env.example # Environment variables template
│ ├── .gitignore # Git ignore rules for frontend
│ ├── README.md # Frontend-specific documentation
│ ├── public/ # Static assets and data
│ │ ├── index.html # HTML template
│ │ ├── manifest.json # Web app manifest
│ │ ├── robots.txt # Search engine crawling rules
│ │ ├── logo.ico # Application favicon
│ │ ├── logo.jpeg # Application logo
│ │ ├── baltic_highlight.geojson # Baltic Sea geographic data
│ │ ├── story1.jpeg # Success story images
│ │ ├── story2.jpeg # Success story images
│ │ └── story3.jpeg # Success story images
│ └── src/ # React application source
│ ├── index.tsx # Application entry point
│ ├── App.tsx # Main application component
│ ├── App.css # Application styles
│ ├── index.css # Global styles
│ ├── App.test.tsx # Application tests
│ ├── logo.svg # React logo
│ ├── react-app-env.d.ts # React TypeScript definitions
│ ├── reportWebVitals.ts # Performance monitoring
│ ├── setupTests.ts # Test setup configuration
│ ├── components/ # Reusable React components
│ │ ├── Auth/ # Authentication components
│ │ │ └── ProtectedRoute.tsx # Route protection component
│ │ ├── Layout/ # Navigation and layout components
│ │ │ └── Navbar.tsx # Navigation bar component
│ │ ├── CallForActionMap.tsx # Action map visualization
│ │ ├── CallForActionMarker.tsx # Map action markers
│ │ ├── HeatmapLayer.tsx # Climate data heatmap
│ │ └── MapClickHandler.tsx # Map interaction handler
│ ├── pages/ # Page-level components
│ │ ├── LandingPage.tsx # Homepage with success stories
│ │ ├── MapPage.tsx # Interactive climate map
│ │ ├── MapPage.css # Map page specific styles
│ │ ├── CallToActionPage.tsx # Action listing and discovery
│ │ ├── CreateActionPage.tsx # Action creation form
│ │ ├── ActionDetailPage.tsx # Individual action details
│ │ ├── ProfilePage.tsx # User profile and stats
│ │ ├── LoginPage.tsx # User authentication
│ │ └── RegisterPage.tsx # User registration
│ ├── contexts/ # React context providers
│ │ └── AuthContext.tsx # Authentication context
│ ├── data/ # Static data and mock datasets
│ │ ├── callForActions.ts # Climate action data
│ │ ├── seaLevelRise.ts # Sea level rise data
│ │ ├── pollution.ts # Pollution risk data
│ │ └── corrosion.ts # Corrosion risk data
│ ├── hooks/ # Custom React hooks
│ │ └── useClimateRiskClick.ts # Climate risk interaction hook
│ ├── services/ # API service functions
│ │ └── climateRiskService.ts # Climate data API client
│ ├── utils/ # Utility functions
│ │ └── balticSeaRegion.ts # Baltic Sea region utilities
│ └── devTools/ # Development utilities
│ └── getCoordsList/ # Coordinate extraction tools
│ └── index.html # Development coordinate tool
├── .git/ # Git repository metadata
├── .gitignore # Git ignore rules
└── README.md # Project documentation
```
