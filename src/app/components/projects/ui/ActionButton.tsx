import React from 'react';

interface ActionButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className: string;
}

const ActionButton = ({ href, icon, label, className }: ActionButtonProps) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
  >
    {icon}
    <span>{label}</span>
  </a>
);

export default ActionButton; 