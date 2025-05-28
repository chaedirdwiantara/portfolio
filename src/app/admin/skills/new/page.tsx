'use client';

import SkillForm from '@/app/components/admin/SkillForm';

export default function NewSkill() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Skill</h1>
      <SkillForm />
    </div>
  );
} 