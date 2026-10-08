import { NextResponse } from "next/server";
import { registerUser } from "@/modules/auth/service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.passwordHash) {
      return NextResponse.json(
        { error: "name, email e passwordHash são obrigatórios." },
        { status: 400 },
      );
    }

    const user = await registerUser({
      name: body.name,
      email: body.email,
      passwordHash: body.passwordHash,
    });

    return NextResponse.json(user, { status: 201 });
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
