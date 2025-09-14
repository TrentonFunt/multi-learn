import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQTabProps {
  faqs: FAQ[];
}

const FAQTab: React.FC<FAQTabProps> = ({ faqs }) => {
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set());

  const toggleFAQ = (faqId: string) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    setExpandedFAQs(newExpanded);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div key={faq.id} className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
            {expandedFAQs.has(faq.id) ? (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>
          
          {expandedFAQs.has(faq.id) && (
            <div className="px-6 pb-4 border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed pt-4">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQTab;
