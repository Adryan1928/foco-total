import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: "pending" | "completed"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, "default" | "secondary" | "destructive"> = {
    pending: "default",
    completed: "secondary",
  }

  const labels: Record<string, string> = {
    pending: "Pendente",
    completed: "Concluída",
  }

  return <Badge variant={variants[status]}>{labels[status]}</Badge>
}
