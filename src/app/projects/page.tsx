import { Metadata } from 'next';

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Projects | Chaedir - Full Stack Developer',
  description: 'Explore my portfolio of web development projects including React, Next.js, and other modern technologies.',
};

import ProjectsPageContent from '../components/projects/ProjectsPageContent';

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
