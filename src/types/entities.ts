export type Status = "Online"|"Offline"|"Atenção"|"Ativa"|"Agendada"|"Rascunho"|"Finalizada"|"Sincronizando";
export interface Screen { id:string; name:string; code:string; location:string; group:string; status:string; content:string; sync:string; resolution:string; orientation:string }
export interface Campaign { id:string; name:string; client:string; status:string; start:string; end:string; screens:number; progress:number }
export interface Client { id:string; name:string; company:string; email:string; phone:string; status:string; campaigns:number; screens:number; since:string }
export interface Media { id:string; name:string; type:"Vídeo"|"Imagem"; resolution:string; size:string; duration:string; client:string; status:string; color:string }
export interface Location { id:string; name:string; client:string; address:string; city:string; state:string; screens:number; status:string }
