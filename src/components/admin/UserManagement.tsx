import React, { useState } from 'react';
import { 
  Users, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  UserPlus,
  X
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import Button from '../ui/Button';
import ConfirmationModal from '../ui/ConfirmationModal';

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

interface UserManagementProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, setUsers }) => {
  const { addToast } = useToast();
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [userToView, setUserToView] = useState<User | null>(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Student' as User['role'],
    status: 'Active' as User['status']
  });

  // Filter users based on search term and filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(userSearchTerm.toLowerCase());
    const matchesFilter = userFilter === 'all' || user.status.toLowerCase() === userFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Handler Functions
  const handleUserAction = (action: string, userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    switch (action) {
      case 'view':
        setUserToView(user);
        setShowUserDetailsModal(true);
        break;
      case 'edit':
        setUserToEdit(user);
        setEditedUser({ ...user });
        setShowEditUserModal(true);
        break;
      case 'delete':
        setUserToDelete(user);
        setShowDeleteUserModal(true);
        break;
      case 'suspend':
        setUsers(users.map(u => 
          u.id === userId 
            ? { ...u, status: u.status === 'Suspended' ? 'Active' : 'Suspended' }
            : u
        ));
        addToast({
          type: 'success',
          title: 'User Status Updated',
          message: `User ${user.name} has been ${user.status === 'Suspended' ? 'activated' : 'suspended'}.`
        });
        break;
      case 'promote':
        setUsers(users.map(u => 
          u.id === userId 
            ? { ...u, role: u.role === 'Student' ? 'Instructor' : 'Student' }
            : u
        ));
        addToast({
          type: 'success',
          title: 'User Role Updated',
          message: `User ${user.name} has been ${user.role === 'Student' ? 'promoted to Instructor' : 'demoted to Student'}.`
        });
        break;
    }
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      addToast({
        type: 'success',
        title: 'User Deleted',
        message: `User ${userToDelete.name} has been deleted.`
      });
      setShowDeleteUserModal(false);
      setUserToDelete(null);
    }
  };

  const handleEditUser = () => {
    if (userToEdit && editedUser) {
      setUsers(users.map(u => 
        u.id === userToEdit.id 
          ? { ...u, ...editedUser }
          : u
      ));
      addToast({
        type: 'success',
        title: 'User Updated',
        message: `User ${editedUser.name} has been updated successfully.`
      });
      setShowEditUserModal(false);
      setUserToEdit(null);
      setEditedUser({});
    }
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().split('T')[0],
        coursesEnrolled: 0
      };
      setUsers([...users, user]);
      addToast({
        type: 'success',
        title: 'User Added',
        message: `User ${newUser.name} has been added successfully.`
      });
      setShowAddUserModal(false);
      setNewUser({ name: '', email: '', role: 'Student', status: 'Active' });
    }
  };

  const exportUsers = () => {
    const csvContent = [
      ['Name', 'Email', 'Role', 'Status', 'Join Date', 'Last Login', 'Courses Enrolled'],
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.role,
        user.status,
        user.joinDate,
        user.lastLogin,
        user.coursesEnrolled.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'Export Complete',
      message: 'User data has been exported successfully.'
    });
  };

  return (
    <div className="space-y-6">
      {/* User Management Header */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">User Management</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="small" onClick={exportUsers}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="fill" size="small" onClick={() => setShowAddUserModal(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={userSearchTerm}
              onChange={(e) => setUserSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">All Users</option>
            <option value="active" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Active</option>
            <option value="inactive" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Inactive</option>
            <option value="suspended" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Suspended</option>
          </select>
        </div>
        
        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">User</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Role</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Courses</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Last Login</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:bg-gray-700">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-gray-100 font-medium">{user.name}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'Instructor' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                        : user.role === 'Admin'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : user.status === 'Suspended'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.coursesEnrolled}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.lastLogin}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleUserAction('view', user.id)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleUserAction('edit', user.id)}
                        className="text-blue-600 hover:text-blue-700 p-1"
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleUserAction('promote', user.id)}
                        className={`p-1 ${
                          user.role === 'Student' 
                            ? 'text-green-600 hover:text-green-700' 
                            : 'text-blue-600 hover:text-blue-700'
                        }`}
                        title={user.role === 'Student' ? 'Promote to Instructor' : 'Demote to Student'}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleUserAction('suspend', user.id)}
                        className={`p-1 ${
                          user.status === 'Suspended' 
                            ? 'text-green-600 hover:text-green-700' 
                            : 'text-yellow-600 hover:text-yellow-700'
                        }`}
                        title={user.status === 'Suspended' ? 'Activate User' : 'Suspend User'}
                      >
                        {user.status === 'Suspended' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                      </button>
                      <button 
                        onClick={() => handleUserAction('delete', user.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">No users found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Delete User Modal */}
      <ConfirmationModal
        isOpen={showDeleteUserModal}
        onClose={() => setShowDeleteUserModal(false)}
        onConfirm={confirmDeleteUser}
        title="Delete User"
        message={`Are you sure you want to delete user "${userToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete User"
        cancelText="Cancel"
        type="danger"
      />

      {/* User Details Modal */}
      {showUserDetailsModal && userToView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                User Details
              </h3>
              <button
                onClick={() => {
                  setShowUserDetailsModal(false);
                  setUserToView(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* User Header */}
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">
                    {userToView.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {userToView.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">{userToView.email}</p>
                  <div className="flex space-x-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      userToView.role === 'Instructor' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                        : userToView.role === 'Admin'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {userToView.role}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      userToView.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : userToView.status === 'Suspended'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {userToView.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Join Date</h5>
                  <p className="text-gray-600 dark:text-gray-400">{userToView.joinDate}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Last Login</h5>
                  <p className="text-gray-600 dark:text-gray-400">{userToView.lastLogin}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Courses Enrolled</h5>
                  <p className="text-gray-600 dark:text-gray-400">{userToView.coursesEnrolled}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowUserDetailsModal(false);
                    setUserToView(null);
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="fill"
                  onClick={() => {
                    handleUserAction('edit', userToView.id);
                    setShowUserDetailsModal(false);
                    setUserToView(null);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Edit User
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && userToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Edit User
              </h3>
              <button
                onClick={() => {
                  setShowEditUserModal(false);
                  setUserToEdit(null);
                  setEditedUser({});
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editedUser.name || ''}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editedUser.email || ''}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Role
                </label>
                <select
                  value={editedUser.role || 'Student'}
                  onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value as User['role'] })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="Student" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Student</option>
                  <option value="Instructor" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Instructor</option>
                  <option value="Admin" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Status
                </label>
                <select
                  value={editedUser.status || 'Active'}
                  onChange={(e) => setEditedUser({ ...editedUser, status: e.target.value as User['status'] })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="Active" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Active</option>
                  <option value="Inactive" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Inactive</option>
                  <option value="Suspended" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Suspended</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditUserModal(false);
                  setUserToEdit(null);
                  setEditedUser({});
                }}
              >
                Cancel
              </Button>
              <Button
                variant="fill"
                onClick={handleEditUser}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Update User
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Add New User
              </h3>
              <button
                onClick={() => {
                  setShowAddUserModal(false);
                  setNewUser({ name: '', email: '', role: 'Student', status: 'Active' });
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as User['role'] })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="Student" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Student</option>
                  <option value="Instructor" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Instructor</option>
                  <option value="Admin" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Status
                </label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({ ...newUser, status: e.target.value as User['status'] })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="Active" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Active</option>
                  <option value="Inactive" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Inactive</option>
                  <option value="Suspended" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Suspended</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddUserModal(false);
                  setNewUser({ name: '', email: '', role: 'Student', status: 'Active' });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="fill"
                onClick={handleAddUser}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Add User
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
