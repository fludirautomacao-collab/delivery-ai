import { NextResponse } from "next/server";
import { getSessionUserId } from "@/modules/auth/session";
import { findUserById } from "@/modules/auth/repository";

export async function GET() {
  const userId = await getSessionUserId();

  if (!userId) {
    return NextResponse.json(
      { error: "Não autenticado." },
      { status: 401 },
    );
  }

  const user = await findUserById(userId);

  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado." },
      { status: 401 },
    );
  }

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
}
