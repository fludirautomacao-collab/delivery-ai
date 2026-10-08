import { db } from "@/lib/database/db";

export async function findUserByEmail(email: string) {
  return db.orm.public.User.first({ email });
}

export async function findUserById(id: string) {
  return db.orm.public.User.first({ id });
}

export async function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
}) {
  return db.orm.public.User.create(data);
}
