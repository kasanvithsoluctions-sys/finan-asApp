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

export const scheduleSchema = z.object({
  campaign: z.string().trim().min(1, "Selecione uma campanha.").max(100),
  screen: z.string().trim().min(1, "Selecione uma tela.").max(100),
  start: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Informe uma data inicial válida."),
  end: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Informe uma data final válida."),
}).superRefine((value,context)=>{
  if(value.end<=value.start)context.addIssue({code:z.ZodIssueCode.custom,path:["end"],message:"O término deve ser posterior ao início."});
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

export const MEDIA_UPLOAD_LIMITS = {
  maxFiles: 10,
  maxImageBytes: 25 * 1024 * 1024,
  maxVideoBytes: 1024 * 1024 * 1024,
  maxPayloadBytes: 2 * 1024 * 1024 * 1024,
} as const;

const mediaTypes: Record<string, readonly string[]> = {
  "image/jpeg": ["jpg", "jpeg"],
  "image/png": ["png"],
  "image/webp": ["webp"],
  "video/mp4": ["mp4"],
  "video/webm": ["webm"],
};

export function validateMediaFiles(files: File[]): string[] {
  const errors: string[] = [];
  if (!files.length) return ["Selecione pelo menos um arquivo."];
  if (files.length > MEDIA_UPLOAD_LIMITS.maxFiles) errors.push(`Envie no máximo ${MEDIA_UPLOAD_LIMITS.maxFiles} arquivos por vez.`);
  if (files.reduce((total, file) => total + file.size, 0) > MEDIA_UPLOAD_LIMITS.maxPayloadBytes) errors.push("O envio total não pode ultrapassar 2 GB.");
  for (const file of files) {
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    const allowedExtensions = mediaTypes[file.type];
    if (!allowedExtensions?.includes(extension)) {
      errors.push(`${file.name}: formato não permitido ou extensão incompatível.`);
      continue;
    }
    if (!file.size) errors.push(`${file.name}: o arquivo está vazio.`);
    const limit = file.type.startsWith("image/") ? MEDIA_UPLOAD_LIMITS.maxImageBytes : MEDIA_UPLOAD_LIMITS.maxVideoBytes;
    if (file.size > limit) errors.push(`${file.name}: excede o limite de ${file.type.startsWith("image/") ? "25 MB" : "1 GB"}.`);
    if (file.name.length > 180 || /[<>\u0000-\u001F\u007F]/.test(file.name)) errors.push(`${file.name}: nome de arquivo inválido.`);
  }
  return [...new Set(errors)];
}

export async function validateMediaSignatures(files: File[]): Promise<string[]> {
  const errors: string[] = [];
  for (const file of files) {
    const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    const ascii = String.fromCharCode(...bytes);
    const valid = file.type === "image/jpeg" ? bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
      : file.type === "image/png" ? [0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a].every((byte,index)=>bytes[index]===byte)
      : file.type === "image/webp" ? ascii.slice(0,4) === "RIFF" && ascii.slice(8,12) === "WEBP"
      : file.type === "video/mp4" ? ascii.slice(4,8) === "ftyp"
      : file.type === "video/webm" ? [0x1a,0x45,0xdf,0xa3].every((byte,index)=>bytes[index]===byte)
      : false;
    if (!valid) errors.push(`${file.name}: o conteúdo não corresponde ao formato declarado.`);
  }
  return errors;
}
