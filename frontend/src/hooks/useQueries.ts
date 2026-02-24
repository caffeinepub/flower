import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { TaskType, TaskView } from '../backend';

export function useTasks() {
  const { actor, isFetching } = useActor();

  return useQuery<TaskView[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      if (!actor) return [];
      // Since there's no getAllTasks method, we'll return an empty array
      // In a real implementation, the backend would need a method to fetch all tasks
      return [];
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3000, // Poll every 3 seconds for updates
  });
}

export function useTask(taskId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<TaskView>({
    queryKey: ['task', taskId.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getTask(taskId);
    },
    enabled: !!actor && !isFetching && taskId !== undefined,
  });
}

export function useCreateTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ description, taskType }: { description: string; taskType: TaskType }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createTask(description, taskType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useRefreshTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getTask(taskId);
    },
    onSuccess: (_, taskId) => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
