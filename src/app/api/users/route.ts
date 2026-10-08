import { NextResponse } from "next/server";
import { registerUser } from "@/modules/auth/service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: "name, email e password são obrigatórios." },
        { status: 400 },
      );
    }

    const user = await registerUser({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      { status: 201 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Já existe um usuário com este e-mail."
    ) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 },
      );
    }

    console.error(error);

    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
