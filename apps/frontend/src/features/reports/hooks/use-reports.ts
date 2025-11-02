import type { CreateReportDto, UpdateReportDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reportsService } from '../services';

const REPORT_KEY = ['reports'];

export function useReports() {
  return useQuery({
    queryKey: REPORT_KEY,
    queryFn: () => reportsService.getAll(),
  });
}

export function useReport(id: string) {
  return useQuery({
    queryKey: [...REPORT_KEY, id],
    queryFn: () => reportsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReportDto) => reportsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORT_KEY });
    },
  });
}

export function useUpdateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReportDto }) =>
      reportsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORT_KEY });
    },
  });
}

export function useDeleteReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => reportsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORT_KEY });
    },
  });
}
