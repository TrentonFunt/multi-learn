import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Settings as SettingsIcon, 
  Shield,
  Users, 
  BookOpen, 
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Dashboard from '../components/admin/Dashboard';
import UserManagement from '../components/admin/UserManagement';
import CourseManagement from '../components/admin/CourseManagement';
import InstructorManagement from '../components/admin/InstructorManagement';
import Analytics from '../components/admin/Analytics';
import Settings from '../components/admin/Settings';

// Define interfaces for type safety
interface User {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  role: 'Student' | 'Instructor' | 'Admin';
  lastLogin: string;
  coursesEnrolled: number;
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  students: number;
  status: 'Published' | 'Draft' | 'Archived';
  price: number;
  category: string;
  createdAt: string;
  rating: number;
}

interface Instructor {
  id: string;
  uid: string;
  name: string;
  email: string;
  specialties: string[];
  experience: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
  bio: string;
  verificationDate: string;
  rejectionReason?: string;
}

interface AnalyticsData {
  totalRevenue: number;
  monthlyRevenue: number;
  totalEnrollments: number;
  monthlyEnrollments: number;
  averageRating: number;
  completionRate: number;
}

interface SettingsData {
  siteName: string;
  siteDescription: string;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  maintenanceMode: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
  emailNotifications: boolean;
  smsNotifications: boolean;
}

const Admin: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // User Management State
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2024-01-15', status: 'Active', role: 'Student', lastLogin: '2024-01-20', coursesEnrolled: 3 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2024-01-14', status: 'Active', role: 'Instructor', lastLogin: '2024-01-19', coursesEnrolled: 0 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', joinDate: '2024-01-13', status: 'Inactive', role: 'Student', lastLogin: '2024-01-10', coursesEnrolled: 1 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', joinDate: '2024-01-12', status: 'Active', role: 'Student', lastLogin: '2024-01-18', coursesEnrolled: 5 },
    { id: 5, name: 'David Brown', email: 'david@example.com', joinDate: '2024-01-11', status: 'Active', role: 'Instructor', lastLogin: '2024-01-20', coursesEnrolled: 0 },
    { id: 6, name: 'Lisa Davis', email: 'lisa@example.com', joinDate: '2024-01-10', status: 'Suspended', role: 'Student', lastLogin: '2024-01-08', coursesEnrolled: 2 }
  ]);
  
  // Course Management State
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, title: 'React Fundamentals', instructor: 'John Doe', students: 234, status: 'Published', price: 99, category: 'Development', createdAt: '2024-01-15', rating: 4.8 },
    { id: 2, title: 'Advanced JavaScript', instructor: 'Jane Smith', students: 189, status: 'Draft', price: 149, category: 'Development', createdAt: '2024-01-14', rating: 4.6 },
    { id: 3, title: 'Node.js Backend', instructor: 'Mike Johnson', students: 156, status: 'Published', price: 199, category: 'Development', createdAt: '2024-01-13', rating: 4.9 },
    { id: 4, title: 'UI/UX Design', instructor: 'Sarah Wilson', students: 298, status: 'Published', price: 79, category: 'Design', createdAt: '2024-01-12', rating: 4.7 },
    { id: 5, title: 'Python for Beginners', instructor: 'David Brown', students: 445, status: 'Published', price: 0, category: 'Programming', createdAt: '2024-01-11', rating: 4.5 },
    { id: 6, title: 'Digital Marketing', instructor: 'Lisa Davis', students: 123, status: 'Archived', price: 129, category: 'Marketing', createdAt: '2024-01-10', rating: 4.3 }
  ]);
  
  // Instructor Management State
  const [instructors, setInstructors] = useState<Instructor[]>([
    { 
      id: '1', 
      uid: 'instructor1',
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      specialties: ['React', 'JavaScript', 'Web Development'], 
      experience: '5+ years',
      status: 'Pending',
      appliedDate: '2024-01-15',
      bio: 'Experienced web developer with expertise in React and JavaScript.',
      verificationDate: '2024-01-15'
    },
    { 
      id: '2', 
      uid: 'instructor2',
      name: 'David Brown', 
      email: 'david@example.com', 
      specialties: ['Python', 'Data Science', 'Machine Learning'], 
      experience: '7+ years',
      status: 'Approved',
      appliedDate: '2024-01-10',
      bio: 'Data scientist with extensive experience in Python and ML.',
      verificationDate: '2024-01-12'
    },
    { 
      id: '3', 
      uid: 'instructor3',
      name: 'Sarah Wilson', 
      email: 'sarah@example.com', 
      specialties: ['UI/UX Design', 'Figma', 'Design Systems'], 
      experience: '4+ years',
      status: 'Rejected',
      appliedDate: '2024-01-08',
      bio: 'UI/UX designer passionate about creating beautiful user experiences.',
      rejectionReason: 'Insufficient portfolio examples provided.',
      verificationDate: '2024-01-09'
    }
  ]);
  
  // Analytics State
  const [analyticsData] = useState<AnalyticsData>({
    totalRevenue: 125430,
    monthlyRevenue: 15420,
    totalEnrollments: 2341,
    monthlyEnrollments: 234,
    averageRating: 4.7,
    completionRate: 78.5
  });
  
  // Settings State
  const [settings, setSettings] = useState<SettingsData>({
    siteName: 'MultiLearn',
    siteDescription: 'A modern e-learning platform',
    allowRegistration: true,
    requireEmailVerification: true,
    maintenanceMode: false,
    maxFileSize: 100,
    allowedFileTypes: ['jpg', 'png', 'pdf', 'mp4'],
    emailNotifications: true,
    smsNotifications: false
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'instructors', label: 'Instructors', icon: GraduationCap },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard users={users} courses={courses} />;
      case 'users':
        return <UserManagement users={users} setUsers={setUsers} />;
      case 'instructors':
        return <InstructorManagement instructors={instructors} setInstructors={setInstructors} />;
      case 'courses':
        return <CourseManagement courses={courses} setCourses={setCourses} />;
      case 'analytics':
        return <Analytics analyticsData={analyticsData} courses={courses} users={users} />;
      case 'settings':
        return <Settings settings={settings} setSettings={setSettings} />;
      default:
        return <Dashboard users={users} courses={courses} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-exo font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Admin Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Manage your MultiLearn platform
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
              {/* Admin Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {user?.displayName || 'Admin'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {user?.email}
                </p>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-2">
                  Administrator
                </span>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-red-600 text-white shadow-md'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            {renderActiveTab()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
