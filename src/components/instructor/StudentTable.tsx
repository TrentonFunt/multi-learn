import React from 'react';
import { Eye } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
  enrolledCourses: number;
  lastActive: string;
  progress: number;
}

interface StudentTableProps {
  students: Student[];
  compact?: boolean;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, compact = false }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Student</th>
            <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">
              {compact ? 'Courses' : 'Enrolled Courses'}
            </th>
            <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">
              {compact ? 'Progress' : 'Overall Progress'}
            </th>
            <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Last Active</th>
            <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-3 px-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">{student.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{student.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{student.enrolledCourses}</td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  <div className={`${compact ? 'w-16' : 'w-20'} bg-gray-200 rounded-full h-2`}>
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{student.progress}%</span>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{student.lastActive}</td>
              <td className="py-3 px-4">
                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-1">
                  <Eye className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
