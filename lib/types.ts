// Types for the entire application
export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface Task {
  id: string
  userId: string
  title: string
  description: string
  dueDate: string
  status: "pending" | "completed"
  createdAt: string
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}
