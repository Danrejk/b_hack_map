import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
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
  Eye
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
      case 'protest':   return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'cleanup':   return 'bg-green-50 text-green-700 border-green-200';
      case 'workshop':  return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'seminar':   return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'festival':  return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'training':  return 'bg-teal-50 text-teal-700 border-teal-200';
      default:          return 'bg-gray-50 text-gray-700 border-gray-200';
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
      <div key={index} className="border border-gray-200 p-4 hover:border-gray-300 transition-all duration-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`inline-flex px-2 py-1 text-xs font-medium border ${getActionTypeColor(action.type)}`}>
                {action.type.charAt(0).toUpperCase() + action.type.slice(1)}
              </span>
              {showStatus && (
                <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium ${
                  isCompleted 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : isUpcoming 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-gray-50 text-gray-700 border border-gray-200'
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
            <h3 className="font-medium text-gray-900 mb-1 leading-tight">
              {action.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
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
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>
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
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header - GitHub Style */}
        <div className="bg-white border border-gray-200 mb-6">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-400" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-light text-gray-900 mb-1">
                      {user.first_name} {user.last_name}
                    </h1>
                    <p className="text-lg text-gray-600 font-light mb-2">@{user.username}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      {user.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{user.location}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {new Date(user.date_joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center space-x-2 px-3 py-2 border border-gray-300 hover:border-gray-400 transition-colors text-sm"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit profile</span>
                    </button>
                    <Link
                      to="/create-action"
                      className="flex items-center space-x-2 px-3 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm"
                    >
                      <Plus className="h-4 w-4" />
                      <span>New action</span>
                    </Link>
                  </div>
                </div>
                
                {/* Bio */}
                {user.bio && (
                  <div className="mt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {user.bio}
                    </p>
                  </div>
                )}
                
                {/* Edit Form */}
                {isEditing && (
                  <div className="mt-6 p-4 border border-gray-200 bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Your location"
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Tell us about yourself..."
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-500"
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save changes</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:border-gray-400 transition-colors text-sm"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Impact Stats */}
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Impact Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Actions joined</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{impactStats.actionsJoined}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Actions organized</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{impactStats.actionsOrganized}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Upcoming</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{impactStats.upcomingActions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Completed</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{impactStats.completedActions}</span>
                </div>
                <hr className="my-4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-900">Impact Score</span>
                  </div>
                  <span className="text-lg font-semibold text-green-600">{impactStats.impactScore}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/call-to-action"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>Browse all actions</span>
                </Link>
                <Link
                  to="/map"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  <span>View climate map</span>
                </Link>
                <Link
                  to="/create-action"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create new action</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            <div className="bg-white border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', count: impactStats.actionsJoined },
                    { id: 'upcoming', label: 'Upcoming', count: impactStats.upcomingActions },
                    { id: 'completed', label: 'Completed', count: impactStats.completedActions },
                    { id: 'organized', label: 'Organized', count: impactStats.actionsOrganized }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                      {tab.count > 0 && (
                        <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white border border-gray-200">
              {activeTab === 'overview' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                    <Link
                      to="/call-to-action"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      View all actions →
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {userActions.joined.slice(0, 6).map((action, index) => 
                      renderActionCard(action, index, true)
                    )}
                    {userActions.joined.length === 0 && (
                      <div className="text-center py-12">
                        <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No actions yet</h3>
                        <p className="text-gray-600 mb-4">Start making an impact by joining climate actions.</p>
                        <Link
                          to="/call-to-action"
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                          <span>Browse Actions</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'upcoming' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Upcoming Actions</h2>
                    <span className="text-sm text-gray-500">{impactStats.upcomingActions} upcoming</span>
                  </div>
                  <div className="space-y-3">
                    {userActions.upcoming.map((action, index) => 
                      renderActionCard(action, index, false)
                    )}
                    {userActions.upcoming.length === 0 && (
                      <div className="text-center py-12">
                        <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming actions</h3>
                        <p className="text-gray-600 mb-4">Join some climate actions to see them here.</p>
                        <Link
                          to="/call-to-action"
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                          <span>Find Actions</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'completed' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Completed Actions</h2>
                    <span className="text-sm text-gray-500">{impactStats.completedActions} completed</span>
                  </div>
                  <div className="space-y-3">
                    {userActions.completed.map((action, index) => 
                      renderActionCard(action, index, false)
                    )}
                    {userActions.completed.length === 0 && (
                      <div className="text-center py-12">
                        <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No completed actions</h3>
                        <p className="text-gray-600">Your completed climate actions will appear here.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'organized' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Actions You've Organized</h2>
                    <Link
                      to="/create-action"
                      className="inline-flex items-center space-x-2 px-3 py-2 border border-gray-300 hover:border-gray-400 transition-colors text-sm"
                    >
                      <Plus className="h-4 w-4" />
                      <span>New action</span>
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {userActions.organized.map((action, index) => 
                      renderActionCard(action, index, false)
                    )}
                    {userActions.organized.length === 0 && (
                      <div className="text-center py-12">
                        <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No organized actions</h3>
                        <p className="text-gray-600 mb-4">Organize your first climate action to make a bigger impact.</p>
                        <Link
                          to="/create-action"
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Create Action</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
