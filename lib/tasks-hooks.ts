"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'; 
import type { Task } from "./types"; 

// --- 1. Hook para BUSCAR Tarefas (GET) ---

const getTasks = async (userId: string | null, status?: string): Promise<Task[]> => {

  const { data } = await axios.get('/api/tasks', {
    params: { userId, status } 
  });
  return data;
};

export const useGetTasks = (userId: string | null, status?: string) => {
  const queryKey = ['tasks', { userId, status }];

  return useQuery<Task[], Error>({
    queryKey: queryKey,
    queryFn: () => getTasks(userId, status),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
};

// --- 2. Hook para CRIAR Tarefa (POST) ---

type CreateTaskInput = {
  userId: string;
  title: string;
  description: string;
  dueDate: string;
};

const createTask = async (taskInput: CreateTaskInput): Promise<Task> => {
  // O axios.post já converte 'taskInput' para JSON automaticamente
  const { data } = await axios.post('/api/tasks', taskInput);
  return data;
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, CreateTaskInput>({
    mutationFn: createTask,
    onSuccess: () => {
      // Invalida o cache ['tasks'] para atualizar a lista
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

// --- 3. Hook para ATUALIZAR Tarefa (PATCH) ---

type UpdateTaskInput = {
  taskId: string;
  updates: Partial<Task>;
};

const updateTask = async ({ taskId, updates }: UpdateTaskInput): Promise<Task> => {
  const { data } = await axios.patch(`/api/tasks/${taskId}`, updates);
  return data;
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, UpdateTaskInput>({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

// --- 4. Hook para DELETAR Tarefa (DELETE) ---

const deleteTask = async (taskId: string): Promise<any> => {
  const { data } = await axios.delete(`/api/tasks/${taskId}`);
  return data;
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};