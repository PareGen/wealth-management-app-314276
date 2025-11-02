import type { CreateInvestmentDto, UpdateInvestmentDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { investmentsService } from '../services';

const INVESTMENT_KEY = ['investments'];

export function useInvestments() {
  return useQuery({
    queryKey: INVESTMENT_KEY,
    queryFn: () => investmentsService.getAll(),
  });
}

export function useInvestment(id: string) {
  return useQuery({
    queryKey: [...INVESTMENT_KEY, id],
    queryFn: () => investmentsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvestmentDto) => investmentsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVESTMENT_KEY });
    },
  });
}

export function useUpdateInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInvestmentDto }) =>
      investmentsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVESTMENT_KEY });
    },
  });
}

export function useDeleteInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => investmentsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVESTMENT_KEY });
    },
  });
}
