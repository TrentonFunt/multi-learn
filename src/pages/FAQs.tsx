import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQs: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['faq-2']));


  const faqItems: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'What Does Royalty Free Mean?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: 'faq-2',
      question: 'What Does Royalty Free Mean?',
      answer: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: 'faq-3',
      question: 'What Does Royalty Free Mean?',
      answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    },
    {
      id: 'faq-4',
      question: 'What Does Royalty Free Mean?',
      answer: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
    },
    {
      id: 'faq-5',
      question: 'What Does Royalty Free Mean?',
      answer: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
    },
    {
      id: 'faq-6',
      question: 'What Does Royalty Free Mean?',
      answer: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.'
    },
    {
      id: 'faq-7',
      question: 'What Does Royalty Free Mean?',
      answer: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.'
    },
    {
      id: 'faq-8',
      question: 'What Does Royalty Free Mean?',
      answer: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.'
    }
  ];

  const toggleFAQ = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="min-h-screen bg-neutral-light-grey">
      {/* Hero Section */}
      <section className="bg-neutral-light-grey py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-exo font-semibold text-absolute-black mb-4">
              FAQs
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* FAQ Accordion */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqItems.map((item, index) => {
              const isOpen = openItems.has(item.id);
              const isLeftColumn = index < 4;
              
              return (
                <div
                  key={item.id}
                  className={`bg-absolute-white rounded-card shadow-card overflow-hidden ${
                    isLeftColumn ? 'lg:col-span-1' : 'lg:col-span-1'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className={`w-full p-6 text-left transition-colors ${
                      isOpen
                        ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                        : 'bg-neutral-white-grey text-neutral-dark-grey hover:bg-neutral-light-grey'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg">{item.question}</h3>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6">
                      <p className="text-neutral-dark-grey leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Illustration Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="bg-absolute-white rounded-card shadow-card p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 text-center">
                  <div className="relative">
                    {/* Person illustration */}
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-400 rounded-lg transform rotate-45"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full"></div>
                    <div className="absolute top-8 -left-8 w-4 h-4 bg-green-400 rounded-full"></div>
                    
                    {/* Question mark */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">?</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-exo font-semibold text-neutral-dark-grey mt-4">
                    Still have questions?
                  </h3>
                  <p className="text-neutral-grey mt-2">
                    Our support team is here to help you with any questions you might have.
                  </p>
                </div>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-exo font-semibold text-absolute-black mb-4">
                  Need More Help?
                </h2>
                <p className="text-neutral-dark-grey mb-6">
                  If you can't find the answer you're looking for, don't hesitate to reach out to our support team. We're here to help you succeed in your learning journey.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📧</span>
                    </div>
                    <span className="text-neutral-dark-grey">support@multilearn.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">💬</span>
                    </div>
                    <span className="text-neutral-dark-grey">Live Chat Support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📞</span>
                    </div>
                    <span className="text-neutral-dark-grey">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
