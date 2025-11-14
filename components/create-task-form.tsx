'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useCreateTask } from '@/lib/tasks-hooks'; 
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button'; 
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CreateTaskForm() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Estados locais do formulário
  const [title, setTitle] = useState('');
 
  
  const { mutate: createTask, isPending } = useCreateTask();

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- DEBUG: VAMOS VER O QUE ESTÁ ACONTECENDO ---
    console.log("Formulário submetido!");
    console.log("Usuário (useAuth):", user);
    console.log("Título (useState):", title);
    // ---------------------------------------------

    // Verificação de validação
    if (!user || !title.trim()) {
      console.error("Validação falhou! O 'user' ou o 'title' está faltando.", { user, title });
      toast({
        title: "Erro de validação",
        description: "O título é obrigatório e você deve estar logado.",
        variant: "destructive",
      });
      return; // A função para aqui
    }

    console.log("Validação passou. Enviando para a mutação...");

    createTask(
      {
        userId: user.id,
        title,
        description: "", // Você pode adicionar os outros campos aqui
        dueDate: "",     // Você pode adicionar os outros campos aqui
      },
      {
        onSuccess: () => {
          toast({ title: 'Sucesso!', description: 'Tarefa criada.' });
          setTitle(''); // Limpa o formulário
        },
        onError: (error) => {
          toast({
            title: 'Erro ao criar tarefa',
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };
    return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título da tarefa..."
          disabled={isPending}
        />
      </div>
   
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Salvando...' : 'Adicionar Tarefa'}
      </Button>
    </form>
  );
}