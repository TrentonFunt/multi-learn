import React, { useState } from 'react';
import { Play, FileText, ChevronDown, ChevronRight, Clock } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz';
  duration: string;
  isPreview: boolean;
  isCompleted: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  isExpanded: boolean;
}

interface CurriculumTabProps {
  modules: Module[];
}

const CurriculumTab: React.FC<CurriculumTabProps> = ({ modules }) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <div key={module.id} className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleModule(module.id)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              {expandedModules.has(module.id) ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
              <h3 className="font-semibold text-gray-900">{module.title}</h3>
            </div>
            <span className="text-sm text-gray-500">{module.lessons.length} lessons</span>
          </button>
          
          {expandedModules.has(module.id) && (
            <div className="border-t border-gray-200">
              {module.lessons.map((lesson) => (
                <div key={lesson.id} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-500">
                      {getIcon(lesson.type)}
                    </div>
                    <span className="text-gray-700">{lesson.title}</span>
                    {lesson.isPreview && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Preview
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{lesson.duration}</span>
                    </div>
                    {lesson.isCompleted && (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Ready to start learning?</h3>
        <p className="text-gray-600 mb-4">
          Enroll in this course to access all lessons and start your learning journey.
        </p>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
          Start Course
        </button>
      </div>
    </div>
  );
};

export default CurriculumTab;
