import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
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
  Award
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    bio: user?.bio || '',
    location: user?.location || ''
  });

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
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-black mb-4">
            Your Profile
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Manage your account and track your climate action impact
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-light text-black">Personal Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="font-light">Edit</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span className="font-light">Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span className="font-light">Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                {/* Avatar */}
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-gray-100 border border-gray-300 flex items-center justify-center flex-shrink-0">
                    <User className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-light text-black mb-1">{user.full_name}</h3>
                    <p className="text-gray-600 font-light mb-2">@{user.username}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Member since {new Date(user.date_joined).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-light text-black mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none focus:border-black font-light"
                      />
                    ) : (
                      <p className="text-gray-600 font-light">{user.first_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-light text-black mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none focus:border-black font-light"
                      />
                    ) : (
                      <p className="text-gray-600 font-light">{user.last_name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light text-black mb-2">
                    Email
                  </label>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span className="font-light">{user.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light text-black mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter your location"
                      className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none focus:border-black font-light"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="font-light">{user.location || 'No location set'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-light text-black mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us about yourself and your climate action interests"
                      className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none focus:border-black font-light resize-none"
                    />
                  ) : (
                    <p className="text-gray-600 font-light leading-relaxed">
                      {user.bio || 'No bio added yet. Share your passion for climate action!'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-light text-black mb-2">
                    Member Since
                  </label>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="font-light">
                      {new Date(user.date_joined).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Impact Stats */}
            <div className="bg-gray-50 border border-gray-200 p-6">
              <h3 className="text-lg font-light text-black mb-6 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Your Impact</span>
              </h3>
              <div className="space-y-6">
                <div className="text-center pb-4 border-b border-gray-200">
                  <div className="text-2xl font-light text-black mb-1">{user.actions_joined}</div>
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="font-light">Actions Joined</span>
                  </div>
                </div>
                
                <div className="text-center pb-4 border-b border-gray-200">
                  <div className="text-2xl font-light text-black mb-1">{user.actions_organized}</div>
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                    <Award className="h-4 w-4" />
                    <span className="font-light">Actions Organized</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-light text-black mb-1">{user.impact_score}</div>
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-light">Impact Score</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-lg font-light text-black mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 border border-gray-200 hover:border-gray-400 transition-colors font-light text-gray-700 hover:text-black">
                  View My Actions
                </button>
                <button className="w-full text-left px-4 py-3 border border-gray-200 hover:border-gray-400 transition-colors font-light text-gray-700 hover:text-black">
                  Create New Action
                </button>
                <button className="w-full text-left px-4 py-3 border border-gray-200 hover:border-gray-400 transition-colors font-light text-gray-700 hover:text-black">
                  Find Local Events
                </button>
                <button className="w-full text-left px-4 py-3 border border-gray-200 hover:border-gray-400 transition-colors font-light text-gray-700 hover:text-black">
                  Settings & Privacy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
