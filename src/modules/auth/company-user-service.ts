import {
  createCompanyUser,
  findCompanyUser,
} from "./company-user-repository";

export async function linkUserToCompany(data: {
  companyId: string;
  userId: string;
  role?: string;
}) {
  const existingLink = await findCompanyUser(
    data.companyId,
    data.userId,
  );

  if (existingLink) {
    throw new Error("Usuário já está vinculado a esta empresa.");
  }

  return createCompanyUser(data);
}
