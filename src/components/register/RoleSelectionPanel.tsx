import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, CheckCircle } from 'lucide-react';
import { type UserRole } from '../../contexts/AuthContext';

interface RoleSelectionPanelProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const RoleSelectionPanel: React.FC<RoleSelectionPanelProps> = ({ selectedRole, onRoleChange }) => {
  return (
    <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-8 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">Choose Your Path</h2>
        <p className="text-orange-100 mb-8">How would you like to join MultiLearn?</p>
        
        <div className="space-y-4">
          <motion.button
            onClick={() => onRoleChange('user')}
            className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
              selectedRole === 'user'
                ? 'bg-white text-orange-600 border-white shadow-lg scale-105'
                : 'bg-transparent text-white border-white/30 hover:border-white/60 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${
                selectedRole === 'user' ? 'bg-orange-100' : 'bg-white/20'
              }`}>
                <User className={`w-6 h-6 ${
                  selectedRole === 'user' ? 'text-orange-600' : 'text-white'
                }`} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Student</h3>
                <p className={`text-sm ${
                  selectedRole === 'user' ? 'text-orange-500' : 'text-orange-100'
                }`}>
                  Learn new skills and advance your career
                </p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => onRoleChange('instructor')}
            className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
              selectedRole === 'instructor'
                ? 'bg-white text-orange-600 border-white shadow-lg scale-105'
                : 'bg-transparent text-white border-white/30 hover:border-white/60 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${
                selectedRole === 'instructor' ? 'bg-orange-100' : 'bg-white/20'
              }`}>
                <GraduationCap className={`w-6 h-6 ${
                  selectedRole === 'instructor' ? 'text-orange-600' : 'text-white'
                }`} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Instructor</h3>
                <p className={`text-sm ${
                  selectedRole === 'instructor' ? 'text-orange-500' : 'text-orange-100'
                }`}>
                  Share your expertise and earn money
                </p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Benefits */}
        <div className="mt-8 space-y-3">
          {selectedRole === 'user' ? (
            <>
              <div className="flex items-center space-x-3 text-white">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-sm">Access to 1000+ courses</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-sm">Certificates of completion</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-sm">Community support</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3 text-white">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-sm">Create and sell courses</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-sm">Earn from your expertise</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-sm">Reach global audience</span>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelectionPanel;
