import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import "./dashboard.css";
import "./extra.css";
import "./operations.css";
import "./validation.css";
import { AppShell } from "@/components/app-shell";
const inter=Inter({subsets:["latin"],variable:"--font-body"});
const manrope=Manrope({subsets:["latin"],variable:"--font-display"});
export const metadata:Metadata={title:"Signa — Operação de mídia",description:"Gestão profissional de digital signage"};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body className={`${inter.variable} ${manrope.variable}`}><AppShell>{children}</AppShell></body></html> }
