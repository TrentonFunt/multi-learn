import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube, FaPinterest } from 'react-icons/fa';

interface SocialShareProps {
  title?: string;
  url?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ 
  title = document.title, 
  url = window.location.href 
}) => {
  const shareText = encodeURIComponent(`Check out this article: ${title}`);
  const shareUrl = encodeURIComponent(url);

  const socialLinks = [
    { 
      icon: FaFacebook, 
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, 
      label: 'Share on Facebook',
      color: 'hover:bg-blue-600 hover:text-white',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    { 
      icon: FaTwitter, 
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, 
      label: 'Share on Twitter',
      color: 'hover:bg-blue-400 hover:text-white',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    { 
      icon: FaPinterest, 
      href: `https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareText}`, 
      label: 'Share on Pinterest',
      color: 'hover:bg-red-500 hover:text-white',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400'
    },
    { 
      icon: FaYoutube, 
      href: '#', 
      label: 'Share on YouTube',
      color: 'hover:bg-red-600 hover:text-white',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400'
    }
  ];

  const handleShare = (social: typeof socialLinks[0], e: React.MouseEvent) => {
    if (social.label === 'Share on YouTube') {
      e.preventDefault();
      // YouTube doesn't have a direct share API, so we'll copy the URL to clipboard
      navigator.clipboard.writeText(url);
      alert('Article URL copied to clipboard!');
      return;
    }
    
    // Open social share links in new window
    window.open(social.href, '_blank', 'width=600,height=400');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Share:</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent"></div>
      </div>
      <div className="flex space-x-4">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            onClick={(e) => handleShare(social, e)}
            className={`flex items-center justify-center w-12 h-12 ${social.bgColor} ${social.textColor} rounded-full ${social.color} transition-all duration-200 transform hover:scale-110 hover:shadow-lg group`}
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
