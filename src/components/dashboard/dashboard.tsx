"use client";

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DashboardStats, Prescription, PrescriptionStatus } from '@/lib/types';

// Mock data for demonstration
const mockStats: DashboardStats = {
  todaySales: 4285.50,
  todayPrescriptions: 47,
  pendingPrescriptions: 12,
  lowStockItems: 8,
  patientVisits: 34,
  insuranceClaims: {
    pending: 5,
    approved: 42,
    rejected: 2
  },
  expiryAlerts: 3,
  controlledSubstanceAlerts: 1
};

const mockPendingPrescriptions: Prescription[] = [
  {
    id: '1',
    prescriptionNumber: 'RX-2024-001234',
    patientId: 'P001',
    doctorName: 'Dr. Sarah Williams',
    medication: {
      id: 'M001',
      din: '12345678',
      name: 'Lisinopril 10mg',
      genericName: 'Lisinopril',
      manufacturer: 'Generic Pharma',
      strength: '10mg',
      dosageForm: 'Tablet',
      routeOfAdministration: 'Oral',
      therapeuticClass: 'ACE Inhibitor',
      isControlled: false,
      cost: 25.50,
      sellingPrice: 35.75,
      stockQuantity: 150,
      minimumStock: 25
    },
    instructions: 'Take one tablet daily with food',
    quantity: 30,
    refillsRemaining: 2,
    originalRefills: 2,
    datePrescribed: new Date('2024-01-15'),
    dateExpires: new Date('2025-01-15'),
    status: PrescriptionStatus.PENDING,
    interactions: [],
    isControlled: false,
    priority: 'normal'
  },
  {
    id: '2',
    prescriptionNumber: 'RX-2024-001235',
    patientId: 'P002',
    doctorName: 'Dr. Michael Chen',
    medication: {
      id: 'M002',
      din: '87654321',
      name: 'Metformin 500mg',
      genericName: 'Metformin',
      manufacturer: 'Pharma Corp',
      strength: '500mg',
      dosageForm: 'Tablet',
      routeOfAdministration: 'Oral',
      therapeuticClass: 'Antidiabetic',
      isControlled: false,
      cost: 18.25,
      sellingPrice: 28.95,
      stockQuantity: 200,
      minimumStock: 50
    },
    instructions: 'Take twice daily with meals',
    quantity: 60,
    refillsRemaining: 5,
    originalRefills: 5,
    datePrescribed: new Date('2024-01-15'),
    dateExpires: new Date('2025-01-15'),
    status: PrescriptionStatus.URGENT,
    interactions: [],
    isControlled: false,
    priority: 'urgent'
  }
];

export function Dashboard() {
  const [stats] = useState<DashboardStats>(mockStats);
  const [pendingRx] = useState<Prescription[]>(mockPendingPrescriptions);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount);
  };

  const getStatusColor = (status: PrescriptionStatus) => {
    switch (status) {
      case PrescriptionStatus.URGENT: return 'bg-red-100 text-red-800';
      case PrescriptionStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
      case PrescriptionStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-800';
      case PrescriptionStatus.READY: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AppLayout currentPage="dashboard">
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Good morning! 👋</h2>
            <p className="text-gray-600 mt-1">
              Here's what's happening at your pharmacy today
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="text-right text-sm text-gray-500">
              <p>{currentTime.toLocaleDateString('en-CA', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric',
                timeZone: 'America/Edmonton'
              })}</p>
              <p className="font-mono">
                {currentTime.toLocaleTimeString('en-CA', { 
                  timeZone: 'America/Edmonton',
                  hour12: false 
                })} MST
              </p>
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        {stats.controlledSubstanceAlerts > 0 && (
          <Alert variant="destructive">
            <AlertDescription>
              <strong>Critical Alert:</strong> {stats.controlledSubstanceAlerts} controlled substance(s) require immediate attention.
              <Button variant="link" className="p-0 ml-2 text-red-600 underline h-auto">
                View Details →
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
              <div className="h-4 w-4 text-green-600">💰</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.todaySales)}</div>
              <p className="text-xs text-gray-500 mt-1">
                +12% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prescriptions Today</CardTitle>
              <div className="h-4 w-4 text-blue-600">📋</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.todayPrescriptions}</div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.pendingPrescriptions} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patient Visits</CardTitle>
              <div className="h-4 w-4 text-purple-600">👥</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.patientVisits}</div>
              <p className="text-xs text-gray-500 mt-1">
                Active patients today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <div className="h-4 w-4 text-orange-600">📦</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.lowStockItems}</div>
              <p className="text-xs text-gray-500 mt-1">
                Require reordering
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="prescriptions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="prescriptions">Pending Prescriptions</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
            <TabsTrigger value="analytics">Quick Analytics</TabsTrigger>
          </TabsList>

          {/* Pending Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Pending Prescriptions
                  <Badge variant="secondary">{pendingRx.length} items</Badge>
                </CardTitle>
                <CardDescription>
                  Prescriptions requiring attention and processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRx.map((prescription) => (
                    <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold">{prescription.prescriptionNumber}</h4>
                          <Badge className={getStatusColor(prescription.status)}>
                            {prescription.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          {prescription.priority === 'urgent' && (
                            <Badge variant="destructive">URGENT</Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                          <div>
                            <strong>Patient:</strong> Patient #{prescription.patientId}
                          </div>
                          <div>
                            <strong>Medication:</strong> {prescription.medication.name}
                          </div>
                          <div>
                            <strong>Prescriber:</strong> {prescription.doctorName}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Qty: {prescription.quantity} • Refills: {prescription.refillsRemaining}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                        <Button size="sm">
                          Process
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">System Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.expiryAlerts > 0 && (
                    <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                      <div className="text-orange-600">⚠️</div>
                      <div>
                        <h4 className="font-semibold text-orange-800">Expiry Alerts</h4>
                        <p className="text-sm text-orange-700">
                          {stats.expiryAlerts} medication(s) expiring within 90 days
                        </p>
                        <Button size="sm" variant="link" className="text-orange-600 p-0 h-auto">
                          View expiring items →
                        </Button>
                      </div>
                    </div>
                  )}

                  {stats.lowStockItems > 0 && (
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="text-yellow-600">📦</div>
                      <div>
                        <h4 className="font-semibold text-yellow-800">Low Stock</h4>
                        <p className="text-sm text-yellow-700">
                          {stats.lowStockItems} item(s) below minimum stock level
                        </p>
                        <Button size="sm" variant="link" className="text-yellow-600 p-0 h-auto">
                          Generate purchase orders →
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="text-green-600">✅</div>
                    <div>
                      <h4 className="font-semibold text-green-800">System Status</h4>
                      <p className="text-sm text-green-700">
                        All systems operational • Last backup: 2 hours ago
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Insurance Claims</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Pending Claims</span>
                      <Badge variant="outline">{stats.insuranceClaims.pending}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Approved Today</span>
                      <Badge className="bg-green-100 text-green-800">{stats.insuranceClaims.approved}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Rejected Claims</span>
                      <Badge variant="destructive">{stats.insuranceClaims.rejected}</Badge>
                    </div>
                    <div className="pt-2">
                      <Button size="sm" className="w-full">
                        Process Claims Queue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Performance</CardTitle>
                  <CardDescription>Today vs. daily average</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Prescription Volume</span>
                      <span>{stats.todayPrescriptions}/60 (78%)</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Sales Target</span>
                      <span>{formatCurrency(stats.todaySales)}/{formatCurrency(5000)} (86%)</span>
                    </div>
                    <Progress value={86} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Patient Satisfaction</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Key pharmacy metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Average wait time</span>
                    <span className="font-semibold">8 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Inventory turnover</span>
                    <span className="font-semibold">12x/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Generic dispensing rate</span>
                    <span className="font-semibold">82%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Insurance claims accuracy</span>
                    <span className="font-semibold">96%</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm text-gray-600">Controlled substances</span>
                    <span className="font-semibold text-green-600">Compliant</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts for efficient pharmacy operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <div className="text-2xl">👤</div>
                <span className="text-xs">New Patient</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <div className="text-2xl">📋</div>
                <span className="text-xs">New Rx</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <div className="text-2xl">💳</div>
                <span className="text-xs">POS Sale</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <div className="text-2xl">📊</div>
                <span className="text-xs">Reports</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <div className="text-2xl">📦</div>
                <span className="text-xs">Inventory</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <div className="text-2xl">⚙️</div>
                <span className="text-xs">Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}