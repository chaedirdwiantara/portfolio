'use client';

import SkillForm from '@/app/components/admin/SkillForm';
import { useParams } from 'next/navigation';

export default function EditSkill() {
  const params = useParams();
  const skillId = parseInt(params.id as string);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Skill</h1>
      <SkillForm skillId={skillId} />
    </div>
  );
} 