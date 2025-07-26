import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  ArrowRight, 
  Filter,
  Search,
  Plus,
  Target,
  Globe,
  Waves,
  TreePine,
  Award,
  Heart,
  TrendingUp,
  Zap,
  Star,
  Eye,
  CheckCircle,
  AlertCircle
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

  const getActionTypeIcon = (type: string) => {
    const icons: Record<string, React.ElementType> = {
      'workshop': Award,
      'protest': Target,
      'cleanup': TreePine,
      'seminar': Users,
      'festival': Star,
      'training': TrendingUp
    };
    return icons[type.toLowerCase()] || Target;
  };

  const getActionTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'workshop': 'from-purple-500 to-indigo-500',
      'protest': 'from-red-500 to-pink-500',
      'cleanup': 'from-green-500 to-teal-500',
      'seminar': 'from-blue-500 to-cyan-500',
      'festival': 'from-yellow-500 to-orange-500',
      'training': 'from-indigo-500 to-purple-500'
    };
    return colors[type.toLowerCase()] || 'from-blue-500 to-cyan-500';
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
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-blue-600 font-semibold">Loading climate actions...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Enhanced Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full opacity-20"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-96 h-96 bg-cyan-100 rounded-full opacity-15"
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-8">
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-2xl shadow-lg mr-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Target className="h-10 w-10 text-white" />
              </motion.div>
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                Climate Action Hub
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Join the movement to protect the Baltic Sea. Connect with local initiatives, 
              <span className="text-blue-600 font-semibold"> participate in research</span>, and 
              <span className="text-cyan-600 font-semibold"> make a measurable impact</span> on our shared environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              {isAuthenticated && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/create-action"
                    className="group bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    <Plus className="h-6 w-6" />
                    <span>Create New Action</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              )}
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/map"
                  className="group bg-white hover:bg-gray-50 text-blue-600 px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 flex items-center space-x-3 border-2 border-blue-200 hover:border-blue-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Globe className="h-6 w-6" />
                  <span>View on Map</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Statistics */}
            <motion.div 
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">{filteredActions.length}</div>
                <div className="text-gray-600 font-medium">Active Actions</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">9</div>
                <div className="text-gray-600 font-medium">Baltic Countries</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg">
                <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
                <div className="text-gray-600 font-medium">Community Members</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Search and Filters */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Enhanced Search */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search climate actions, organizations, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 border-2 border-blue-200 bg-white/80 rounded-2xl placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-0 font-medium transition-colors duration-300"
                />
              </div>

              {/* Enhanced Filters */}
              <div className="flex gap-4">
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="block w-full px-4 py-4 border-2 border-blue-200 bg-white/80 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-0 font-medium transition-colors duration-300 min-w-40"
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

                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="block w-full px-4 py-4 border-2 border-blue-200 bg-white/80 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-0 font-medium transition-colors duration-300 min-w-40"
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Enhanced Info Banner */}
            <motion.div 
              className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-blue-800 font-medium">
                  💡 Explore all actions on our interactive{' '}
                  <Link to="/map" className="font-bold underline hover:no-underline">
                    Climate Map
                  </Link>
                  {' '}with real-time environmental data
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Actions Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredActions.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredActions.map((action, index) => {
                const ActionIcon = getActionTypeIcon(action.type);
                const gradientColor = getActionTypeColor(action.type);
                
                return (
                  <motion.div 
                    key={action.id}
                    className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100 hover:border-blue-300 transform hover:-translate-y-2"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    {/* Action Image/Header */}
                    <div className={`relative h-48 bg-gradient-to-br ${gradientColor} overflow-hidden`}>
                      {action.image ? (
                        <div 
                          className="w-full h-full bg-cover bg-center opacity-80"
                          style={{ backgroundImage: `url(${action.image})` }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ActionIcon className="h-16 w-16 text-white/80" />
                        </div>
                      )}
                      
                      {/* Action Type Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-2">
                          <ActionIcon className="h-4 w-4 text-gray-700" />
                          <span className="text-sm font-semibold text-gray-700">
                            {getActionTypeLabel(action.type)}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span className="text-xs font-medium">Upcoming</span>
                        </div>
                      </div>

                      {/* Floating Elements */}
                      <motion.div
                        className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Heart className="h-5 w-5 text-white" />
                      </motion.div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                        {action.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {action.description}
                      </p>

                      {/* Enhanced Meta Information */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-600">
                          <div className="bg-blue-100 p-2 rounded-xl mr-3">
                            <MapPin className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-sm">
                            Lat: {action.lat}, Lng: {action.lng}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <div className="bg-green-100 p-2 rounded-xl mr-3">
                            <Calendar className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="font-medium text-sm">
                            {getDateRange(action.dateStart, action.dateEnd)}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <div className="bg-purple-100 p-2 rounded-xl mr-3">
                            <Users className="h-4 w-4 text-purple-600" />
                          </div>
                          <span className="font-medium text-sm">
                            By {action.organizer}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <Link
                          to={`/action/${action.id}`}
                          className="group/link flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                          <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                        
                        {isAuthenticated ? (
                          <motion.button 
                            onClick={() => handleJoinAction(action.id)}
                            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Zap className="h-4 w-4" />
                            <span>Join</span>
                          </motion.button>
                        ) : (
                          <Link 
                            to="/login"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            <span>Login to Join</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-blue-100 shadow-lg max-w-2xl mx-auto">
                <AlertCircle className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Actions Found</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We couldn't find any climate actions matching your search criteria. 
                  Try adjusting your filters or create a new action to get started.
                </p>
                {isAuthenticated && (
                  <Link
                    to="/create-action"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Create First Action</span>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Enhanced Call to Action for Non-Authenticated Users */}
      {!isAuthenticated && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-3xl inline-block mb-8 shadow-2xl">
                <Waves className="h-16 w-16 text-white" />
              </div>
              
              <h3 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                Ready to Make Waves?
              </h3>
              
              <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
                Join our growing community of <span className="text-yellow-400 font-bold">changemakers</span>, 
                <span className="text-cyan-400 font-bold"> researchers</span>, and 
                <span className="text-green-400 font-bold"> activists</span> working together to protect 
                the Baltic Sea and create a sustainable future for generations to come.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center space-x-3 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
                  >
                    <Users className="h-7 w-7" />
                    <span>Join Our Community</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/map"
                    className="group bg-white/10 hover:bg-white/20 text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center space-x-3 border-2 border-white/30 hover:border-white/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:-translate-y-2"
                  >
                    <Globe className="h-7 w-7" />
                    <span>Explore Climate Data</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">9 Countries</div>
                  <div className="text-blue-200">Active Collaboration</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">100+ Organizations</div>
                  <div className="text-blue-200">Partner Network</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-bold text-green-400 mb-2">Real Impact</div>
                  <div className="text-blue-200">Measurable Results</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CallToActionPage;
