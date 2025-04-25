// Portfolio data file
// This file contains all the data that will be used across the portfolio

export const personalInfo = {
  name: "Chaedir",
  title: "Full Stack Developer",
  email: "your.email@example.com", // Replace with your actual email
  location: "Your Location", // e.g., "Jakarta, Indonesia"
  bio: "Full-stack developer passionate about creating elegant and user-friendly web applications with modern technologies. I specialize in JavaScript/TypeScript, React, and Next.js."
};

export const socialLinks = {
  github: "https://github.com/yourusername", // Replace with your actual GitHub URL
  linkedin: "https://linkedin.com/in/yourusername", // Replace with your actual LinkedIn URL
  twitter: "https://twitter.com/yourusername", // Replace with your actual Twitter URL
  // Add more social links as needed
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

export const projects = [
  {
    id: 1,
    title: "Project One",
    description: "A modern web application built with Next.js and Tailwind CSS",
    image: "/images/projects/project1.jpg", // You'll need to add these images
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://project1.example.com",
    sourceUrl: "https://github.com/yourusername/project1",
    featured: true,
  },
  {
    id: 2,
    title: "Project Two",
    description: "Full-stack e-commerce platform with secure payment integration",
    image: "/images/projects/project2.jpg",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    liveUrl: "https://project2.example.com",
    sourceUrl: "https://github.com/yourusername/project2",
    featured: true,
  },
  {
    id: 3,
    title: "Project Three",
    description: "Mobile-responsive dashboard with data visualization",
    image: "/images/projects/project3.jpg",
    technologies: ["React", "D3.js", "Material UI", "Firebase"],
    liveUrl: "https://project3.example.com",
    sourceUrl: "https://github.com/yourusername/project3",
    featured: false,
  },
  // Add more projects as needed
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