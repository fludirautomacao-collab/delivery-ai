import { db } from "@/lib/database/db";

export async function findCompanyById(id: string) {
  return db.orm.public.Company.first({ id });
}

export async function findCompanyBySlug(slug: string) {
  return db.orm.public.Company.first({ slug });
}

export async function createCompany(data: {
  name: string;
  slug: string;
  phone?: string;
  email?: string;
}) {
  return db.orm.public.Company.create(data);
}
