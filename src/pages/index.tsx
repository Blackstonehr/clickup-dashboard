import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Building2, Users, CheckSquare, BarChart3, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const features = [
    {
      icon: Users,
      title: 'Employee Management',
      description: 'Track team members, their tasks, and performance metrics',
    },
    {
      icon: CheckSquare,
      title: 'Task Tracking',
      description: 'Monitor project progress and task completion rates',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Get detailed reports on team productivity and workload',
    },
  ];

  return (
    <Layout 
      title="Welcome"
      description="ClickUp-powered HR dashboard for employee and task management"
    >
      <div className="min-h-screen flex items-center justify-center -mt-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <Building2 className="h-16 w-16 text-primary-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              BlackstoneHR Dashboard
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Streamline your HR operations with powerful ClickUp integration. 
              Manage employees, track tasks, and gain insights into team performance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="btn-primary flex items-center justify-center space-x-2 px-8 py-3 text-lg"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => router.push('/employees')}
                className="btn-secondary flex items-center justify-center space-x-2 px-8 py-3 text-lg"
              >
                <Users className="h-5 w-5" />
                <span>View Employees</span>
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <Icon className="h-8 w-8 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Auto-redirect notice */}
          <div className="card p-6 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-center space-x-3">
              <LoadingSpinner size="sm" />
              <p className="text-blue-800">
                Redirecting to dashboard in a few seconds...
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

