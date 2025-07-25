import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  ArrowRight, 
  Filter,
  Search,
  Plus
} from 'lucide-react';
import { callForActions, CallForAction } from '../data/callForActions';

interface ClimateAction {
  id: string;
  type: string;
  name: string;
  organizer: string;
  dateStart: string;
  dateEnd: string;
  description: string;
  lat: number;
  lng: number;
  image?: string;
}

const CallToActionPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [actions, setActions] = useState<ClimateAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    fetchActions();
  }, []);

  const handleJoinAction = async (actionId: string) => {
    try {
      console.log('Joining action:', actionId);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // You could also show a success message here
      alert('Successfully joined the action!');
    } catch (error) {
      console.error('Failed to join action:', error);
      alert('Failed to join action. Please try again.');
    }
  };

  const fetchActions = async () => {
    try {
      // Convert callForActions data to match our interface
      const convertedActions: ClimateAction[] = callForActions.map((action, index) => ({
        id: `${index + 1}`,
        type: action.type,
        name: action.name,
        organizer: action.organizer,
        dateStart: action.dateStart,
        dateEnd: action.dateEnd,
        description: action.description,
        lat: action.lat,
        lng: action.lng,
        image: action.image
      }));
      
      setActions(convertedActions);
    } catch (error) {
      console.error('Failed to fetch actions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredActions = actions.filter(action => {
    const matchesSearch = action.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.organizer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'all' || action.type.toLowerCase() === selectedType.toLowerCase();
    
    // For now, treat all actions as upcoming since we don't have status in our data
    const matchesStatus = selectedStatus === 'all' || selectedStatus === 'upcoming';

    return matchesSearch && matchesType && matchesStatus;
  });

  const getActionTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      'workshop': 'Workshop',
      'protest': 'Protest',
      'cleanup': 'Cleanup',
      'seminar': 'Seminar',
      'festival': 'Festival',
      'training': 'Training'
    };
    return typeLabels[type.toLowerCase()] || type;
  };

  const getStatusColor = (status: string = 'upcoming') => {
    switch (status) {
      case 'upcoming': return 'text-blue-600';
      case 'ongoing': return 'text-green-600';
      case 'completed': return 'text-gray-600';
      default: return 'text-blue-600';
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDateRange = (startDate: string, endDate: string): string => {
    if (startDate === endDate) {
      return formatDate(startDate);
    }
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-black mb-6">
            Take Climate Action
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Join local initiatives, participate in research, and make a real difference 
            in protecting the Baltic Sea ecosystem.
          </p>
          
          {isAuthenticated && (
            <Link
              to="/create-action"
              className="inline-flex items-center space-x-2 bg-black hover:bg-gray-900 text-white px-6 py-3 text-sm font-light transition-colors border border-black"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Action</span>
            </Link>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-50 border border-gray-200 p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search actions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 font-light"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none focus:border-black focus:ring-0 font-light"
              >
                <option value="all">All Types</option>
                <option value="workshop">Workshops</option>
                <option value="protest">Protests</option>
                <option value="cleanup">Cleanups</option>
                <option value="seminar">Seminars</option>
                <option value="festival">Festivals</option>
                <option value="training">Training</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none focus:border-black focus:ring-0 font-light"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          
          {/* Info about map integration */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 text-blue-800 text-sm font-light">
            💡 View all environmental actions on the interactive <Link to="/map" className="font-medium underline hover:no-underline">Climate Map</Link> along with climate data
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActions.map((action) => (
            <div key={action.id} className="bg-white border border-gray-200 p-6 hover:border-gray-400 transition-colors flex flex-col h-full">
              {/* Action Image */}
              {action.image && (
                <div 
                  className="w-full h-32 bg-cover bg-center mb-4 rounded"
                  style={{ backgroundImage: `url(${action.image})` }}
                />
              )}
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-light text-gray-600 uppercase tracking-wide">
                    {getActionTypeLabel(action.type)}
                  </span>
                  <span className="text-xs font-light uppercase tracking-wide text-blue-600">
                    Upcoming
                  </span>
                </div>
                <h3 className="text-xl font-light text-black mb-3 leading-tight">
                  {action.name}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4 line-clamp-3">
                  {action.description}
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="font-light">Lat: {action.lat}, Lng: {action.lng}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="font-light">
                    {getDateRange(action.dateStart, action.dateEnd)}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="font-light">
                    Organized by {action.organizer}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Link
                  to={`/action/${action.id}`}
                  className="text-black hover:text-gray-600 text-sm font-light transition-colors underline"
                >
                  View Details
                </Link>
                {isAuthenticated ? (
                  <button 
                    onClick={() => handleJoinAction(action.id)}
                    className="flex items-center space-x-1 text-black hover:text-gray-600 text-sm font-light transition-colors"
                  >
                    <span>Join Action</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <Link 
                    to="/login"
                    className="flex items-center space-x-1 text-black hover:text-gray-600 text-sm font-light transition-colors"
                  >
                    <span>Login to Join</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredActions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 font-light">No actions found matching your criteria.</p>
          </div>
        )}

        {/* Call to Action */}
        {!isAuthenticated && (
          <div className="mt-16 text-center bg-gray-50 border border-gray-200 p-12">
            <h3 className="text-2xl font-light text-black mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-gray-600 font-light mb-8 max-w-2xl mx-auto">
              Join our community to participate in climate actions, organize your own initiatives, 
              and connect with like-minded individuals across the Baltic Sea region.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-black hover:bg-gray-900 text-white px-8 py-3 text-base font-light transition-colors border border-black"
            >
              <span>Join Our Community</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallToActionPage;
