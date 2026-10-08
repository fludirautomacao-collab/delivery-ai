import {
  createUser,
  findUserByEmail,
} from "./repository";

export async function registerUser(data: {
  name: string;
  email: string;
  passwordHash: string;
}) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Já existe um usuário com este e-mail.");
  }

  return createUser(data);
}
