import { NextResponse } from "next/server";
import { registerCompany } from "@/modules/companies/service";
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

    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: "name e slug são obrigatórios." },
        { status: 400 },
      );
    }

    const company = await registerCompany({
      name: body.name,
      slug: body.slug,
      phone: body.phone,
      email: body.email,
    });

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Já existe uma empresa com este slug."
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
