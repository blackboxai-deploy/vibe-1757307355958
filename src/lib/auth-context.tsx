"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@pharmacare.ca',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: UserRole.ADMIN,
    licenseNumber: 'AB12345',
    phoneNumber: '403-555-0101',
    isActive: true,
    createdAt: new Date('2023-01-01'),
    lastLogin: new Date()
  },
  {
    id: '2',
    email: 'pharmacist@pharmacare.ca',
    firstName: 'Dr. Michael',
    lastName: 'Chen',
    role: UserRole.PHARMACIST,
    licenseNumber: 'AB54321',
    phoneNumber: '403-555-0102',
    isActive: true,
    createdAt: new Date('2023-01-01'),
    lastLogin: new Date()
  },
  {
    id: '3',
    email: 'tech@pharmacare.ca',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    role: UserRole.TECHNICIAN,
    phoneNumber: '403-555-0103',
    isActive: true,
    createdAt: new Date('2023-01-01'),
    lastLogin: new Date()
  }
];

// Role permissions mapping
const rolePermissions: Record<UserRole, string[]> = {
  [UserRole.ADMIN]: ['all'],
  [UserRole.PHARMACIST]: ['prescriptions', 'patients', 'inventory', 'reports', 'pos'],
  [UserRole.TECHNICIAN]: ['prescriptions', 'patients', 'inventory', 'pos'],
  [UserRole.MANAGER]: ['reports', 'inventory', 'pos', 'patients'],
  [UserRole.CASHIER]: ['pos', 'patients']
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('pharmacare_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('pharmacare_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - In production, this would be a real API call
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password123') {
      const userWithLastLogin = {
        ...foundUser,
        lastLogin: new Date()
      };
      
      setUser(userWithLastLogin);
      localStorage.setItem('pharmacare_user', JSON.stringify(userWithLastLogin));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pharmacare_user');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const userPermissions = rolePermissions[user.role];
    return userPermissions.includes('all') || userPermissions.includes(permission);
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}