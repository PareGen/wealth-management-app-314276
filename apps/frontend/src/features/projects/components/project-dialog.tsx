'use client';

import type { ProjectResponseDto } from '@saas-template/core';
import { useEffect, useState } from 'react';
import { ProjectForm } from './project-form';

interface ProjectDialogProps {
  project?: ProjectResponseDto | undefined;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description?: string | undefined }) => void;
  isSubmitting?: boolean;
}

export function ProjectDialog({
  project,
  open,
  onClose,
  onSubmit,
  isSubmitting,
}: ProjectDialogProps) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Close dialog"
      />
      <div className="relative bg-background rounded-lg shadow-lg p-6 w-full max-w-md z-50">
        <h2 className="text-2xl font-bold mb-4">{project ? 'Edit Project' : 'Create Project'}</h2>
        <ProjectForm
          project={project}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
