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

interface ClimateAction {
  id: number;
  title: string;
  description: string;
  action_type: string;
  status: string;
  location_name: string;
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  start_date: string;
  end_date: string;
  organizer: {
    id: number;
    username: string;
    full_name: string;
  };
  organization_name: string;
  max_participants: number | null;
  participant_count: number;
  registration_required: boolean;
  tags: string;
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

  const handleJoinAction = async (actionId: number) => {
    try {
      // TODO: Replace with actual API call
      console.log('Joining action:', actionId);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the action's participant count locally
      setActions(prevActions => 
        prevActions.map(action => 
          action.id === actionId 
            ? { ...action, participant_count: action.participant_count + 1 }
            : action
        )
      );
      
      // You could also show a success message here
      alert('Successfully joined the action!');
    } catch (error) {
      console.error('Failed to join action:', error);
      alert('Failed to join action. Please try again.');
    }
  };

  const fetchActions = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockActions: ClimateAction[] = [
        {
          id: 1,
          title: "Baltic Sea Cleanup Initiative",
          description: "Join us for a comprehensive coastal cleanup along the Stockholm archipelago. We'll be collecting marine debris and documenting pollution patterns.",
          action_type: "ngo_initiative",
          status: "upcoming",
          location_name: "Stockholm Archipelago",
          latitude: 59.3293,
          longitude: 18.0686,
          country: "Sweden",
          city: "Stockholm",
          start_date: "2024-02-15T09:00:00Z",
          end_date: "2024-02-15T16:00:00Z",
          organizer: {
            id: 1,
            username: "marine_guardian",
            full_name: "Anna Lindqvist"
          },
          organization_name: "Baltic Sea Foundation",
          max_participants: 50,
          participant_count: 23,
          registration_required: true,
          tags: "cleanup,marine,conservation"
        },
        {
          id: 2,
          title: "Climate Data Collection Workshop",
          description: "Learn how to collect and analyze marine temperature data using citizen science methods. Perfect for students and environmental enthusiasts.",
          action_type: "workshop",
          status: "upcoming",
          location_name: "University of Helsinki",
          latitude: 60.1699,
          longitude: 24.9384,
          country: "Finland",
          city: "Helsinki",
          start_date: "2024-02-20T10:00:00Z",
          end_date: "2024-02-20T15:00:00Z",
          organizer: {
            id: 2,
            username: "data_scientist",
            full_name: "Dr. Erik Virtanen"
          },
          organization_name: "Marine Research Institute",
          max_participants: 30,
          participant_count: 12,
          registration_required: true,
          tags: "data,science,workshop"
        },
        {
          id: 3,
          title: "Sustainable Living Challenge",
          description: "30-day challenge to reduce your carbon footprint with daily tips and community support. Track your progress and share insights.",
          action_type: "lifestyle_change",
          status: "ongoing",
          location_name: "Online Community",
          latitude: 59.0,
          longitude: 19.0,
          country: "Baltic Region",
          city: "Virtual",
          start_date: "2024-01-01T00:00:00Z",
          end_date: "2024-03-31T23:59:59Z",
          organizer: {
            id: 3,
            username: "green_living",
            full_name: "Maria Kowalski"
          },
          organization_name: "Green Baltic Network",
          max_participants: null,
          participant_count: 156,
          registration_required: false,
          tags: "lifestyle,sustainability,community"
        }
      ];
      setActions(mockActions);
    } catch (error) {
      console.error('Failed to fetch actions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredActions = actions.filter(action => {
    const matchesSearch = action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.location_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || action.action_type === selectedType;
    const matchesStatus = selectedStatus === 'all' || action.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getActionTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'citizen_science': 'Citizen Science',
      'climate_assembly': 'Climate Assembly',
      'lifestyle_change': 'Lifestyle Change',
      'workshop': 'Workshop',
      'ngo_initiative': 'NGO Initiative',
      'resource_sharing': 'Resource Sharing',
      'participatory_budgeting': 'Participatory Budgeting',
      'hackathon': 'Hackathon',
      'protest': 'Climate Protest',
      'seminar': 'Educational Seminar'
    };
    return types[type] || type;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-gray-600';
      case 'ongoing': return 'text-black';
      case 'completed': return 'text-gray-400';
      case 'cancelled': return 'text-gray-400';
      default: return 'text-gray-600';
    }
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
                <option value="ngo_initiative">NGO Initiatives</option>
                <option value="citizen_science">Citizen Science</option>
                <option value="lifestyle_change">Lifestyle Changes</option>
                <option value="hackathon">Hackathons</option>
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
        </div>

        {/* Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActions.map((action) => (
            <div key={action.id} className="bg-white border border-gray-200 p-6 hover:border-gray-400 transition-colors flex flex-col h-full">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-light text-gray-600 uppercase tracking-wide">
                    {getActionTypeLabel(action.action_type)}
                  </span>
                  <span className={`text-xs font-light uppercase tracking-wide ${getStatusColor(action.status)}`}>
                    {action.status}
                  </span>
                </div>
                <h3 className="text-xl font-light text-black mb-3 leading-tight">
                  {action.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4 line-clamp-3">
                  {action.description}
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="font-light">{action.location_name}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="font-light">
                    {new Date(action.start_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="font-light">
                    {action.participant_count} participants
                    {action.max_participants && ` (${action.max_participants} max)`}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="font-light">
                    Organized by {action.organizer.full_name}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500 font-light">
                  {action.organization_name}
                </div>
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
