import React from 'react';

interface OverviewTabProps {
  description: string;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ description }) => {
  return (
    <div className="space-y-6">
      <div className="prose max-w-none dark:prose-invert">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {description}
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
      </div>
    </div>
  );
};

export default OverviewTab;
