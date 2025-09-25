export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  featuredImage: string;
  content: string;
  tags: string[];
  commentsCount: number;
  readTime: string;
  views: number;
  slug: string;
}

export interface BlogCategory {
  name: string;
  count: number;
}

export interface RecentPost {
  id: string;
  title: string;
  image: string;
  date: string;
}

// Comprehensive blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Best MultiLearn WordPress Theme Collection For 2024',
    excerpt: 'Looking for an amazing & well functional MultiLearn WordPress Theme? Here are the best collection of themes for your e-learning platform.',
    author: 'Sarah Johnson',
    date: 'Jan 24, 2024',
    category: 'WordPress',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    content: `
      <p>Looking for an amazing & well-functional MultiLearn WordPress Theme? Online education has become increasingly popular, and having the right theme for your learning management system is crucial for success.</p>
      
      <h2>Why Choose MultiLearn Themes?</h2>
      <p>MultiLearn themes are specifically designed for educational platforms, offering:</p>
      <ul>
        <li>Responsive design that works on all devices</li>
        <li>Built-in course management features</li>
        <li>Student dashboard and progress tracking</li>
        <li>Instructor tools and analytics</li>
        <li>Payment integration for course sales</li>
      </ul>
      
      <h2>Top MultiLearn Themes for 2024</h2>
      <p>Here are our top picks for the best MultiLearn WordPress themes this year:</p>
      
      <h3>1. EduMaster Pro</h3>
      <p>EduMaster Pro offers a comprehensive solution for online learning platforms. With its modern design and powerful features, it's perfect for universities, training centers, and individual instructors.</p>
      
      <h3>2. LearnPress Academy</h3>
      <p>This theme combines beautiful aesthetics with functionality. It includes advanced course creation tools, student progress tracking, and seamless integration with popular plugins.</p>
      
      <h3>3. SkillCraft LMS</h3>
      <p>SkillCraft LMS is designed for modern educators who want to create engaging learning experiences. It features interactive elements and gamification features.</p>
      
      <h2>Key Features to Look For</h2>
      <p>When choosing a MultiLearn theme, consider these essential features:</p>
      <ul>
        <li><strong>Course Builder:</strong> Easy-to-use course creation tools</li>
        <li><strong>Student Management:</strong> Comprehensive student tracking and progress monitoring</li>
        <li><strong>Payment Integration:</strong> Secure payment processing for course sales</li>
        <li><strong>Responsive Design:</strong> Mobile-friendly layouts</li>
        <li><strong>SEO Optimization:</strong> Built-in SEO features for better search rankings</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>Once you've chosen your MultiLearn theme, follow these steps to set up your online learning platform:</p>
      <ol>
        <li>Install and activate the theme</li>
        <li>Configure the theme settings</li>
        <li>Create your first course</li>
        <li>Set up payment processing</li>
        <li>Customize the design to match your brand</li>
      </ol>
      
      <p>With the right MultiLearn theme, you can create a professional and engaging online learning platform that your students will love.</p>
    `,
    tags: ['WordPress', 'LMS', 'MultiLearn', 'E-Learning', 'Themes'],
    commentsCount: 24,
    readTime: '8 min read',
    views: 1250,
    slug: 'best-multilearn-wordpress-theme-collection-2024'
  },
  {
    id: '2',
    title: 'Complete Guide to Building an Online Learning Platform',
    excerpt: 'Learn how to create a comprehensive online learning platform with modern features and best practices for student engagement and course management.',
    author: 'Mike Chen',
    date: 'Jan 20, 2024',
    category: 'E-Learning',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    content: `
      <p>Building an online learning platform requires careful planning and execution. In this comprehensive guide, we'll walk you through the entire process from conception to launch.</p>
      
      <h2>Planning Your Platform</h2>
      <p>Before diving into development, it's crucial to define your platform's goals and target audience:</p>
      <ul>
        <li>Identify your niche and target market</li>
        <li>Define learning objectives and outcomes</li>
        <li>Choose the right technology stack</li>
        <li>Plan your content strategy</li>
      </ul>
      
      <h2>Essential Features for Learning Platforms</h2>
      <p>Every successful online learning platform needs these core features:</p>
      
      <h3>User Management</h3>
      <p>Implement robust user registration, authentication, and profile management systems. Consider different user roles like students, instructors, and administrators.</p>
      
      <h3>Course Creation Tools</h3>
      <p>Provide instructors with intuitive tools to create and manage courses. Include support for various content types:</p>
      <ul>
        <li>Video lessons</li>
        <li>Interactive quizzes</li>
        <li>Downloadable resources</li>
        <li>Discussion forums</li>
      </ul>
      
      <h3>Progress Tracking</h3>
      <p>Enable students to track their learning progress with detailed analytics and completion certificates.</p>
      
      <h2>Technology Considerations</h2>
      <p>Choose technologies that can scale with your platform:</p>
      
      <h3>Frontend Technologies</h3>
      <ul>
        <li>React or Vue.js for interactive user interfaces</li>
        <li>Responsive CSS frameworks like Tailwind CSS</li>
        <li>Progressive Web App (PWA) capabilities</li>
      </ul>
      
      <h3>Backend Technologies</h3>
      <ul>
        <li>Node.js with Express or Django for API development</li>
        <li>Database systems like PostgreSQL or MongoDB</li>
        <li>Cloud storage for course materials</li>
      </ul>
      
      <h2>Content Delivery and Streaming</h2>
      <p>For video content, consider using specialized services:</p>
      <ul>
        <li>Video streaming platforms (Vimeo, Wistia)</li>
        <li>CDN services for fast content delivery</li>
        <li>Adaptive bitrate streaming for different devices</li>
      </ul>
      
      <h2>Monetization Strategies</h2>
      <p>Implement various revenue models:</p>
      <ul>
        <li>One-time course purchases</li>
        <li>Subscription-based access</li>
        <li>Freemium models with premium features</li>
        <li>Corporate training packages</li>
      </ul>
      
      <h2>Launch and Growth</h2>
      <p>After development, focus on:</p>
      <ul>
        <li>Beta testing with a small group of users</li>
        <li>Content creation and quality assurance</li>
        <li>Marketing and user acquisition</li>
        <li>Continuous improvement based on feedback</li>
      </ul>
      
      <p>Building a successful online learning platform takes time and dedication, but with the right approach, you can create something truly valuable for learners worldwide.</p>
    `,
    tags: ['E-Learning', 'Development', 'Platform', 'Guide', 'Technology'],
    commentsCount: 18,
    readTime: '12 min read',
    views: 980,
    slug: 'complete-guide-building-online-learning-platform'
  },
  {
    id: '3',
    title: 'Top 10 E-Learning Trends for 2024',
    excerpt: 'Discover the latest trends in e-learning that will shape the future of online education and student learning experiences.',
    author: 'Emma Rodriguez',
    date: 'Jan 18, 2024',
    category: 'Trends',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=250&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop',
    content: `
      <p>The e-learning landscape continues to evolve rapidly, with new technologies and methodologies reshaping how we approach online education. Here are the top trends that will dominate 2024.</p>
      
      <h2>1. Artificial Intelligence in Learning</h2>
      <p>AI is revolutionizing e-learning through personalized learning paths, intelligent tutoring systems, and automated content generation. Expect to see more adaptive learning platforms that adjust to individual student needs.</p>
      
      <h2>2. Microlearning and Bite-Sized Content</h2>
      <p>Short, focused learning modules are becoming increasingly popular. These bite-sized lessons fit better into busy schedules and improve knowledge retention.</p>
      
      <h2>3. Virtual and Augmented Reality</h2>
      <p>VR and AR technologies are creating immersive learning experiences, particularly in fields like medicine, engineering, and vocational training.</p>
      
      <h2>4. Gamification and Interactive Learning</h2>
      <p>Game elements like points, badges, and leaderboards make learning more engaging. Interactive simulations and scenarios help students apply knowledge in realistic contexts.</p>
      
      <h2>5. Mobile-First Learning</h2>
      <p>With increasing mobile device usage, e-learning platforms are prioritizing mobile-optimized experiences and native mobile applications.</p>
      
      <h2>6. Social Learning and Collaboration</h2>
      <p>Online learning is becoming more social with features like discussion forums, peer-to-peer learning, and collaborative projects.</p>
      
      <h2>7. Learning Analytics and Data-Driven Insights</h2>
      <p>Advanced analytics help educators understand student behavior, identify learning gaps, and optimize course content for better outcomes.</p>
      
      <h2>8. Accessibility and Inclusive Design</h2>
      <p>There's a growing focus on making e-learning accessible to learners with disabilities through better design, assistive technologies, and inclusive content.</p>
      
      <h2>9. Blockchain for Credentialing</h2>
      <p>Blockchain technology is being used to create secure, verifiable digital certificates and credentials that can't be falsified.</p>
      
      <h2>10. Hybrid and Blended Learning Models</h2>
      <p>The combination of online and offline learning experiences is becoming the new norm, offering flexibility while maintaining human interaction.</p>
      
      <h2>Looking Ahead</h2>
      <p>These trends indicate a shift toward more personalized, interactive, and accessible learning experiences. Educators and platform developers who embrace these trends will be better positioned to meet the evolving needs of modern learners.</p>
    `,
    tags: ['Trends', 'E-Learning', 'Technology', 'Future', 'Innovation'],
    commentsCount: 31,
    readTime: '6 min read',
    views: 1560,
    slug: 'top-10-elearning-trends-2024'
  },
  {
    id: '4',
    title: 'How to Create Engaging Online Courses',
    excerpt: 'Master the art of course creation with proven strategies for keeping students engaged and motivated throughout their learning journey.',
    author: 'David Kim',
    date: 'Jan 15, 2024',
    category: 'Course Creation',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    content: `
      <p>Creating engaging online courses is both an art and a science. In this guide, we'll explore proven strategies to design courses that captivate learners and drive real results.</p>
      
      <h2>Understanding Your Audience</h2>
      <p>Before creating any content, you need to deeply understand your target audience:</p>
      <ul>
        <li>Conduct surveys and interviews with potential students</li>
        <li>Identify their pain points and learning goals</li>
        <li>Understand their preferred learning styles</li>
        <li>Consider their technical proficiency level</li>
      </ul>
      
      <h2>Course Structure and Flow</h2>
      <p>A well-structured course follows a logical progression:</p>
      
      <h3>1. Introduction and Overview</h3>
      <p>Start with a compelling introduction that clearly outlines what students will learn and why it matters.</p>
      
      <h3>2. Learning Objectives</h3>
      <p>Clearly define what students will be able to do after completing each module and the entire course.</p>
      
      <h3>3. Progressive Difficulty</h3>
      <p>Structure content to build upon previous knowledge, starting with fundamentals and advancing to complex topics.</p>
      
      <h2>Content Creation Best Practices</h2>
      
      <h3>Video Content</h3>
      <ul>
        <li>Keep videos concise (5-10 minutes maximum)</li>
        <li>Use high-quality audio and visuals</li>
        <li>Include captions and transcripts</li>
        <li>Add interactive elements like quizzes</li>
      </ul>
      
      <h3>Interactive Elements</h3>
      <p>Engage students with:</p>
      <ul>
        <li>Knowledge checks and quizzes</li>
        <li>Hands-on exercises and projects</li>
        <li>Discussion forums and peer interaction</li>
        <li>Real-world case studies</li>
      </ul>
      
      <h2>Visual Design and Branding</h2>
      <p>Create a cohesive visual experience:</p>
      <ul>
        <li>Use consistent colors, fonts, and imagery</li>
        <li>Include your brand elements appropriately</li>
        <li>Ensure content is visually appealing and easy to read</li>
        <li>Use infographics and diagrams to explain complex concepts</li>
      </ul>
      
      <h2>Assessment and Feedback</h2>
      <p>Design assessments that truly measure learning:</p>
      <ul>
        <li>Use varied assessment types (quizzes, projects, peer reviews)</li>
        <li>Provide timely and constructive feedback</li>
        <li>Include self-assessment opportunities</li>
        <li>Track progress and celebrate milestones</li>
      </ul>
      
      <h2>Student Engagement Strategies</h2>
      <p>Keep students motivated throughout the course:</p>
      <ul>
        <li>Use storytelling to make content memorable</li>
        <li>Incorporate real-world examples and case studies</li>
        <li>Encourage community building among students</li>
        <li>Provide regular communication and updates</li>
      </ul>
      
      <h2>Continuous Improvement</h2>
      <p>Monitor and improve your courses based on:</p>
      <ul>
        <li>Student feedback and completion rates</li>
        <li>Learning analytics and engagement metrics</li>
        <li>Industry trends and best practices</li>
        <li>Regular content updates and refreshes</li>
      </ul>
      
      <p>Creating engaging online courses is an ongoing process that requires attention to both content quality and student experience. By following these strategies, you'll create courses that not only educate but inspire and motivate learners.</p>
    `,
    tags: ['Course Creation', 'Engagement', 'Teaching', 'Online Learning', 'Best Practices'],
    commentsCount: 22,
    readTime: '10 min read',
    views: 890,
    slug: 'how-to-create-engaging-online-courses'
  },
  {
    id: '5',
    title: 'Building a Successful Online Education Business',
    excerpt: 'Learn the essential steps to turn your knowledge into a profitable online education business with proven strategies for growth.',
    author: 'Lisa Wang',
    date: 'Jan 12, 2024',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
    content: `
      <p>Building a successful online education business requires more than just great content. You need a solid business strategy, effective marketing, and sustainable operations. Here's your complete guide.</p>
      
      <h2>Defining Your Business Model</h2>
      <p>Choose a business model that aligns with your goals and audience:</p>
      
      <h3>1. Course Sales</h3>
      <p>Sell individual courses or course bundles. This model works well for specific skills or knowledge areas.</p>
      
      <h3>2. Subscription Platform</h3>
      <p>Offer access to multiple courses for a monthly or annual fee. This provides recurring revenue and encourages ongoing learning.</p>
      
      <h3>3. Membership Community</h3>
      <p>Combine courses with exclusive community access, live sessions, and ongoing support.</p>
      
      <h3>4. Corporate Training</h3>
      <p>Provide training solutions for businesses and organizations.</p>
      
      <h2>Market Research and Validation</h2>
      <p>Before investing heavily in course creation, validate your market:</p>
      <ul>
        <li>Research competitor offerings and pricing</li>
        <li>Survey your target audience about their needs</li>
        <li>Test demand with a pilot course or webinar</li>
        <li>Analyze market size and growth potential</li>
      </ul>
      
      <h2>Content Strategy and Planning</h2>
      <p>Develop a comprehensive content strategy:</p>
      
      <h3>Course Planning</h3>
      <ul>
        <li>Create a curriculum map for your subject area</li>
        <li>Identify beginner, intermediate, and advanced content</li>
        <li>Plan for multiple learning formats (video, text, interactive)</li>
        <li>Consider certification and assessment options</li>
      </ul>
      
      <h2>Platform Selection</h2>
      <p>Choose the right platform for your needs:</p>
      <ul>
        <li><strong>All-in-one platforms:</strong> Teachable, Thinkific, LearnDash</li>
        <li><strong>Custom solutions:</strong> WordPress with LMS plugins</li>
        <li><strong>Marketplace platforms:</strong> Udemy, Coursera, Skillshare</li>
      </ul>
      
      <h2>Pricing Strategy</h2>
      <p>Develop a pricing strategy that reflects value:</p>
      <ul>
        <li>Research competitor pricing</li>
        <li>Consider your target audience's budget</li>
        <li>Test different price points</li>
        <li>Offer tiered pricing options</li>
      </ul>
      
      <h2>Marketing and Customer Acquisition</h2>
      <p>Build awareness and attract students:</p>
      
      <h3>Content Marketing</h3>
      <ul>
        <li>Create valuable blog content and resources</li>
        <li>Develop email marketing campaigns</li>
        <li>Use social media to build community</li>
        <li>Offer free mini-courses or webinars</li>
      </ul>
      
      <h3>Partnerships and Affiliates</h3>
      <ul>
        <li>Collaborate with industry influencers</li>
        <li>Develop affiliate programs</li>
        <li>Partner with complementary businesses</li>
        <li>Guest teach on other platforms</li>
      </ul>
      
      <h2>Operations and Scaling</h2>
      <p>Build systems that can grow with your business:</p>
      <ul>
        <li>Automate student onboarding and support</li>
        <li>Implement customer relationship management</li>
        <li>Create standard operating procedures</li>
        <li>Build a team as you grow</li>
      </ul>
      
      <h2>Measuring Success</h2>
      <p>Track key metrics to measure and improve performance:</p>
      <ul>
        <li>Student enrollment and completion rates</li>
        <li>Revenue and profit margins</li>
        <li>Customer satisfaction and reviews</li>
        <li>Marketing ROI and acquisition costs</li>
      </ul>
      
      <p>Building a successful online education business takes time and dedication, but with the right strategy and execution, you can create a sustainable and profitable venture that makes a real impact on learners' lives.</p>
    `,
    tags: ['Business', 'Entrepreneurship', 'Online Education', 'Marketing', 'Strategy'],
    commentsCount: 16,
    readTime: '14 min read',
    views: 720,
    slug: 'building-successful-online-education-business'
  },
  {
    id: '6',
    title: 'The Future of Remote Learning Technologies',
    excerpt: 'Explore emerging technologies that are reshaping remote learning and discover what the future holds for online education.',
    author: 'Alex Thompson',
    date: 'Jan 10, 2024',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
    content: `
      <p>The landscape of remote learning is evolving rapidly, driven by technological advances and changing educational needs. Let's explore the technologies that are shaping the future of online education.</p>
      
      <h2>Artificial Intelligence and Machine Learning</h2>
      <p>AI is transforming remote learning in several key ways:</p>
      
      <h3>Personalized Learning Paths</h3>
      <p>AI algorithms analyze student performance and learning patterns to create customized learning experiences that adapt to individual needs and pace.</p>
      
      <h3>Intelligent Tutoring Systems</h3>
      <p>Virtual tutors powered by AI can provide instant feedback, answer questions, and guide students through complex problems 24/7.</p>
      
      <h3>Automated Content Generation</h3>
      <p>AI tools are helping educators create quizzes, summaries, and even course content more efficiently.</p>
      
      <h2>Virtual and Augmented Reality</h2>
      <p>VR and AR technologies are creating immersive learning experiences:</p>
      
      <h3>Virtual Classrooms</h3>
      <p>Students can attend classes in virtual environments, interact with 3D objects, and collaborate with peers in shared virtual spaces.</p>
      
      <h3>Augmented Learning</h3>
      <p>AR overlays digital information onto the real world, making abstract concepts more tangible and easier to understand.</p>
      
      <h2>Advanced Learning Analytics</h2>
      <p>Sophisticated analytics provide deeper insights into learning:</p>
      <ul>
        <li>Predictive analytics to identify at-risk students</li>
        <li>Learning outcome predictions</li>
        <li>Content effectiveness analysis</li>
        <li>Engagement pattern recognition</li>
      </ul>
      
      <h2>Blockchain in Education</h2>
      <p>Blockchain technology is revolutionizing credentialing and verification:</p>
      <ul>
        <li>Secure, tamper-proof digital certificates</li>
        <li>Decentralized credential verification</li>
        <li>Micro-credentialing and skill badges</li>
        <li>Academic record portability</li>
      </ul>
      
      <h2>Internet of Things (IoT) in Learning</h2>
      <p>IoT devices are creating smart learning environments:</p>
      <ul>
        <li>Smart classrooms with automated systems</li>
        <li>Wearable devices for learning analytics</li>
        <li>Connected lab equipment for remote experiments</li>
        <li>Environmental sensors for optimal learning conditions</li>
      </ul>
      
      <h2>5G and Edge Computing</h2>
      <p>Next-generation connectivity enables new possibilities:</p>
      <ul>
        <li>Ultra-low latency for real-time collaboration</li>
        <li>High-quality video streaming anywhere</li>
        <li>Cloud computing power for complex simulations</li>
        <li>Mobile-first learning experiences</li>
      </ul>
      
      <h2>Challenges and Considerations</h2>
      <p>While these technologies offer exciting possibilities, they also present challenges:</p>
      <ul>
        <li>Digital divide and accessibility issues</li>
        <li>Privacy and data security concerns</li>
        <li>Cost and implementation challenges</li>
        <li>Need for teacher training and support</li>
      </ul>
      
      <h2>Looking Ahead</h2>
      <p>The future of remote learning will likely see these technologies converge to create more personalized, immersive, and effective learning experiences. Success will depend on thoughtful implementation that prioritizes student outcomes and accessibility.</p>
    `,
    tags: ['Technology', 'Future', 'AI', 'VR', 'Innovation'],
    commentsCount: 28,
    readTime: '9 min read',
    views: 1120,
    slug: 'future-remote-learning-technologies'
  }
];

// Blog categories data
export const blogCategories: BlogCategory[] = [
  { name: 'WordPress', count: 15 },
  { name: 'E-Learning', count: 22 },
  { name: 'Trends', count: 18 },
  { name: 'Course Creation', count: 12 },
  { name: 'Business', count: 8 },
  { name: 'Technology', count: 14 },
  { name: 'Marketing', count: 10 },
  { name: 'Development', count: 16 }
];

// Recent posts data (latest 3 posts)
export const recentPosts: RecentPost[] = blogPosts.slice(0, 3).map(post => ({
  id: post.id,
  title: post.title,
  image: post.image,
  date: post.date
}));

// Blog tags
export const blogTags = [
  'WordPress', 'LMS', 'MultiLearn', 'E-Learning', 'Themes',
  'Development', 'Platform', 'Guide', 'Technology', 'Trends',
  'Future', 'Innovation', 'Course Creation', 'Engagement',
  'Teaching', 'Online Learning', 'Best Practices', 'Business',
  'Entrepreneurship', 'Marketing', 'Strategy', 'AI', 'VR'
];

// Helper functions
export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentPostId: string, limit: number = 3): BlogPost[] => {
  const currentPost = getBlogPostById(currentPostId);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => post.id !== currentPostId && post.category === currentPost.category)
    .slice(0, limit);
};

// Get previous and next articles based on chronological order
export const getPreviousArticle = (currentPostId: string): BlogPost | null => {
  const currentIndex = blogPosts.findIndex(post => post.id === currentPostId);
  if (currentIndex === -1 || currentIndex === 0) return null;
  
  return blogPosts[currentIndex - 1];
};

export const getNextArticle = (currentPostId: string): BlogPost | null => {
  const currentIndex = blogPosts.findIndex(post => post.id === currentPostId);
  if (currentIndex === -1 || currentIndex === blogPosts.length - 1) return null;
  
  return blogPosts[currentIndex + 1];
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
};

export const searchBlogPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.category.toLowerCase().includes(lowercaseQuery)
  );
};
