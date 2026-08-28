"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Bell, CalendarDays, ChevronDown, CircleUserRound, Command, FileBarChart, Film, Group, LayoutDashboard, MapPin, Menu, Monitor, PanelLeftClose, PlaySquare, Search, Settings, ShieldCheck, Users, X, Megaphone } from "lucide-react";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
const nav=[
 ["Visão geral","/",LayoutDashboard],["Campanhas","/campanhas",Megaphone],["Programação","/programacao",CalendarDays],["Biblioteca","/midias",Film],
 ["Telas","/telas",Monitor],["Locais","/locais",MapPin],["Grupos de telas","/grupos",Group],["Clientes","/clientes",Users],["Anunciantes","/anunciantes",CircleUserRound],
 ["Exibições","/exibicoes",PlaySquare],["Relatórios","/relatorios",FileBarChart],["Usuários","/usuarios",ShieldCheck],["Configurações","/configuracoes",Settings]
] as const;
export function AppShell({children}:{children:ReactNode}) { const path=usePathname(); const [open,setOpen]=useState(false); return <div className="app">
 <aside className={cn("sidebar",open&&"open")}><div className="brand"><span className="brand-mark"><i/><i/><i/></span><strong>Signa</strong><button className="close-mobile" onClick={()=>setOpen(false)}><X/></button></div><div className="workspace"><span>OPERAÇÃO</span><button>Rede Grupo Aurora <ChevronDown size={14}/></button></div><nav>{nav.map(([label,href,Icon],i)=><div key={href}>{i===4&&<small>REDE</small>}{i===8&&<small>GESTÃO</small>}<Link onClick={()=>setOpen(false)} href={href} className={cn(path===href||href!=="/"&&path.startsWith(href)?"active":"")}><Icon size={17}/><span>{label}</span>{label==="Telas"&&<em>43</em>}</Link></div>)}</nav><div className="sidebar-foot"><div className="health"><Activity size={16}/><span><b>Rede estável</b><small>98,7% disponível</small></span></div><Link href="/portal"><Command size={16}/> Portal do anunciante</Link></div></aside>
 <div className="main"><header className="topbar"><button className="menu-btn" onClick={()=>setOpen(true)}><Menu/></button><div className="crumb"><span>Signa</span><b>/</b><strong>{nav.find(n=>n[1]!=="/"?path.startsWith(n[1]):path==="/")?.[0]||"Detalhes"}</strong></div><div className="top-actions"><button className="global"><Search size={16}/><span>Buscar em tudo</span><kbd>⌘ K</kbd></button><button className="icon-btn notice"><Bell size={18}/><i/></button><button className="profile"><span>LM</span><div><b>Lucas Mendes</b><small>Administrador</small></div><ChevronDown size={14}/></button></div></header><main>{children}</main></div>
 </div> }
