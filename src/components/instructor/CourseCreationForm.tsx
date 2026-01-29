import React from 'react';
import { Plus, XCircle, Video, Trash2, BookOpen, Save, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  materials: string[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface CourseData {
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  isFree: boolean;
  image: string;
  tags: string[];
  modules: Module[];
}

interface CourseCreationFormProps {
  newCourse: CourseData;
  setNewCourse: React.Dispatch<React.SetStateAction<CourseData>>;
  currentModule: { title: string; description: string; lessons: Lesson[] };
  setCurrentModule: React.Dispatch<React.SetStateAction<{ title: string; description: string; lessons: Lesson[] }>>;
  currentLesson: { title: string; description: string; videoUrl: string; duration: string; materials: string[] };
  setCurrentLesson: React.Dispatch<React.SetStateAction<{ title: string; description: string; videoUrl: string; duration: string; materials: string[] }>>;
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
  isCreatingCourse: boolean;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onAddModule: () => void;
  onRemoveModule: (index: number) => void;
  onAddLesson: (moduleIndex: number) => void;
  onRemoveLesson: (moduleIndex: number, lessonIndex: number) => void;
  onCreateCourse: () => void;
  onCancel: () => void;
}

const CourseCreationForm: React.FC<CourseCreationFormProps> = ({
  newCourse,
  setNewCourse,
  currentModule: _currentModule,
  setCurrentModule,
  currentLesson,
  setCurrentLesson,
  tagInput,
  setTagInput,
  isCreatingCourse,
  onAddTag,
  onRemoveTag,
  onAddModule,
  onRemoveModule,
  onAddLesson,
  onRemoveLesson,
  onCreateCourse,
  onCancel
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Create New Course</h2>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              variant="fill" 
              onClick={onCreateCourse}
              disabled={isCreatingCourse}
            >
              {isCreatingCourse ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Course
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Basic Course Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <Input
                  value={newCourse.title}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter course title"
                  name="courseTitle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newCourse.category}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Photography">Photography</option>
                  <option value="Music">Music</option>
                  <option value="Health">Health</option>
                  <option value="Fitness">Fitness</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={newCourse.description}
                onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what students will learn in this course"
                rows={4}
                name="courseDescription"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Level
                </label>
                <select
                  value={newCourse.level}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, level: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price
                </label>
                <Input
                  type="number"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                  name="coursePrice"
                  disabled={newCourse.isFree}
                />
              </div>

              <div className="flex items-center space-x-3 pt-6">
                <input
                  type="checkbox"
                  id="isFree"
                  checked={newCourse.isFree}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, isFree: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="isFree" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Free Course
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course Image URL
              </label>
              <Input
                value={newCourse.image}
                onChange={(e) => setNewCourse(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                name="courseImage"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tags</h3>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                name="tagInput"
                onKeyPress={(e) => e.key === 'Enter' && onAddTag()}
              />
              <Button variant="outline" onClick={onAddTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {newCourse.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {newCourse.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tag}
                    <button
                      onClick={() => onRemoveTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Course Modules */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Course Modules</h3>
              <Button variant="outline" onClick={onAddModule}>
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </Button>
            </div>

            {newCourse.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Module {moduleIndex + 1}</h4>
                  <Button 
                    variant="text" 
                    size="small"
                    onClick={() => onRemoveModule(moduleIndex)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Module Title
                    </label>
                    <Input
                      value={module.title}
                      onChange={(e) => setCurrentModule(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Module title"
                      name="moduleTitle"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Module Description
                    </label>
                    <Textarea
                      value={module.description}
                      onChange={(e) => setCurrentModule(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Module description"
                      rows={2}
                      name="moduleDescription"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-gray-700 dark:text-gray-300">Lessons</h5>
                    <Button 
                      variant="outline" 
                      size="small"
                      onClick={() => onAddLesson(moduleIndex)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Lesson
                    </Button>
                  </div>

                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="bg-gray-50 dark:bg-gray-700 rounded p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Video className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-900 dark:text-gray-100">{lesson.title}</span>
                        <span className="text-xs text-gray-500">{lesson.duration}</span>
                      </div>
                      <Button 
                        variant="text" 
                        size="small"
                        onClick={() => onRemoveLesson(moduleIndex, lessonIndex)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      value={currentLesson.title}
                      onChange={(e) => setCurrentLesson(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Lesson title"
                      name="lessonTitle"
                    />
                    <Input
                      value={currentLesson.duration}
                      onChange={(e) => setCurrentLesson(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="Duration (e.g., 10:30)"
                      name="lessonDuration"
                    />
                  </div>
                  <Input
                    value={currentLesson.videoUrl}
                    onChange={(e) => setCurrentLesson(prev => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="Video URL or upload file"
                    name="lessonVideo"
                  />
                </div>
              </div>
            ))}

            {newCourse.modules.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No modules added yet. Click "Add Module" to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreationForm;
