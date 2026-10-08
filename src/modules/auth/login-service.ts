import { findUserByEmail } from "./repository";
import { verifyPassword } from "./password";

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const validPassword = await verifyPassword(
    data.password,
    user.passwordHash,
  );

  if (!validPassword) {
    throw new Error("E-mail ou senha inválidos.");
  }

  return user;
}
