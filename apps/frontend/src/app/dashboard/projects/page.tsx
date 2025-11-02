'use client';

import { ProjectCard, ProjectDialog } from '@/features/projects/components';
import {
  useCreateProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from '@/features/projects/hooks';
import type { ProjectResponseDto } from '@saas-template/core';
import { Button } from '@saas-template/ui';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function ProjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectResponseDto | undefined>();

  const { data: projects, isLoading } = useProjects();
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: deleteProject } = useDeleteProject();

  const handleCreate = () => {
    setSelectedProject(undefined);
    setIsDialogOpen(true);
  };

  const handleEdit = (project: ProjectResponseDto) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  const handleSubmit = (data: { name: string; description?: string | undefined }) => {
    if (selectedProject) {
      updateProject(
        { id: selectedProject.id, data },
        {
          onSuccess: () => setIsDialogOpen(false),
        }
      );
    } else {
      createProject(data, {
        onSuccess: () => setIsDialogOpen(false),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-2">Manage your projects</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {projects && projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">No projects yet</p>
          <Button onClick={handleCreate}>Create your first project</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.map((project: ProjectResponseDto) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <ProjectDialog
        project={selectedProject}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isCreating || isUpdating}
      />
    </div>
  );
}
