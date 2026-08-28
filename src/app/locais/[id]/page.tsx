import { DetailPage } from "@/components/entity-pages"; export default async function Page({params}:{params:Promise<{id:string}>}){return <DetailPage type="locais" id={(await params).id}/>}
