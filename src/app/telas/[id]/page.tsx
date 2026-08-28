import { DetailPage } from "@/components/entity-pages"; export default async function Page({params}:{params:Promise<{id:string}>}){return <DetailPage type="telas" id={(await params).id}/>}
