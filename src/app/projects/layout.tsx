import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Chaedir - Full Stack Developer',
  description: 'Explore my portfolio of web development projects including React, Next.js, and other modern technologies.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 