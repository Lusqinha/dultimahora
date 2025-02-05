import { whatsappApi } from "@/lib/api";

const whatsappApi_instance = process.env.WHATSAPP_INSTANCE_NAME;

export async function validateWhatsapp(whatsapp: string): Promise<boolean> {
    const formattedPhone = `+55${whatsapp.replace(/\D/g, "")}`

    try {
        await whatsappApi.post(`/chat/whatsappNumbers/${whatsappApi_instance}`, {
            numbers: [formattedPhone]
        })
        return true
    } catch (error) {
        console.error("Erro validando whatsapp: ",error)
        return false
    }
}