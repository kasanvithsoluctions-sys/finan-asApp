import type { Campaign, Client, Location, Media, Screen } from "@/types/entities";
export const campaigns: Campaign[] = [
 {id:"black-friday-vale-sul",name:"Black Friday — Vale Sul",client:"Grupo Aurora",status:"Ativa",start:"18 nov",end:"30 nov",screens:24,progress:68},
 {id:"institucional-agosto",name:"Institucional Agosto",client:"Rede Horizonte",status:"Agendada",start:"02 set",end:"30 set",screens:12,progress:0},
 {id:"menu-verao",name:"Menu de Verão",client:"Sabor & Brasa",status:"Ativa",start:"12 ago",end:"12 out",screens:8,progress:41},
 {id:"nova-colecao",name:"Nova Coleção Essencial",client:"Casa Nativa",status:"Rascunho",start:"—",end:"—",screens:0,progress:15},
];
export const screens: Screen[] = [
 {id:"recepcao-principal",name:"Recepção Principal",code:"SP-REC-042",location:"Edifício Aurora",group:"Recepções",status:"Online",content:"Institucional Agosto",sync:"há 2 min",resolution:"1920 × 1080",orientation:"Horizontal"},
 {id:"painel-praca",name:"Painel Praça de Alimentação",code:"SJC-PA-008",location:"Shopping Vale Sul",group:"Shopping Centers",status:"Online",content:"Black Friday — Vale Sul",sync:"agora",resolution:"3840 × 2160",orientation:"Horizontal"},
 {id:"totem-academia",name:"Totem Entrada Academia",code:"CPS-AC-019",location:"Pulse Campinas",group:"Academias",status:"Sincronizando",content:"Plano anual Pulse",sync:"62% concluído",resolution:"1080 × 1920",orientation:"Vertical"},
 {id:"vitrine-norte",name:"Vitrine Ala Norte",code:"SP-VN-106",location:"Shopping Pátio Norte",group:"Shopping Centers",status:"Offline",content:"Reprodução local ativa",sync:"há 3 h",resolution:"1920 × 1080",orientation:"Horizontal"},
 {id:"menu-centro",name:"Menu Digital Centro",code:"RJ-MD-031",location:"Sabor & Brasa Centro",group:"Restaurantes",status:"Atenção",content:"Menu de Verão",sync:"há 28 min",resolution:"1080 × 1920",orientation:"Vertical"},
];
export const clients: Client[] = [
 {id:"grupo-aurora",name:"Marina Costa",company:"Grupo Aurora",email:"marina@grupoaurora.com.br",phone:"(11) 98842-7721",status:"Ativo",campaigns:7,screens:28,since:"12 mar 2024"},
 {id:"rede-horizonte",name:"Rafael Nunes",company:"Rede Horizonte",email:"rafael@redehorizonte.com.br",phone:"(21) 99610-4032",status:"Ativo",campaigns:4,screens:12,since:"08 jun 2024"},
 {id:"sabor-brasa",name:"Bianca Martins",company:"Sabor & Brasa",email:"bianca@saborebrasa.com.br",phone:"(11) 97441-1083",status:"Ativo",campaigns:3,screens:8,since:"19 fev 2025"},
 {id:"casa-nativa",name:"Caio Ribeiro",company:"Casa Nativa",email:"caio@casanativa.com.br",phone:"(41) 99128-6620",status:"Em revisão",campaigns:1,screens:5,since:"03 jul 2025"},
];
export const locations: Location[] = [
 {id:"shopping-vale-sul",name:"Shopping Vale Sul",client:"Grupo Aurora",address:"Av. Andrômeda, 227",city:"São José dos Campos",state:"SP",screens:14,status:"Operando"},
 {id:"edificio-aurora",name:"Edifício Aurora",client:"Grupo Aurora",address:"Av. Paulista, 1842",city:"São Paulo",state:"SP",screens:6,status:"Operando"},
 {id:"pulse-campinas",name:"Pulse Campinas",client:"Rede Horizonte",address:"R. Conceição, 714",city:"Campinas",state:"SP",screens:8,status:"Operando"},
 {id:"sabor-brasa-centro",name:"Sabor & Brasa Centro",client:"Sabor & Brasa",address:"R. do Ouvidor, 91",city:"Rio de Janeiro",state:"RJ",screens:4,status:"Atenção"},
];
export const media: Media[] = [
 {id:"m1",name:"black-friday-praca-30s.mp4",type:"Vídeo",resolution:"3840 × 2160",size:"128 MB",duration:"00:30",client:"Grupo Aurora",status:"Pronto",color:"#172d2a"},
 {id:"m2",name:"menu-verao-vertical.webp",type:"Imagem",resolution:"1080 × 1920",size:"4,8 MB",duration:"—",client:"Sabor & Brasa",status:"Em uso",color:"#d97045"},
 {id:"m3",name:"institucional-horizonte.mp4",type:"Vídeo",resolution:"1920 × 1080",size:"84 MB",duration:"00:20",client:"Rede Horizonte",status:"Processando",color:"#405f8a"},
 {id:"m4",name:"colecao-essencial-01.jpg",type:"Imagem",resolution:"2160 × 3840",size:"8,1 MB",duration:"—",client:"Casa Nativa",status:"Pronto",color:"#b39172"},
];
