import { type NextRequest, NextResponse } from "next/server"
import { getUserTasks, createTask } from "@/lib/storage"

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")
    const status = request.nextUrl.searchParams.get("status")

    if (!userId) {
      return NextResponse.json({ error: "userId é obrigatório" }, { status: 400 })
    }

    let tasks = getUserTasks(userId)

    // Filter by status if provided
    if (status) {
      tasks = tasks.filter((t) => t.status === status)
    }

    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar tarefas" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, title, description, dueDate } = body

    if (!userId || !title) {
      return NextResponse.json({ error: "userId e title são obrigatórios" }, { status: 400 })
    }

    const newTask = createTask(userId, title, description || "", dueDate || "")

    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar tarefa" }, { status: 500 })
  }
}
