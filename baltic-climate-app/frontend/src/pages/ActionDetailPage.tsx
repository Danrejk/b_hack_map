import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  ExternalLink,
  Users,
  Target,
  Share2,
  Heart,
  BookOpen,
  Globe,
  Award,
  TreePine,
  Star,
  TrendingUp,
  Waves,
  Building,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Zap,
  Plus,
  Eye
} from 'lucide-react';
import { callForActions, CallForAction } from '../data/callForActions';

const ActionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [action, setAction] = useState<CallForAction | null>(null);
  const [loading, setLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (id) {
      // Find the action by converting the ID back to array index
      const actionIndex = parseInt(id) - 1;
      if (actionIndex >= 0 && actionIndex < callForActions.length) {
        setAction(callForActions[actionIndex]);
      }
    }
    setLoading(false);
  }, [id]);

  const handleJoinAction = async () => {
    if (isJoining) return;
    
    setIsJoining(true);
    try {
      console.log('Joining action:', id);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasJoined(true);
    } catch (error) {
      console.error('Failed to join action:', error);
      alert('Failed to join action. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: action?.name,
        text: action?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDateRange = (startDate: string, endDate: string): string => {
    if (startDate === endDate) {
      return formatDate(startDate);
    }
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const getActionTypeIcon = (type: string) => {
    const icons: Record<string, React.ElementType> = {
      'workshop': Award,
      'protest': Target,
      'cleanup': TreePine,
      'seminar': Users,
      'festival': Star,
      'training': TrendingUp,
      'virtual': Globe,
      'science': Zap,
      'hackathon': Sparkles
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
      'training': 'from-indigo-500 to-purple-500',
      'virtual': 'from-cyan-500 to-blue-500',
      'science': 'from-violet-500 to-purple-500',
      'hackathon': 'from-pink-500 to-rose-500'
    };
    return colors[type.toLowerCase()] || 'from-blue-500 to-cyan-500';
  };

  const getActionTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      'workshop': 'Workshop',
      'protest': 'Protest',
      'cleanup': 'Cleanup',
      'seminar': 'Seminar',
      'festival': 'Festival',
      'training': 'Training',
      'virtual': 'Virtual Event',
      'science': 'Science Initiative',
      'hackathon': 'Hackathon'
    };
    return typeLabels[type.toLowerCase()] || type;
  };

  const getTypeColor = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'protest':   return 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-red-200';
      case 'cleanup':   return 'bg-gradient-to-r from-green-50 to-teal-50 text-green-700 border-green-200';
      case 'workshop':  return 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border-purple-200';
      case 'seminar':   return 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200';
      case 'festival':  return 'bg-gradient-to-r from-yellow-50 to-orange-50 text-orange-700 border-orange-200';
      case 'training':  return 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200';
      case 'virtual':   return 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 border-cyan-200';
      case 'science':   return 'bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700 border-violet-200';
      case 'hackathon': return 'bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 border-pink-200';
      default:          return 'bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 border-gray-200';
    }
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
          <p className="text-blue-600 font-medium">Loading action details...</p>
        </motion.div>
      </div>
    );
  }

  if (!action) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-blue-100 max-w-2xl mx-auto">
              <AlertTriangle className="h-16 w-16 text-orange-400 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Action Not Found</h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                The climate action you're looking for doesn't exist or may have been removed.
              </p>
              <Link
                to="/call-to-action"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to All Actions</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const ActionIcon = getActionTypeIcon(action.type);
  const gradientColor = getActionTypeColor(action.type);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Enhanced Header with Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-32 left-20 w-64 h-64 bg-blue-100 rounded-full opacity-20"
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
          className="absolute top-64 right-32 w-80 h-80 bg-cyan-100 rounded-full opacity-15"
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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Back Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/call-to-action"
            className="group inline-flex items-center space-x-3 text-blue-600 hover:text-blue-800 font-semibold transition-all duration-300 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-blue-200 hover:border-blue-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Climate Actions</span>
          </Link>
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-blue-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Section with Action Image/Icon */}
          <div className={`relative bg-gradient-to-r ${gradientColor} p-12 text-white overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="relative flex flex-col md:flex-row items-start justify-between">
              <div className="flex-1 mb-6 md:mb-0">
                {/* Type Badge */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/30">
                    <ActionIcon className="h-5 w-5" />
                    <span className="font-semibold">{getActionTypeLabel(action.type)}</span>
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {action.name}
                </motion.h1>

                {/* Organizer */}
                <motion.p 
                  className="text-xl text-white/90 flex items-center space-x-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Building className="h-5 w-5" />
                  <span>Organized by {action.organizer}</span>
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
                    isLiked 
                      ? 'bg-red-500 text-white border-2 border-red-500' 
                      : 'bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/30'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{isLiked ? 'Liked' : 'Like'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-2xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8 md:p-12">
            {/* Key Information Cards */}
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* Date Card */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-500 p-2 rounded-xl">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Event Date</h3>
                </div>
                <p className="text-gray-700 font-medium">
                  {getDateRange(action.dateStart, action.dateEnd)}
                </p>
              </div>

              {/* Location Card */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border border-green-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-green-500 p-2 rounded-xl">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                </div>
                <p className="text-gray-700 font-medium">
                  Baltic Sea Region
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Coordinates: {action.lat.toFixed(4)}, {action.lng.toFixed(4)}
                </p>
              </div>

              {/* Participants Card */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-purple-500 p-2 rounded-xl">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Community</h3>
                </div>
                <p className="text-gray-700 font-medium">
                  Open to All
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Join the movement
                </p>
              </div>
            </motion.div>

            {/* Description Section */}
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-blue-500 p-3 rounded-xl">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">About This Climate Action</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {action.description}
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {isAuthenticated ? (
                <AnimatePresence mode="wait">
                  {!hasJoined ? (
                    <motion.button
                      key="join-button"
                      onClick={handleJoinAction}
                      disabled={isJoining}
                      className="flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: isJoining ? 1 : 1.05 }}
                      whileTap={{ scale: isJoining ? 1 : 0.95 }}
                    >
                      {isJoining ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Joining...</span>
                        </>
                      ) : (
                        <>
                          <Users className="h-5 w-5" />
                          <span>Join This Action</span>
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </motion.button>
                  ) : (
                    <motion.div
                      key="joined-status"
                      className="flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <CheckCircle className="h-5 w-5" />
                      <span>Successfully Joined!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Login to Join</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              )}
              
              <Link
                to="/map"
                className="flex items-center justify-center space-x-3 bg-white border-2 border-blue-300 hover:border-blue-400 text-blue-600 hover:text-blue-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Globe className="h-5 w-5" />
                <span>View on Climate Map</span>
              </Link>

              <Link
                to="/call-to-action"
                className="flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Eye className="h-5 w-5" />
                <span>Explore More Actions</span>
              </Link>
            </motion.div>

            {/* Impact Section */}
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-orange-500 p-3 rounded-xl">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Expected Impact</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Waves className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Marine Protection</h3>
                    <p className="text-gray-600">Protecting Baltic Sea ecosystems</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TreePine className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Environmental Action</h3>
                    <p className="text-gray-600">Promoting sustainable practices</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Community Building</h3>
                    <p className="text-gray-600">Connecting climate advocates</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Related Actions */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Related Climate Actions</h2>
            </div>
            
            {/* Get related actions with more flexible matching */}
            {(() => {
              // First try to get actions of the same type
              let relatedActions = callForActions.filter(a => a.type === action.type && a !== action);
              
              // If not enough same-type actions, include other types
              if (relatedActions.length < 3) {
                const otherActions = callForActions.filter(a => a.type !== action.type && a !== action);
                relatedActions = [...relatedActions, ...otherActions].slice(0, 3);
              } else {
                relatedActions = relatedActions.slice(0, 3);
              }
              
              return relatedActions.length > 0 ? (
                <div className="space-y-6">
                  {relatedActions.map((relatedAction, index) => {
                    const RelatedIcon = getActionTypeIcon(relatedAction.type);
                    const relatedGradient = getActionTypeColor(relatedAction.type);
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <Link
                          to={`/action/${callForActions.indexOf(relatedAction) + 1}`}
                          className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-blue-300 transform hover:-translate-y-1"
                        >
                          <div className="flex">
                            {/* Left side - Gradient header */}
                            <div className={`bg-gradient-to-r ${relatedGradient} p-6 flex flex-col justify-center items-center min-w-[200px]`}>
                              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mb-3">
                                <RelatedIcon className="h-8 w-8 text-white" />
                              </div>
                              <span className="text-white font-bold text-center">
                                {getActionTypeLabel(relatedAction.type)}
                              </span>
                              {relatedAction.type === action.type && (
                                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold mt-2">
                                  Similar Type
                                </div>
                              )}
                            </div>

                            {/* Right side - Content */}
                            <div className="flex-1 p-6">
                              <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-1 pr-4">
                                  {relatedAction.name}
                                </h3>
                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                              </div>
                              
                              <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
                                {relatedAction.description}
                              </p>
                              
                              {/* Enhanced Meta Information */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                  <div className="bg-blue-100 p-2 rounded-xl">
                                    <Building className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div>
                                    <div className="text-xs text-gray-500 font-medium">Organizer</div>
                                    <div className="text-sm font-semibold text-gray-900 truncate">
                                      {relatedAction.organizer}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  <div className="bg-green-100 p-2 rounded-xl">
                                    <Calendar className="h-4 w-4 text-green-600" />
                                  </div>
                                  <div>
                                    <div className="text-xs text-gray-500 font-medium">Date</div>
                                    <div className="text-sm font-semibold text-gray-900">
                                      {formatDate(relatedAction.dateStart)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
                    <Info className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Related Actions Found</h3>
                    <p className="text-gray-600 mb-6">
                      There are currently no other actions available.
                    </p>
                    <Link
                      to="/call-to-action"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Explore All Actions</span>
                    </Link>
                  </div>
                </div>
              );
            })()}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ActionDetailPage;
