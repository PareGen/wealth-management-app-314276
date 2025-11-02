import type { CreateGoalDto, UpdateGoalDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { goalsService } from '../services';

const GOAL_KEY = ['goals'];

export function useGoals() {
  return useQuery({
    queryKey: GOAL_KEY,
    queryFn: () => goalsService.getAll(),
  });
}

export function useGoal(id: string) {
  return useQuery({
    queryKey: [...GOAL_KEY, id],
    queryFn: () => goalsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGoalDto) => goalsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOAL_KEY });
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGoalDto }) =>
      goalsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOAL_KEY });
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => goalsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOAL_KEY });
    },
  });
}
