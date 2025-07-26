import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  MapPin, 
  Users, 
  FileText, 
  Tag, 
  Globe,
  Save,
  ArrowLeft,
  ArrowRight,
  Plus,
  Waves,
  Target,
  Clock,
  Building,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Zap
} from 'lucide-react';

const CreateActionPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
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

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        if (!formData.title.trim()) {
          setError('Action title is required');
          return false;
        }
        if (!formData.description.trim()) {
          setError('Action description is required');
          return false;
        }
        if (!formData.action_type) {
          setError('Action type is required');
          return false;
        }
        break;
      case 2:
        if (!formData.organization_name.trim()) {
          setError('Organization name is required');
          return false;
        }
        if (!formData.location_name.trim()) {
          setError('Location name is required');
          return false;
        }
        if (!formData.city.trim()) {
          setError('City is required');
          return false;
        }
        if (!formData.country.trim()) {
          setError('Country is required');
          return false;
        }
        break;
      case 3:
        if (!formData.start_date) {
          setError('Start date is required');
          return false;
        }
        if (!formData.end_date) {
          setError('End date is required');
          return false;
        }
        if (new Date(formData.start_date) > new Date(formData.end_date)) {
          setError('End date must be after start date');
          return false;
        }
        break;
    }
    setError('');
    return true;
  };

  const nextStep = () => {
    if (validateStep(step) && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setError(''); // Clear errors when going back
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      console.log('Creating action:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate back to actions page
      navigate('/call-to-action');
    } catch (err) {
      setError('Failed to create action. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return FileText;
      case 2: return MapPin;
      case 3: return Calendar;
      default: return FileText;
    }
  };

  const getStepTitle = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return 'Basic Information';
      case 2: return 'Location & Organization';
      case 3: return 'Event Details & Settings';
      default: return 'Step';
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Enhanced Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
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

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              onClick={() => navigate('/call-to-action')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-300 group"
              whileHover={{ x: -4 }}
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Climate Actions</span>
            </motion.button>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 rounded-2xl shadow-lg">
                <Plus className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                  Create Climate Action
                </h1>
                <p className="text-xl text-gray-700 font-medium mt-2">
                  Organize an initiative and inspire your community
                </p>
              </div>
            </div>

            {/* Enhanced Progress Indicator */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-xl mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Create Your Climate Action</h3>
                  <p className="text-sm text-gray-600 mt-1">Step {step} of {totalSteps}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{Math.round((step / totalSteps) * 100)}%</div>
                  <div className="text-xs text-gray-500">Complete</div>
                </div>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="relative mb-6">
                <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gradient-to-r from-gray-100 to-blue-50">
                  <motion.div 
                    className="shadow-lg flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </div>
                {/* Progress Glow Effect */}
                <motion.div
                  className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-50 blur-sm"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </div>
              
              {/* Enhanced Step Indicators */}
              <div className="flex justify-between">
                {Array.from({ length: totalSteps }, (_, i) => {
                  const stepNumber = i + 1;
                  const StepIcon = getStepIcon(stepNumber);
                  const isActive = stepNumber === step;
                  const isCompleted = stepNumber < step;
                  
                  return (
                    <motion.div 
                      key={stepNumber} 
                      className="flex flex-col items-center flex-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: stepNumber * 0.1 }}
                    >
                      <motion.div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl scale-110' :
                          isCompleted ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg' :
                          'bg-gray-100 text-gray-400 border-2 border-gray-200'
                        }`}
                        whileHover={{ scale: isActive ? 1.15 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isCompleted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckCircle className="h-6 w-6" />
                          </motion.div>
                        ) : (
                          <StepIcon className="h-6 w-6" />
                        )}
                      </motion.div>
                      <div className="text-center mt-3">
                        <div className={`text-sm font-semibold ${
                          isActive ? 'text-blue-600' : 
                          isCompleted ? 'text-green-600' : 
                          'text-gray-500'
                        }`}>
                          {getStepTitle(stepNumber)}
                        </div>
                        {isActive && (
                          <motion.div
                            className="text-xs text-blue-500 mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            Current Step
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Multi-Step Form */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="p-8 md:p-12">
              {error && (
                <motion.div 
                  className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-2xl mb-8 flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="font-medium">{error}</span>
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-12">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-2xl inline-block mb-4">
                        <FileText className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Tell Us About Your Action
                      </h2>
                      <p className="text-gray-600 text-lg">
                        Start by giving your climate action a compelling title and description
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label htmlFor="title" className="block text-lg font-semibold text-gray-900 mb-3">
                          Action Title *
                        </label>
                        <input
                          id="title"
                          name="title"
                          type="text"
                          required
                          value={formData.title}
                          onChange={handleChange}
                          className="block w-full px-6 py-4 border-2 border-blue-200 bg-white/80 rounded-2xl placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-0 font-medium text-lg transition-colors duration-300"
                          placeholder="e.g., Baltic Sea Cleanup Initiative 2024"
                        />
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-lg font-semibold text-gray-900 mb-3">
                          Description *
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={5}
                          required
                          value={formData.description}
                          onChange={handleChange}
                          className="block w-full px-6 py-4 border-2 border-blue-200 bg-white/80 rounded-2xl placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-0 font-medium text-lg resize-none transition-colors duration-300"
                          placeholder="Describe what participants will do, why it matters, and the expected impact..."
                        />
                      </div>

                      <div>
                        <label htmlFor="action_type" className="block text-lg font-semibold text-gray-900 mb-3">
                          Action Type *
                        </label>
                        <select
                          id="action_type"
                          name="action_type"
                          required
                          value={formData.action_type}
                          onChange={handleChange}
                          className="block w-full px-6 py-4 border-2 border-blue-200 bg-white/80 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-0 font-medium text-lg transition-colors duration-300"
                        >
                          <option value="ngo_initiative">NGO Initiative</option>
                          <option value="workshop">Educational Workshop</option>
                          <option value="citizen_science">Citizen Science Project</option>
                          <option value="lifestyle_change">Lifestyle Change Campaign</option>
                          <option value="hackathon">Environmental Hackathon</option>
                          <option value="cleanup">Environmental Cleanup</option>
                          <option value="protest">Climate Protest</option>
                          <option value="seminar">Policy Seminar</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-12">
                      <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 rounded-2xl inline-block mb-4">
                        <MapPin className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Where Will It Happen?
                      </h2>
                      <p className="text-gray-600 text-lg">
                        Help people find your action by providing location details
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label htmlFor="location_name" className="block text-lg font-semibold text-gray-900 mb-3">
                          Location Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <MapPin className="h-6 w-6 text-blue-400" />
                          </div>
                          <input
                            id="location_name"
                            name="location_name"
                            type="text"
                            required
                            value={formData.location_name}
                            onChange={handleChange}
                            className="block w-full pl-16 pr-6 py-4 border-2 border-blue-200 bg-white/80 rounded-2xl placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-0 font-medium text-lg transition-colors duration-300"
                            placeholder="e.g., Stockholm City Park, Helsinki Marina"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="city" className="block text-lg font-semibold text-gray-900 mb-3">
                            City *
                          </label>
                          <input
                            id="city"
                            name="city"
                            type="text"
                            required
                            value={formData.city}
                            onChange={handleChange}
                            className="block w-full px-6 py-4 border-2 border-blue-200 bg-white/80 rounded-2xl placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-0 font-medium text-lg transition-colors duration-300"
                            placeholder="City name"
                          />
                        </div>

                        <div>
                          <label htmlFor="country" className="block text-lg font-semibold text-gray-900 mb-3">
                            Country *
                          </label>
                          <input
                            id="country"
                            name="country"
                            type="text"
                            required
                            value={formData.country}
                            onChange={handleChange}
                            className="block w-full px-6 py-4 border-2 border-blue-200 bg-white/80 rounded-2xl placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-0 font-medium text-lg transition-colors duration-300"
                            placeholder="Country name"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="organization_name" className="block text-lg font-semibold text-gray-900 mb-3">
                          Organization Name (Optional)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <Building className="h-6 w-6 text-blue-400" />
                          </div>
                          <input
                            id="organization_name"
                            name="organization_name"
                            type="text"
                            value={formData.organization_name}
                            onChange={handleChange}
                            className="block w-full pl-16 pr-6 py-4 border-2 border-blue-200 bg-white/80 rounded-2xl placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-0 font-medium text-lg transition-colors duration-300"
                            placeholder="Your organization or leave blank for personal initiative"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-12">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl inline-block mb-4">
                        <Calendar className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Event Details & Settings
                      </h2>
                      <p className="text-gray-600 text-lg">
                        Set the timing and configure participation settings
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="start_date" className="block text-lg font-semibold text-gray-900 mb-3">
                            Start Date & Time *
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                              <Calendar className="h-6 w-6 text-blue-400" />
                            </div>
                            <input
                              id="start_date"
                              name="start_date"
                              type="datetime-local"
                              required
                              value={formData.start_date}
                              onChange={handleChange}
                              className="block w-full pl-16 pr-6 py-4 border-2 border-blue-200 bg-white/80 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-0 font-medium text-lg transition-colors duration-300"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="end_date" className="block text-lg font-semibold text-gray-900 mb-3">
                            End Date & Time *
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                              <Clock className="h-6 w-6 text-blue-400" />
                            </div>
                            <input
                              id="end_date"
                              name="end_date"
                              type="datetime-local"
                              required
                              value={formData.end_date}
                              onChange={handleChange}
                              className="block w-full pl-16 pr-6 py-4 border-2 border-blue-200 bg-white/80 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-0 font-medium text-lg transition-colors duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="max_participants" className="block text-lg font-semibold text-gray-900 mb-3">
                          Maximum Participants (Optional)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <Users className="h-6 w-6 text-blue-400" />
                          </div>
                          <input
                            id="max_participants"
                            name="max_participants"
                            type="number"
                            min="1"
                            value={formData.max_participants}
                            onChange={handleChange}
                            className="block w-full pl-16 pr-6 py-4 border-2 border-blue-200 bg-white/80 rounded-2xl placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-0 font-medium text-lg transition-colors duration-300"
                            placeholder="Leave blank for unlimited participants"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="tags" className="block text-lg font-semibold text-gray-900 mb-3">
                          Tags (Optional)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <Tag className="h-6 w-6 text-blue-400" />
                          </div>
                          <input
                            id="tags"
                            name="tags"
                            type="text"
                            value={formData.tags}
                            onChange={handleChange}
                            className="block w-full pl-16 pr-6 py-4 border-2 border-blue-200 bg-white/80 rounded-2xl placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-0 font-medium text-lg transition-colors duration-300"
                            placeholder="e.g., cleanup, marine, conservation, sustainability"
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Separate tags with commas to help people discover your action</p>
                      </div>

                      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <div className="flex items-start space-x-4">
                          <input
                            id="registration_required"
                            name="registration_required"
                            type="checkbox"
                            checked={formData.registration_required}
                            onChange={handleChange}
                            className="mt-1 h-5 w-5 text-blue-600 focus:ring-0 border-2 border-blue-300 rounded"
                          />
                          <div>
                            <label htmlFor="registration_required" className="text-lg font-semibold text-gray-900">
                              Require registration to join this action
                            </label>
                            <p className="text-gray-600 mt-1">
                              Enable this to collect participant information and manage capacity
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-12 border-t border-blue-100 mt-12">
                <div>
                  {step > 1 && (
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center space-x-2 px-8 py-4 border-2 border-gray-300 text-gray-700 bg-white rounded-2xl font-semibold hover:bg-gray-50 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeft className="h-5 w-5" />
                      <span>Previous</span>
                    </motion.button>
                  )}
                </div>

                <div className="flex space-x-4">
                  {step < totalSteps ? (
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Continue</span>
                      <ArrowRight className="h-5 w-5" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="flex items-center space-x-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-12 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      whileHover={!loading ? { scale: 1.02 } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                    >
                      {loading ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Creating Action...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5" />
                          <span>Create Action</span>
                          <Zap className="h-5 w-5" />
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </form>
          </motion.div>

          {/* Help Text */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Info className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Need Help?</span>
              </div>
              <p className="text-gray-600">
                Your action will be reviewed and published within 24 hours. 
                Once approved, it will appear on our climate map and action directory for others to discover and join.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CreateActionPage;
