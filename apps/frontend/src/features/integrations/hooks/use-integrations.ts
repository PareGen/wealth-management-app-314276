import type { CreateIntegrationDto, UpdateIntegrationDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { integrationsService } from '../services';

const INTEGRATION_KEY = ['integrations'];

export function useIntegrations() {
  return useQuery({
    queryKey: INTEGRATION_KEY,
    queryFn: () => integrationsService.getAll(),
  });
}

export function useIntegration(id: string) {
  return useQuery({
    queryKey: [...INTEGRATION_KEY, id],
    queryFn: () => integrationsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateIntegration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateIntegrationDto) => integrationsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INTEGRATION_KEY });
    },
  });
}

export function useUpdateIntegration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateIntegrationDto }) =>
      integrationsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INTEGRATION_KEY });
    },
  });
}

export function useDeleteIntegration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => integrationsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INTEGRATION_KEY });
    },
  });
}
