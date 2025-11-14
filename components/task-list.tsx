// components/task-list.tsx
'use client';

import { useGetTasks } from '@/lib/tasks-hooks';
import { useAuth } from '@/lib/auth-context';
import { LoadingSpinner } from './loading-spinner';
import { EmptyState } from './empty-state';
import { TaskItem } from './task-item'; 

export function TaskList() {
  const { user } = useAuth();
  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useGetTasks(user?.id || null, undefined);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Ops! Erro ao carregar tarefas: {error.message}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    // <--- 2. CORREÇÃO AQUI (adicionado props)
    return (
      <EmptyState
        title="Nenhuma tarefa encontrada"
        description="Comece criando sua primeira tarefa."
      />
    );
  }

  // A lista agora apenas mapeia e renderiza o TaskItem
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}