import {
  createCompany,
  findCompanyBySlug,
} from "./repository";

export async function registerCompany(data: {
  name: string;
  slug: string;
  phone?: string;
  email?: string;
}) {
  const existingCompany = await findCompanyBySlug(data.slug);

  if (existingCompany) {
    throw new Error("Já existe uma empresa com este slug.");
  }

  return createCompany(data);
}
