import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { callForActions, CallForAction } from '../data/callForActions';

const ActionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [action, setAction] = useState<CallForAction | null>(null);
  const [loading, setLoading] = useState(true);

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
    try {
      console.log('Joining action:', id);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      alert('Successfully joined the action!');
    } catch (error) {
      console.error('Failed to join action:', error);
      alert('Failed to join action. Please try again.');
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

  const getTypeColor = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'protest':   return 'bg-pink-100 text-pink-800';
      case 'cleanup':   return 'bg-green-100 text-green-800';
      case 'workshop':  return 'bg-blue-100 text-blue-800';
      case 'seminar':   return 'bg-orange-100 text-orange-800';
      case 'festival':  return 'bg-purple-100 text-purple-800';
      case 'training':  return 'bg-teal-100 text-teal-800';
      default:          return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!action) {
    return (
      <div className="pt-16 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-light text-black mb-4">Action Not Found</h1>
            <p className="text-gray-600 mb-8">The action you're looking for doesn't exist.</p>
            <Link
              to="/call-to-action"
              className="inline-flex items-center space-x-2 text-black hover:text-gray-600 font-light"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Actions</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to="/call-to-action"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-black font-light transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Actions</span>
          </Link>
        </div>

        {/* Action Header */}
        <div className="bg-white border border-gray-200 overflow-hidden">
          {/* Hero Image */}
          {action.image && (
            <div 
              className="w-full h-64 md:h-80 bg-cover bg-center"
              style={{ backgroundImage: `url(${action.image})` }}
            />
          )}
          
          <div className="p-8">
            {/* Type Badge */}
            <div className="mb-4">
              <span className={`inline-flex px-3 py-1 text-sm font-light ${getTypeColor(action.type)}`}>
                {getActionTypeLabel(action.type)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-light text-black mb-6 leading-tight">
              {action.name}
            </h1>

            {/* Meta Information */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Date</div>
                    <div className="text-sm text-gray-600 font-light">
                      {getDateRange(action.dateStart, action.dateEnd)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Organizer</div>
                    <div className="text-sm text-gray-600 font-light">{action.organizer}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Location</div>
                    <div className="text-sm text-gray-600 font-light">
                      Coordinates: {action.lat}, {action.lng}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <ExternalLink className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">View on Map</div>
                    <Link 
                      to="/map" 
                      className="text-sm text-blue-600 hover:text-blue-800 font-light transition-colors"
                    >
                      See location on Climate Map
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-light text-black mb-4">About This Action</h2>
              <p className="text-gray-700 font-light leading-relaxed text-lg">
                {action.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <button
                  onClick={handleJoinAction}
                  className="flex items-center justify-center space-x-2 bg-black hover:bg-gray-900 text-white px-8 py-3 text-base font-light transition-colors"
                >
                  <span>Join This Action</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center space-x-2 bg-black hover:bg-gray-900 text-white px-8 py-3 text-base font-light transition-colors"
                >
                  <span>Login to Join</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              
              <Link
                to="/map"
                className="flex items-center justify-center space-x-2 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-black px-8 py-3 text-base font-light transition-colors"
              >
                <MapPin className="h-4 w-4" />
                <span>View on Map</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-light text-black mb-6">Related Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {callForActions
              .filter(a => a.type === action.type && a !== action)
              .slice(0, 3)
              .map((relatedAction, index) => (
                <Link
                  key={index}
                  to={`/action/${callForActions.indexOf(relatedAction) + 1}`}
                  className="bg-white border border-gray-200 p-4 hover:border-gray-400 transition-colors"
                >
                  <div className="mb-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-light ${getTypeColor(relatedAction.type)}`}>
                      {getActionTypeLabel(relatedAction.type)}
                    </span>
                  </div>
                  <h3 className="text-lg font-light text-black mb-2">{relatedAction.name}</h3>
                  <p className="text-sm text-gray-600 font-light line-clamp-2">
                    {relatedAction.description}
                  </p>
                  <div className="mt-2 text-xs text-gray-500 font-light">
                    {relatedAction.organizer}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionDetailPage;
