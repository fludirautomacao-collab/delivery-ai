import { NextResponse } from "next/server";
import { loginUser } from "@/modules/auth/login-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "email e password são obrigatórios." },
        { status: 400 },
      );
    }

    const user = await loginUser({
      email: body.email,
      password: body.password,
    });

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "E-mail ou senha inválidos."
    ) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 },
      );
    }

    console.error(error);

    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
