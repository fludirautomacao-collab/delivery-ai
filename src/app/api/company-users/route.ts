import { NextResponse } from "next/server";
import { linkUserToCompany } from "@/modules/auth/company-user-service";
import { getSessionUserId } from "@/modules/auth/session";

export async function POST(request: Request) {
  const userId = await getSessionUserId();

  if (!userId) {
    return NextResponse.json(
      { error: "Não autenticado." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();

    if (!body.companyId || !body.userId) {
      return NextResponse.json(
        { error: "companyId e userId são obrigatórios." },
        { status: 400 },
      );
    }

    const companyUser = await linkUserToCompany({
      companyId: body.companyId,
      userId: body.userId,
      role: body.role,
    });

    return NextResponse.json(companyUser, { status: 201 });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Usuário já está vinculado a esta empresa."
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
