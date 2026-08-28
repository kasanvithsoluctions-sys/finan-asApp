import { z } from "zod";

const unsafeText = /[<>\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

function safeText(label: string, min: number, max: number) {
  return z.string({ required_error: `${label} é obrigatório.` }).trim()
    .min(min, `${label} deve ter pelo menos ${min} caracteres.`)
    .max(max, `${label} deve ter no máximo ${max} caracteres.`)
    .refine((value) => !unsafeText.test(value), `${label} contém caracteres não permitidos.`);
}

export const clientSchema = z.object({
  contactName: safeText("Nome do responsável", 2, 100),
  company: safeText("Empresa", 2, 120),
  email: z.string({ required_error: "E-mail é obrigatório." }).trim()
    .max(254, "E-mail deve ter no máximo 254 caracteres.")
    .email("Informe um e-mail válido.")
    .transform((value) => value.toLowerCase()),
  phone: z.string({ required_error: "Telefone é obrigatório." }).trim()
    .min(10, "Informe um telefone com DDD.")
    .max(20, "Telefone deve ter no máximo 20 caracteres.")
    .regex(/^[+\d\s().-]+$/, "Telefone contém caracteres não permitidos.")
    .refine((value) => {
      let digits = value.replace(/\D/g, "");
      if (digits.startsWith("55") && digits.length >= 12) digits = digits.slice(2);
      if (!/^[1-9]{2}(?:[2-5]\d{7}|9\d{8})$/.test(digits)) return false;
      return !/^(\d)\1+$/.test(digits);
    }, "Informe um telefone brasileiro válido com DDD."),
});

export const campaignSchema = z.object({
  name: safeText("Nome da campanha", 3, 120),
  client: z.string().trim().min(1, "Selecione um cliente.").max(100),
  objective: safeText("Objetivo", 3, 300),
});

export type FieldErrors = Record<string, string>;

export function getFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");
    if (!errors[field]) errors[field] = issue.message;
  }
  return errors;
}
