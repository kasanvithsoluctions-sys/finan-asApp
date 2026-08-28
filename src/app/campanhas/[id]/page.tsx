import { DetailPage } from "@/components/entity-pages"; export default async function Page({params}:{params:Promise<{id:string}>}){return <DetailPage type="campanhas" id={(await params).id}/>}
