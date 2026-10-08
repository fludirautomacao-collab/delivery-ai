import { db } from "@/lib/database/db";

export async function createCompanyUser(data: {
  companyId: string;
  userId: string;
  role?: string;
}) {
  return db.orm.public.CompanyUser.create(data);
}

export async function findCompanyUser(
  companyId: string,
  userId: string,
) {
  return db.orm.public.CompanyUser.first({
    companyId,
    userId,
  });
}
