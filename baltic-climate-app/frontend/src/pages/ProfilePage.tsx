import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X,
  Users,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  Plus,
  Eye,
  Waves,
  Star,
  Globe,
  Target
} from 'lucide-react';
import { callForActions, CallForAction } from '../data/callForActions';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [userActions, setUserActions] = useState<{
    joined: CallForAction[];
    upcoming: CallForAction[];
    completed: CallForAction[];
    organized: CallForAction[];
  }>({
    joined: [],
    upcoming: [],
    completed: [],
    organized: []
  });
  
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    bio: user?.bio || '',
    location: user?.location || ''
  });

  // Simulate user's actions based on actions data
  useEffect(() => {
    if (user) {
      // Mock user action participation (in real app, this would come from API)
      const today = new Date();
      const joinedActions = callForActions.slice(0, 8); // User has joined first 8 actions
      const organizedActions = callForActions.slice(0, 3); // User organized first 3 actions
      
      const upcoming = joinedActions.filter(action => new Date(action.dateStart) > today);
      const completed = joinedActions.filter(action => new Date(action.dateEnd) < today);
      
      setUserActions({
        joined: joinedActions,
        upcoming,
        completed,
        organized: organizedActions
      });
    }
  }, [user]);

  const getImpactStats = () => {
    return {
      actionsJoined: userActions.joined.length,
      actionsOrganized: userActions.organized.length,
      upcomingActions: userActions.upcoming.length,
      completedActions: userActions.completed.length,
      impactScore: userActions.joined.length * 10 + userActions.organized.length * 25
    };
  };

  const getActionTypeColor = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'protest':   return 'bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 border-pink-200 shadow-sm';
      case 'cleanup':   return 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 shadow-sm';
      case 'workshop':  return 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200 shadow-sm';
      case 'seminar':   return 'bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border-indigo-200 shadow-sm';
      case 'virtual':   return 'bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 border-purple-200 shadow-sm';
      case 'training':  return 'bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border-teal-200 shadow-sm';
      case 'science':   return 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-200 shadow-sm';
      default:          return 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-200 shadow-sm';
    }
  };

  const formatDateRange = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    }
    
    return `${start.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })} - ${end.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })}`;
  };

  const renderActionCard = (action: CallForAction, index: number, showStatus: boolean = false) => {
    const isUpcoming = new Date(action.dateStart) > new Date();
    const isCompleted = new Date(action.dateEnd) < new Date();
    
    return (
      <motion.div 
        key={index} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="bg-white/70 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getActionTypeColor(action.type)}`}>
                {action.type.charAt(0).toUpperCase() + action.type.slice(1)}
              </span>
              {showStatus && (
                <span className={`inline-flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded-full ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200' 
                    : isUpcoming 
                      ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200'
                      : 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border border-gray-200'
                }`}>
                  {isCompleted ? (
                    <>
                      <CheckCircle className="h-3 w-3" />
                      <span>Completed</span>
                    </>
                  ) : isUpcoming ? (
                    <>
                      <Clock className="h-3 w-3" />
                      <span>Upcoming</span>
                    </>
                  ) : (
                    <span>In Progress</span>
                  )}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
              {action.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3 flex items-center">
              <Users className="h-3 w-3 mr-1" />
              by {action.organizer}
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDateRange(action.dateStart, action.dateEnd)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{action.lat.toFixed(2)}, {action.lng.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Link
            to={`/action/${callForActions.indexOf(action) + 1}`}
            className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-xl"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    );
  };

  const impactStats = getImpactStats();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    // TODO: Implement API call to update user profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      bio: user?.bio || '',
      location: user?.location || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"
        />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Enhanced Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl mb-8 overflow-hidden"
        >
          <div className="px-8 py-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Enhanced Avatar */}
              <motion.div 
                className="relative flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJZbwM7nByiekCs8REVQg8jjYIs0Cbdh7HlgkMNgtalXKWv4cujKU3wZTRjxnLQXZvow4&usqp=CAU"
                    alt="Profile"
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
                <motion.div 
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 border-4 border-white rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </motion.div>
              </motion.div>
              
              {/* Enhanced User Info */}
              <div className="flex-1">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                  <div className="mb-6 xl:mb-0">
                    <motion.h1 
                      className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {user.first_name} {user.last_name}
                    </motion.h1>
                    <motion.div 
                      className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>{user.email}</span>
                      </div>
                      {user.location && (
                        <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span>{user.location}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-full">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span>Joined {new Date(user.date_joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center space-x-2 px-6 py-3 bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 rounded-2xl shadow-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </motion.button>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/create-action"
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 rounded-2xl shadow-lg font-medium"
                      >
                        <Plus className="h-4 w-4" />
                        <span>New Action</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Enhanced Bio */}
                {user.bio && (
                  <motion.div 
                    className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <p className="text-gray-700 leading-relaxed">
                      {user.bio}
                    </p>
                  </motion.div>
                )}
                
                {/* Enhanced Edit Form */}
                <AnimatePresence>
                  {isEditing && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 p-6 bg-white rounded-2xl border border-blue-200 shadow-lg"
                    >
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="Your location"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Tell us about yourself..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <motion.button
                          onClick={handleSave}
                          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all duration-300 rounded-xl font-medium shadow-lg"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Save className="h-4 w-4" />
                          <span>Save Changes</span>
                        </motion.button>
                        <motion.button
                          onClick={handleCancel}
                          className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 rounded-xl font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <X className="h-4 w-4" />
                          <span>Cancel</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Enhanced Left Sidebar - Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Enhanced Impact Stats */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Impact Overview</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Actions joined</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{impactStats.actionsJoined}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Award className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">Actions organized</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">{impactStats.actionsOrganized}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-gray-700">Upcoming</span>
                  </div>
                  <span className="text-lg font-bold text-amber-600">{impactStats.upcomingActions}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Completed</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">{impactStats.completedActions}</span>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5" />
                      <span className="font-bold">Impact Score</span>
                    </div>
                    <span className="text-2xl font-bold">{impactStats.impactScore}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Quick Links */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Quick Links</h3>
              </div>
              <div className="space-y-3">
                <Link
                  to="/call-to-action"
                  className="flex items-center space-x-3 p-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-xl group"
                >
                  <Eye className="h-4 w-4 group-hover:text-blue-600" />
                  <span className="font-medium">Browse all actions</span>
                </Link>
                <Link
                  to="/map"
                  className="flex items-center space-x-3 p-3 text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 rounded-xl group"
                >
                  <MapPin className="h-4 w-4 group-hover:text-green-600" />
                  <span className="font-medium">View climate map</span>
                </Link>
                <Link
                  to="/create-action"
                  className="flex items-center space-x-3 p-3 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 rounded-xl group"
                >
                  <Plus className="h-4 w-4 group-hover:text-purple-600" />
                  <span className="font-medium">Create new action</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Main Content */}
          <div className="lg:col-span-3">
            {/* Enhanced Navigation Tabs */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-lg mb-8 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="border-b border-blue-100">
                <nav className="flex space-x-0">
                  {[
                    { id: 'overview', label: 'Overview', count: impactStats.actionsJoined, icon: <Eye className="h-4 w-4" /> },
                    { id: 'upcoming', label: 'Upcoming', count: impactStats.upcomingActions, icon: <Clock className="h-4 w-4" /> },
                    { id: 'completed', label: 'Completed', count: impactStats.completedActions, icon: <CheckCircle className="h-4 w-4" /> },
                    { id: 'organized', label: 'Organized', count: impactStats.actionsOrganized, icon: <Award className="h-4 w-4" /> }
                  ].map(tab => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-4 px-6 border-b-2 font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600 bg-blue-50'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                      {tab.count > 0 && (
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          activeTab === tab.id 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Enhanced Tab Content */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div 
                    key="overview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-8"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                      <Link
                        to="/call-to-action"
                        className="text-blue-600 hover:text-blue-700 transition-colors font-medium flex items-center space-x-1"
                      >
                        <span>View all actions</span>
                        <Target className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="grid gap-4">
                      {userActions.joined.slice(0, 6).map((action, index) => 
                        renderActionCard(action, index, true)
                      )}
                      {userActions.joined.length === 0 && (
                        <div className="text-center py-16">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Users className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                          </motion.div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4">No actions yet</h3>
                          <p className="text-gray-600 mb-8">Start making an impact by joining climate actions.</p>
                          <Link
                            to="/call-to-action"
                            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 rounded-2xl font-semibold shadow-lg"
                          >
                            <span>Browse Actions</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'upcoming' && (
                  <motion.div 
                    key="upcoming"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-8"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Upcoming Actions</h2>
                      <span className="text-blue-600 font-semibold">{impactStats.upcomingActions} upcoming</span>
                    </div>
                    <div className="grid gap-4">
                      {userActions.upcoming.map((action, index) => 
                        renderActionCard(action, index, false)
                      )}
                      {userActions.upcoming.length === 0 && (
                        <div className="text-center py-16">
                          <Clock className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                          <h3 className="text-xl font-bold text-gray-900 mb-4">No upcoming actions</h3>
                          <p className="text-gray-600 mb-8">Join some climate actions to see them here.</p>
                          <Link
                            to="/call-to-action"
                            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 rounded-2xl font-semibold shadow-lg"
                          >
                            <span>Find Actions</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'completed' && (
                  <motion.div 
                    key="completed"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-8"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Completed Actions</h2>
                      <span className="text-green-600 font-semibold">{impactStats.completedActions} completed</span>
                    </div>
                    <div className="grid gap-4">
                      {userActions.completed.map((action, index) => 
                        renderActionCard(action, index, false)
                      )}
                      {userActions.completed.length === 0 && (
                        <div className="text-center py-16">
                          <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                          <h3 className="text-xl font-bold text-gray-900 mb-4">No completed actions</h3>
                          <p className="text-gray-600">Your completed climate actions will appear here.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'organized' && (
                  <motion.div 
                    key="organized"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-8"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Actions You've Organized</h2>
                      <Link
                        to="/create-action"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 rounded-xl font-medium shadow-sm"
                      >
                        <Plus className="h-4 w-4" />
                        <span>New Action</span>
                      </Link>
                    </div>
                    <div className="grid gap-4">
                      {userActions.organized.map((action, index) => 
                        renderActionCard(action, index, false)
                      )}
                      {userActions.organized.length === 0 && (
                        <div className="text-center py-16">
                          <Award className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                          <h3 className="text-xl font-bold text-gray-900 mb-4">No organized actions</h3>
                          <p className="text-gray-600 mb-8">Organize your first climate action to make a bigger impact.</p>
                          <Link
                            to="/create-action"
                            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 rounded-2xl font-semibold shadow-lg"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Create Action</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
