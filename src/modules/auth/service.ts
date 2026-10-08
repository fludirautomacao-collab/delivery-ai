import {
  createUser,
  findUserByEmail,
} from "./repository";
import { hashPassword } from "./password";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Já existe um usuário com este e-mail.");
  }

  const passwordHash = await hashPassword(data.password);

  return createUser({
    name: data.name,
    email: data.email,
    passwordHash,
  });
}
