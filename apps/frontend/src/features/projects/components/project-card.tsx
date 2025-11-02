import type { ProjectResponseDto } from '@saas-template/core';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@saas-template/ui';
import { Pencil, Trash2 } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectResponseDto;
  onEdit: (project: ProjectResponseDto) => void;
  onDelete: (id: string) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription className="mt-2">
              {project.description || 'No description'}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(project)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(project.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          Created {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
