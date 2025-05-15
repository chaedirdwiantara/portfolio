'use client';

import ProjectForm from '@/app/components/admin/ProjectForm';

export default function NewProject() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Project</h1>
      <ProjectForm />
    </div>
  );
} 