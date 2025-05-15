'use client';

import { useParams } from 'next/navigation';
import ProjectForm from '@/app/components/admin/ProjectForm';

export default function EditProject() {
  const params = useParams();
  const projectId = params.id ? Number(params.id) : undefined;
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Project</h1>
      {projectId ? (
        <ProjectForm projectId={projectId} />
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>Invalid project ID</p>
        </div>
      )}
    </div>
  );
} 