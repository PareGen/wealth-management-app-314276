import type { CreateNotificationDto, UpdateNotificationDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationsService } from '../services';

const NOTIFICATION_KEY = ['notifications'];

export function useNotifications() {
  return useQuery({
    queryKey: NOTIFICATION_KEY,
    queryFn: () => notificationsService.getAll(),
  });
}

export function useNotification(id: string) {
  return useQuery({
    queryKey: [...NOTIFICATION_KEY, id],
    queryFn: () => notificationsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNotificationDto) => notificationsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEY });
    },
  });
}

export function useUpdateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNotificationDto }) =>
      notificationsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEY });
    },
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEY });
    },
  });
}
