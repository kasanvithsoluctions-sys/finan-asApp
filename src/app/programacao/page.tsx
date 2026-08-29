"use client";

import { AlertTriangle, Check, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button, Modal, PageHead } from "@/components/ui";
import { campaigns, screens } from "@/data/mock";
import { FieldErrors, getFieldErrors, scheduleSchema } from "@/lib/validation";

const hours=["08:00","10:00","12:00","14:00","16:00","18:00","20:00"];
type View="day"|"week"|"month";
type ScheduleItem={id:string;campaign:string;screen:string;start:string;end:string};

function dateInput(date:Date){const year=date.getFullYear();const month=String(date.getMonth()+1).padStart(2,"0");const day=String(date.getDate()).padStart(2,"0");return `${year}-${month}-${day}`}
function addDays(date:Date,days:number){const next=new Date(date);next.setDate(next.getDate()+days);return next}
function labelFor(date:Date,view:View){const format=new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"long",year:"numeric"});if(view==="day")return format.format(date);if(view==="month")return new Intl.DateTimeFormat("pt-BR",{month:"long",year:"numeric"}).format(date);const day=date.getDay();const monday=addDays(date,day===0?-6:1-day);return `${new Intl.DateTimeFormat("pt-BR",{day:"2-digit"}).format(monday)} — ${format.format(addDays(monday,6))}`}

export default function Page(){
  const [view,setView]=useState<View>("week");
  const [date,setDate]=useState(()=>new Date());
  const [items,setItems]=useState<ScheduleItem[]>([]);
  const [selectedScreen,setSelectedScreen]=useState("");
  function navigate(direction:number){setDate((current)=>{const next=new Date(current);if(view==="month")next.setMonth(next.getMonth()+direction);else next.setDate(next.getDate()+direction*(view==="week"?7:1));return next})}
  const visibleScreens=selectedScreen?screens.filter((screen)=>screen.id===selectedScreen):screens;
  return <><PageHead eyebrow="GRADE DE CONTEÚDO" title="Programação" description="Visualize campanhas, intervalos e conflitos em toda a rede." action={<Modal title="Nova programação" trigger={<Button><Plus size={15}/> Nova programação</Button>}><ScheduleForm onCreate={(item)=>setItems((current)=>[...current,item])}/></Modal>}/><div className="schedule-tools"><div className="seg" role="tablist" aria-label="Período da programação">{([['day','Hoje'],['week','Semana'],['month','Mês']] as [View,string][]).map(([value,label])=><button type="button" role="tab" aria-selected={view===value} className={view===value?"active":""} onClick={()=>{setView(value);if(value==="day")setDate(new Date())}} key={value}>{label}</button>)}</div><div className="date-nav"><button type="button" onClick={()=>navigate(-1)} aria-label="Período anterior"><ChevronLeft/></button><b>{labelFor(date,view)}</b><button type="button" onClick={()=>navigate(1)} aria-label="Próximo período"><ChevronRight/></button></div><select className="schedule-filter" value={selectedScreen} onChange={(event)=>setSelectedScreen(event.target.value)} aria-label="Filtrar por tela"><option value="">Todas as telas</option>{screens.map((screen)=><option value={screen.id} key={screen.id}>{screen.name}</option>)}</select></div><div className="schedule"><div className="schedule-times"><b>TELA</b>{hours.map(h=><span key={h}>{h}</span>)}</div>{visibleScreens.map((screen,i)=><div className="schedule-row" key={screen.id}><header><b>{screen.name}</b><span>{screen.status==="Offline"?"Offline · local ativo":screen.status}</span></header><div className="track">{hours.map(h=><i key={h}/>)}<article className={`slot s${i}`}><b>{i%2?"Black Friday — Vale Sul":"Institucional Agosto"}</b><span>{i%2?"09:30 — 16:00":"08:00 — 13:30"}</span></article>{items.filter((item)=>item.screen===screen.id).map((item)=><article className="slot new-slot" key={item.id}><b>{campaigns.find((campaign)=>campaign.id===item.campaign)?.name}</b><span>{item.start.slice(11)} — {item.end.slice(11)}</span></article>)}{screen.id==="totem-academia"&&<article className="slot conflict"><AlertTriangle/><b>Conflito</b><span>12:00 — 14:00</span></article>}</div></div>)}</div><div className="legend"><span><i className="active"/>Campanha ativa</span><span><i className="planned"/>Agendada</span><span><i className="conf"/>Conflito</span></div></>
}

function ScheduleForm({onCreate}:{onCreate:(item:ScheduleItem)=>void}){
  const [errors,setErrors]=useState<FieldErrors>({});
  const [saved,setSaved]=useState(false);
  function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();const data=Object.fromEntries(new FormData(event.currentTarget));const result=scheduleSchema.safeParse(data);if(!result.success){setSaved(false);setErrors(getFieldErrors(result.error));return}setErrors({});onCreate({id:`schedule-${Date.now()}`,...result.data});setSaved(true);event.currentTarget.reset()}
  return <form className="modal-body" onSubmit={submit} noValidate><div className="field-grid"><label className="field">Campanha<select name="campaign" defaultValue="" required aria-invalid={!!errors.campaign}><option value="" disabled>Selecione uma campanha</option>{campaigns.map((campaign)=><option value={campaign.id} key={campaign.id}>{campaign.name}</option>)}</select>{errors.campaign&&<small className="field-error" role="alert">{errors.campaign}</small>}</label><label className="field">Tela<select name="screen" defaultValue="" required aria-invalid={!!errors.screen}><option value="" disabled>Selecione uma tela</option>{screens.map((screen)=><option value={screen.id} key={screen.id}>{screen.name}</option>)}</select>{errors.screen&&<small className="field-error" role="alert">{errors.screen}</small>}</label><label className="field">Início<input name="start" type="datetime-local" min={`${dateInput(new Date())}T00:00`} required aria-invalid={!!errors.start}/>{errors.start&&<small className="field-error" role="alert">{errors.start}</small>}</label><label className="field">Fim<input name="end" type="datetime-local" min={`${dateInput(new Date())}T00:00`} required aria-invalid={!!errors.end}/>{errors.end&&<small className="field-error" role="alert">{errors.end}</small>}</label></div>{saved&&<p className="form-success" role="status"><Check size={14}/> Programação adicionada à grade.</p>}<div className="modal-actions"><Button type="submit">Criar programação</Button></div></form>
}
