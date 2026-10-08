import { findUserByEmail } from "./repository";
import { verifyPassword } from "./password";
import { createSession } from "./session";

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const passwordValid = await verifyPassword(
    data.password,
    user.passwordHash,
  );

  if (!passwordValid) {
    throw new Error("E-mail ou senha inválidos.");
  }

  await createSession(user.id);

  return user;
}
