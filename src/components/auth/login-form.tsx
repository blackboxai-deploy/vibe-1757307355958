"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

export function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      } else {
        toast.success('Welcome to PharmaCare Pro!');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <div className="text-white font-bold text-2xl">Rx</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">PharmaCare Pro</h1>
          <p className="text-gray-600 mt-2">Advanced Pharmacy Management System</p>
          <p className="text-sm text-blue-600 mt-1">Designed for Alberta, Canada</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="pharmacist@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-sm text-blue-800 mb-2">Demo Accounts:</h4>
              <div className="space-y-1 text-xs text-blue-700">
                <div><strong>Admin:</strong> admin@pharmacare.ca</div>
                <div><strong>Pharmacist:</strong> pharmacist@pharmacare.ca</div>
                <div><strong>Technician:</strong> tech@pharmacare.ca</div>
                <div className="mt-2"><strong>Password for all:</strong> password123</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-600">
          <p>© 2024 PharmaCare Pro. Built for Alberta Pharmacies.</p>
        </div>
      </div>
    </div>
  );
}