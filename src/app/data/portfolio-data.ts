export const personalInfo = {
  name: "Chaedir Dwiantara",
  title: "Full Stack Developer",
  email: "chaedirdwiantara@gmail.com", 
  location: "Bogor, Indonesia", 
  bio: "Full-stack developer passionate about creating elegant and user-friendly web applications with modern technologies. I specialize in JavaScript/TypeScript, React, and Next.js."
};

// Typing effect titles for the hero section
export const typingTitles = [
  "Full Stack Developer",
  "TypeScript Expert",
  "React Native Developer",
  "Flutter Developer",
  "React Developer",
  "Next.js Specialist",
  "Freelancer",
];

export const socialLinks = {
  github: "https://github.com/chaedirdwiantara",
  linkedin: "https://www.linkedin.com/in/chaedir-dwiantara/",
  instagram: "https://www.instagram.com/chaedir_dwiantara/",
  discord: "https://discord.com/users/377379625581543424",
};

export const skills = [
  {
    category: "Frontend",
    technologies: [
      { name: "HTML5/CSS3", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    category: "Backend",
    technologies: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "PostgreSQL", level: 65 },
      { name: "REST API", level: 85 },
    ],
  },
  {
    category: "Tools & Others",
    technologies: [
      { name: "Git/GitHub", level: 85 },
      { name: "Docker", level: 65 },
      { name: "Jest", level: 70 },
      { name: "CI/CD", level: 65 },
      { name: "Responsive Design", level: 90 },
    ],
  },
];

// Import images
import placeholderImg from '../assets/images/default-project.jpg';
import project1Img from '../assets/images/projects/project1.jpg';
import project2Img from '../assets/images/projects/project2.jpg';
import project3Img from '../assets/images/projects/project3.jpg';

// Example projects data
export const projects = [
  {
    id: 1,
    title: "Modern E-commerce Platform",
    description: "A full-featured e-commerce platform built with Next.js, featuring product listings, shopping cart, user authentication, payment processing with Stripe, and an admin dashboard for inventory management.",
    image: project1Img,
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Stripe", "MongoDB"],
    liveUrl: "https://example-ecommerce.com",
    sourceUrl: "https://github.com/yourusername/ecommerce-platform",
    featured: true,
  },
  {
    id: 2,
    title: "HealthTrack Mobile App",
    description: "A comprehensive health tracking mobile application that helps users monitor their daily activity, nutrition, and sleep patterns. Features include customizable workout plans, meal tracking, and progress analytics.",
    image: project2Img,
    technologies: ["React Native", "TypeScript", "Firebase", "Redux", "Expo"],
    sourceUrl: "https://github.com/yourusername/health-track-app",
    isMobileApp: true,
    appStoreUrl: "https://apps.apple.com/app/healthtrack",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.healthtrack",
    platforms: ["ios", "android"] as ("ios" | "android")[],
    featured: true,
  },
  {
    id: 3,
    title: "AI-Powered Content Generator",
    description: "A web application that leverages OpenAI's API to generate various types of content including blog posts, social media captions, and marketing copy. Includes features for customizing tone, style, and content length.",
    image: project3Img,
    technologies: ["React", "Node.js", "Express", "OpenAI API", "MongoDB", "JWT"],
    liveUrl: "https://content-generator-ai.com",
    sourceUrl: "https://github.com/yourusername/ai-content-generator",
  },
  {
    id: 4,
    title: "TaskMaster Productivity App",
    description: "A mobile task management application designed to boost productivity with features like task categorization, priority levels, reminders, and progress tracking. Syncs across devices for seamless workflow.",
    image: placeholderImg,
    technologies: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "Google Auth"],
    isMobileApp: true,
    appStoreUrl: "https://apps.apple.com/app/taskmaster",
    platforms: ["ios"] as ("ios" | "android")[],
    featured: false,
  },
  {
    id: 5,
    title: "Real-time Collaborative Whiteboard",
    description: "A web-based collaborative whiteboard application that allows multiple users to draw, add sticky notes, and share ideas in real-time. Perfect for remote teams, brainstorming sessions, and online education.",
    image: placeholderImg,
    technologies: ["React", "Socket.io", "Canvas API", "Node.js", "Redis", "AWS"],
    liveUrl: "https://collab-whiteboard.io",
    sourceUrl: "https://github.com/yourusername/collaborative-whiteboard",
  },
  {
    id: 6,
    title: "CityGuide Travel Companion",
    description: "A mobile travel companion app featuring curated city guides, interactive maps, offline navigation, local recommendations, and trip planning tools. Includes augmented reality features for landmark identification.",
    image: placeholderImg,
    technologies: ["React Native", "GraphQL", "Apollo", "MapBox API", "AWS Amplify"],
    isMobileApp: true,
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.cityguide",
    platforms: ["android"] as ("ios" | "android")[],
  },
  {
    id: 7,
    title: "Financial Dashboard",
    description: "A comprehensive financial dashboard for tracking investments, expenses, and income. Features include data visualization, budget planning tools, automated expense categorization, and financial goal setting.",
    image: placeholderImg,
    technologies: ["Vue.js", "D3.js", "TypeScript", "Node.js", "PostgreSQL", "Plaid API"],
    liveUrl: "https://finance-dashboard-pro.com",
    sourceUrl: "https://github.com/yourusername/finance-dashboard",
  },
  {
    id: 8,
    title: "AR Shopping Experience",
    description: "A mobile application that enhances shopping with augmented reality, allowing users to visualize products in their space before purchasing. Includes 3D product viewing, measurements, and virtual try-on features.",
    image: placeholderImg,
    technologies: ["Swift", "ARKit", "SceneKit", "CoreML", "Firebase"],
    isMobileApp: true,
    appStoreUrl: "https://apps.apple.com/app/ar-shopping",
    platforms: ["ios"] as ("ios" | "android")[],
  }
];

export const experiences = [
  {
    title: "Senior Front-end Developer",
    company: "Company Name",
    location: "Location",
    period: "Jan 2022 - Present",
    description: [
      "Led the development of the company's main web application using React and TypeScript",
      "Improved application performance by 40% through code optimization and lazy loading",
      "Implemented automated testing with Jest, achieving 80% code coverage",
      "Mentored junior developers and conducted code reviews"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Previous Company",
    location: "Location",
    period: "Mar 2020 - Dec 2021",
    description: [
      "Developed and maintained multiple client websites using React and Node.js",
      "Built RESTful APIs and integrated third-party services",
      "Collaborated with designers to implement responsive UI/UX designs",
      "Participated in agile development processes and sprint planning"
    ]
  },
  {
    title: "Web Developer Intern",
    company: "Internship Company",
    location: "Location",
    period: "Sep 2019 - Feb 2020",
    description: [
      "Assisted in the development of web applications using JavaScript and PHP",
      "Gained experience with version control using Git",
      "Participated in testing and debugging processes"
    ]
  }
  // Add more experiences as needed
];

export const education = [
  {
    degree: "Bachelor of Computer Science",
    institution: "Your University",
    location: "Location",
    period: "2016 - 2020",
    description: "Focused on web development and software engineering principles."
  },
  // Add more education as needed
];

export const testimonials = [
  {
    id: 1,
    name: "Client Name",
    position: "CEO, Company ABC",
    text: "Chaedir delivered an exceptional website that exceeded our expectations. Their attention to detail and technical expertise is impressive.",
    avatar: "/images/testimonials/client1.jpg", // You'll need to add these images
  },
  {
    id: 2,
    name: "Another Client",
    position: "Marketing Director, XYZ Inc",
    text: "Working with Chaedir was a pleasure. They understood our needs perfectly and delivered a high-quality product on time.",
    avatar: "/images/testimonials/client2.jpg",
  },
  // Add more testimonials as needed
]; 