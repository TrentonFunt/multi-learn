import React from 'react';

interface CourseHeroProps {
  title: string;
  image: string;
}

const CourseHero: React.FC<CourseHeroProps> = ({ title, image }) => {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {title}
            </h1>
          </div>
          <div className="relative">
            <img
              src={image}
              alt="Course illustration"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
