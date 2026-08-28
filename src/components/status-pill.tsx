import { cn } from "@/lib/utils";
export function StatusPill({value}:{value:string}) { const good=["Online","Ativa","Ativo","Operando","Pronto","Em uso"].includes(value); const warn=["Atenção","Agendada","Sincronizando","Processando","Em revisão"].includes(value); return <span className={cn("status",good&&"status-good",warn&&"status-warn",!good&&!warn&&"status-bad")}><i />{value}</span> }
