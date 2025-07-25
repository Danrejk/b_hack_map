import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  MapPin, 
  Users, 
  FileText, 
  Tag, 
  Globe,
  Save,
  ArrowLeft
} from 'lucide-react';

const CreateActionPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    action_type: 'ngo_initiative',
    location_name: '',
    city: '',
    country: '',
    start_date: '',
    end_date: '',
    organization_name: '',
    max_participants: '',
    registration_required: true,
    tags: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      console.log('Creating action:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to actions page
      navigate('/call-to-action');
    } catch (err) {
      setError('Failed to create action. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate('/call-to-action')}
            className="flex items-center space-x-2 text-gray-600 hover:text-black mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-light">Back to Actions</span>
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-8 w-8 text-black" />
            <h1 className="text-3xl md:text-4xl font-light text-black">
              Create New Action
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-light">
            Organize a climate initiative and invite others to join your cause
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 space-y-8">
          {error && (
            <div className="bg-gray-50 border border-gray-200 text-gray-800 px-4 py-3 font-light">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-light text-black border-b border-gray-200 pb-3">
              Basic Information
            </h2>
            
            <div>
              <label htmlFor="title" className="block text-sm font-light text-black mb-2">
                Action Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="block w-full px-3 py-3 border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 font-light"
                placeholder="Give your action a compelling title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-light text-black mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                className="block w-full px-3 py-3 border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 font-light resize-none"
                placeholder="Describe what participants will do and why it matters"
              />
            </div>

            <div>
              <label htmlFor="action_type" className="block text-sm font-light text-black mb-2">
                Action Type *
              </label>
              <select
                id="action_type"
                name="action_type"
                required
                value={formData.action_type}
                onChange={handleChange}
                className="block w-full px-3 py-3 border border-gray-300 bg-white focus:outline-none focus:border-black focus:ring-0 font-light"
              >
                <option value="ngo_initiative">NGO Initiative</option>
                <option value="workshop">Workshop</option>
                <option value="citizen_science">Citizen Science</option>
                <option value="lifestyle_change">Lifestyle Change</option>
                <option value="hackathon">Hackathon</option>
              </select>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-light text-black border-b border-gray-200 pb-3">
              Location Details
            </h2>
            
            <div>
              <label htmlFor="location_name" className="block text-sm font-light text-black mb-2">
                Location Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="location_name"
                  name="location_name"
                  type="text"
                  required
                  value={formData.location_name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 font-light"
                  placeholder="e.g., Stockholm Archipelago, Central Park"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-light text-black mb-2">
                  City *
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 font-light"
                  placeholder="City"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-light text-black mb-2">
                  Country *
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 font-light"
                  placeholder="Country"
                />
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-light text-black border-b border-gray-200 pb-3">
              Event Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="start_date" className="block text-sm font-light text-black mb-2">
                  Start Date & Time *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="start_date"
                    name="start_date"
                    type="datetime-local"
                    required
                    value={formData.start_date}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 bg-white focus:outline-none focus:border-black focus:ring-0 font-light"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="end_date" className="block text-sm font-light text-black mb-2">
                  End Date & Time *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="end_date"
                    name="end_date"
                    type="datetime-local"
                    required
                    value={formData.end_date}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 bg-white focus:outline-none focus:border-black focus:ring-0 font-light"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="organization_name" className="block text-sm font-light text-black mb-2">
                Organization Name
              </label>
              <input
                id="organization_name"
                name="organization_name"
                type="text"
                value={formData.organization_name}
                onChange={handleChange}
                className="block w-full px-3 py-3 border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 font-light"
                placeholder="Your organization or leave blank for personal initiative"
              />
            </div>

            <div>
              <label htmlFor="max_participants" className="block text-sm font-light text-black mb-2">
                Maximum Participants
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="max_participants"
                  name="max_participants"
                  type="number"
                  min="1"
                  value={formData.max_participants}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 font-light"
                  placeholder="Leave blank for unlimited"
                />
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-light text-black mb-2">
                Tags
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 font-light"
                  placeholder="e.g., cleanup, marine, conservation (comma-separated)"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="registration_required"
                name="registration_required"
                type="checkbox"
                checked={formData.registration_required}
                onChange={handleChange}
                className="h-4 w-4 text-black focus:ring-0 border-gray-300"
              />
              <label htmlFor="registration_required" className="ml-2 block text-sm text-black font-light">
                Require registration to join this action
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-black text-sm font-light text-white bg-black hover:bg-gray-900 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Action...
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Create Action</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateActionPage;
