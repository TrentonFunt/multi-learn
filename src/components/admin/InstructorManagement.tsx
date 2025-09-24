import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Eye, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Download, 
  X
} from 'lucide-react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useToast } from '../../contexts/ToastContext';
import Button from '../ui/Button';

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

interface InstructorManagementProps {
  instructors: Instructor[];
  setInstructors: React.Dispatch<React.SetStateAction<Instructor[]>>;
}

const InstructorManagement: React.FC<InstructorManagementProps> = ({ instructors, setInstructors }) => {
  const { addToast } = useToast();
  const [instructorSearchTerm, setInstructorSearchTerm] = useState('');
  const [instructorFilter, setInstructorFilter] = useState('all');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [instructorToReject, setInstructorToReject] = useState<Instructor | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [instructorToView, setInstructorToView] = useState<Instructor | null>(null);

  // Fetch instructor applications from Firestore
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const applicationsRef = collection(db, 'instructorApplications');
        const snapshot = await getDocs(applicationsRef);
        const applications = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Instructor[];
        
        setInstructors(applications);
      } catch (error) {
        console.error('Error fetching instructor applications:', error);
        addToast({
          type: 'error',
          title: 'Fetch Failed',
          message: 'Failed to fetch instructor applications. Please try again.'
        });
      }
    };

    fetchInstructors();
  }, [setInstructors, addToast]);

  // Filter instructors based on search term and filter
  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(instructorSearchTerm.toLowerCase()) ||
                         instructor.email.toLowerCase().includes(instructorSearchTerm.toLowerCase());
    const matchesFilter = instructorFilter === 'all' || instructor.status.toLowerCase() === instructorFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Instructor Management Functions
  const handleApproveInstructor = async (instructorId: string) => {
    try {
      const instructor = instructors.find(inst => inst.id === instructorId);
      if (!instructor) return;

      // Update Firestore documents
      await Promise.all([
        // Update user document
        updateDoc(doc(db, 'users', instructor.uid), {
          instructorVerificationStatus: 'approved',
          instructorVerificationDate: new Date()
        }),
        // Update instructor application document
        updateDoc(doc(db, 'instructorApplications', instructorId), {
          status: 'Approved',
          verificationDate: new Date().toISOString().split('T')[0]
        })
      ]);

      // Update local state
      setInstructors(instructors.map(inst => 
        inst.id === instructorId 
          ? { ...inst, status: 'Approved', verificationDate: new Date().toISOString().split('T')[0] }
          : inst
      ));

      addToast({
        type: 'success',
        title: 'Instructor Approved',
        message: `${instructor.name} has been approved as an instructor.`
      });
    } catch (error) {
      console.error('Error approving instructor:', error);
      addToast({
        type: 'error',
        title: 'Approval Failed',
        message: 'Failed to approve instructor. Please try again.'
      });
    }
  };

  const handleRejectInstructor = async (instructorId: string, reason: string) => {
    try {
      const instructor = instructors.find(inst => inst.id === instructorId);
      if (!instructor) return;

      // Update Firestore documents
      await Promise.all([
        // Update user document
        updateDoc(doc(db, 'users', instructor.uid), {
          instructorVerificationStatus: 'rejected',
          instructorVerificationDate: new Date(),
          instructorRejectionReason: reason
        }),
        // Update instructor application document
        updateDoc(doc(db, 'instructorApplications', instructorId), {
          status: 'Rejected',
          verificationDate: new Date().toISOString().split('T')[0],
          rejectionReason: reason
        })
      ]);

      // Update local state
      setInstructors(instructors.map(inst => 
        inst.id === instructorId 
          ? { 
              ...inst, 
              status: 'Rejected', 
              verificationDate: new Date().toISOString().split('T')[0],
              rejectionReason: reason
            }
          : inst
      ));

      addToast({
        type: 'warning',
        title: 'Instructor Rejected',
        message: `${instructor.name} has been rejected as an instructor.`
      });

      setShowRejectionModal(false);
      setRejectionReason('');
      setInstructorToReject(null);
    } catch (error) {
      console.error('Error rejecting instructor:', error);
      addToast({
        type: 'error',
        title: 'Rejection Failed',
        message: 'Failed to reject instructor. Please try again.'
      });
    }
  };

  const handleRevokeApproval = async (instructorId: string) => {
    try {
      const instructor = instructors.find(inst => inst.id === instructorId);
      if (!instructor) return;

      const revocationReason = 'Approval revoked by administrator';

      // Update Firestore documents
      await Promise.all([
        // Update user document
        updateDoc(doc(db, 'users', instructor.uid), {
          instructorVerificationStatus: 'rejected',
          instructorVerificationDate: new Date(),
          instructorRejectionReason: revocationReason
        }),
        // Update instructor application document
        updateDoc(doc(db, 'instructorApplications', instructorId), {
          status: 'Rejected',
          verificationDate: new Date().toISOString().split('T')[0],
          rejectionReason: revocationReason
        })
      ]);

      // Update local state
      setInstructors(instructors.map(inst => 
        inst.id === instructorId 
          ? { 
              ...inst, 
              status: 'Rejected', 
              verificationDate: new Date().toISOString().split('T')[0],
              rejectionReason: revocationReason
            }
          : inst
      ));

      addToast({
        type: 'warning',
        title: 'Approval Revoked',
        message: `${instructor.name}'s instructor status has been revoked.`
      });
    } catch (error) {
      console.error('Error revoking instructor approval:', error);
      addToast({
        type: 'error',
        title: 'Revocation Failed',
        message: 'Failed to revoke instructor approval. Please try again.'
      });
    }
  };

  const openRejectionModal = (instructor: Instructor) => {
    setInstructorToReject(instructor);
    setShowRejectionModal(true);
  };

  const openViewDetailsModal = (instructor: Instructor) => {
    setInstructorToView(instructor);
    setShowViewDetailsModal(true);
  };

  const exportInstructors = () => {
    const csvContent = [
      ['Name', 'Email', 'Specialties', 'Experience', 'Status', 'Applied Date', 'Verification Date'],
      ...filteredInstructors.map(instructor => [
        instructor.name,
        instructor.email,
        instructor.specialties.join('; '),
        instructor.experience,
        instructor.status,
        instructor.appliedDate,
        instructor.verificationDate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'instructors.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'Export Complete',
      message: 'Instructor data has been exported successfully.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Instructor Management Header */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Instructor Management</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="small" onClick={exportInstructors}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search instructors..."
              value={instructorSearchTerm}
              onChange={(e) => setInstructorSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <select 
            value={instructorFilter}
            onChange={(e) => setInstructorFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">All Instructors</option>
            <option value="pending" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Pending Approval</option>
            <option value="approved" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Approved</option>
            <option value="rejected" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Rejected</option>
          </select>
        </div>
        
        {/* Instructors Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Instructor</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Specialties</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Experience</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Verification Status</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Applied Date</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstructors.map((instructor) => (
                <tr key={instructor.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:bg-gray-700">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {instructor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-gray-100 font-medium">{instructor.name}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{instructor.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {instructor.specialties.map((specialty, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{instructor.experience}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      instructor.status === 'Approved' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : instructor.status === 'Rejected'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {instructor.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{instructor.appliedDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openViewDetailsModal(instructor)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {instructor.status === 'Pending' && (
                        <>
                          <button 
                            className="text-green-600 hover:text-green-700 p-1"
                            title="Approve Instructor"
                            onClick={() => handleApproveInstructor(instructor.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-700 p-1"
                            title="Reject Instructor"
                            onClick={() => openRejectionModal(instructor)}
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      {instructor.status === 'Approved' && (
                        <button 
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Revoke Approval"
                          onClick={() => handleRevokeApproval(instructor.id)}
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                      {instructor.status === 'Rejected' && instructor.rejectionReason && (
                        <button 
                          className="text-gray-600 hover:text-gray-700 p-1"
                          title={`Rejection Reason: ${instructor.rejectionReason}`}
                        >
                          <AlertCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredInstructors.length === 0 && (
          <div className="text-center py-8">
            <GraduationCap className="h-12 w-12 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">No instructors found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && instructorToReject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Reject Instructor
              </h3>
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionReason('');
                  setInstructorToReject(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Are you sure you want to reject <strong>{instructorToReject.name}</strong> as an instructor?
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rejection Reason (Optional)
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Please provide a reason for rejection..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionReason('');
                  setInstructorToReject(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="fill"
                onClick={() => instructorToReject && handleRejectInstructor(instructorToReject.id, rejectionReason)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Reject Instructor
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewDetailsModal && instructorToView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Instructor Details
              </h3>
              <button
                onClick={() => {
                  setShowViewDetailsModal(false);
                  setInstructorToView(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Instructor Header */}
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">
                    {instructorToView.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {instructorToView.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">{instructorToView.email}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                    instructorToView.status === 'Approved' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : instructorToView.status === 'Rejected'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {instructorToView.status}
                  </span>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Experience</h5>
                  <p className="text-gray-600 dark:text-gray-400">{instructorToView.experience}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Applied Date</h5>
                  <p className="text-gray-600 dark:text-gray-400">{instructorToView.appliedDate}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Verification Date</h5>
                  <p className="text-gray-600 dark:text-gray-400">{instructorToView.verificationDate}</p>
                </div>
                {instructorToView.status === 'Rejected' && instructorToView.rejectionReason && (
                  <div>
                    <h5 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Rejection Reason</h5>
                    <p className="text-red-600 dark:text-red-400">{instructorToView.rejectionReason}</p>
                  </div>
                )}
              </div>

              {/* Specialties */}
              <div>
                <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Specialties</h5>
                <div className="flex flex-wrap gap-2">
                  {instructorToView.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Bio</h5>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {instructorToView.bio}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowViewDetailsModal(false);
                    setInstructorToView(null);
                  }}
                >
                  Close
                </Button>
                {instructorToView.status === 'Pending' && (
                  <>
                    <Button
                      variant="fill"
                      onClick={() => {
                        handleApproveInstructor(instructorToView.id);
                        setShowViewDetailsModal(false);
                        setInstructorToView(null);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="fill"
                      onClick={() => {
                        openRejectionModal(instructorToView);
                        setShowViewDetailsModal(false);
                        setInstructorToView(null);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorManagement;
