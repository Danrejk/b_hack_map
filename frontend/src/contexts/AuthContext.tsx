import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  bio?: string;
  location?: string;
  avatar?: string;
  date_joined: string;
  actions_joined: number;
  actions_organized: number;
  impact_score: number;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  register: (userData: RegisterData) => Promise<AuthResult>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

interface RegisterResponse {
  access: string;
  refresh: string;
  user: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get<User>('http://localhost:8000/api/auth/user/');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      const response = await axios.post<LoginResponse>('http://localhost:8000/api/auth/login/', credentials);
      const { access, user: userData } = response.data;
      
      localStorage.setItem('token', access);
      setToken(access);
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      return { success: true };
    } catch (error: any) {
      let errorMessage = 'Login failed';
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.data.non_field_errors) {
          errorMessage = error.response.data.non_field_errors[0];
        } else {
          // Handle field-specific errors
          const fieldErrors = Object.values(error.response.data).flat();
          errorMessage = fieldErrors[0] as string || 'Login failed';
        }
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const register = async (userData: RegisterData): Promise<AuthResult> => {
    try {
      const response = await axios.post<RegisterResponse>('http://localhost:8000/api/auth/register/', userData);
      const { access, user: newUser } = response.data;
      
      localStorage.setItem('token', access);
      setToken(access);
      setUser(newUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      return { success: true };
    } catch (error: any) {
      let errorMessage = 'Registration failed';
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.data.non_field_errors) {
          errorMessage = error.response.data.non_field_errors[0];
        } else {
          // Handle field-specific errors
          const fieldErrors = Object.values(error.response.data).flat();
          errorMessage = fieldErrors[0] as string || 'Registration failed';
        }
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
