import type { CreatePortfolioDto, UpdatePortfolioDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { portfoliosService } from '../services';

const PORTFOLIO_KEY = ['portfolios'];

export function usePortfolios() {
  return useQuery({
    queryKey: PORTFOLIO_KEY,
    queryFn: () => portfoliosService.getAll(),
  });
}

export function usePortfolio(id: string) {
  return useQuery({
    queryKey: [...PORTFOLIO_KEY, id],
    queryFn: () => portfoliosService.getById(id),
    enabled: !!id,
  });
}

export function useCreatePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePortfolioDto) => portfoliosService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_KEY });
    },
  });
}

export function useUpdatePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePortfolioDto }) =>
      portfoliosService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_KEY });
    },
  });
}

export function useDeletePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => portfoliosService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PORTFOLIO_KEY });
    },
  });
}
