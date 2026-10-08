import { NextResponse } from "next/server";
import { clearSession } from "@/modules/auth/session";

export async function POST() {
  await clearSession();

  return NextResponse.json({
    message: "Logout realizado com sucesso.",
  });
}
