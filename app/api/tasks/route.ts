import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (err) {
    console.error("Erro GET /tasks:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, title, description, dueDate } = body;

  
    console.log("---------------------------------");
    console.log("RECEBIDO NA API (POST):", body);
    console.log("TENTANDO CRIAR TASK COM userId:", userId);
    console.log("---------------------------------");
   

    if (!userId || !title) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        userId, 
        title,
        description: description || "",
        dueDate: dueDate ? new Date(dueDate) : null,
        status: "pending",
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (err) {
    // Log do erro completo para o terminal
    console.error("ERRO COMPLETO DO PRISMA (POST):", err);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
