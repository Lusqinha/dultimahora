import { whatsappApi } from "@/lib/api";

const whatsappApi_instance = process.env.WHATSAPP_INSTANCE_NAME;

export async function validateWhatsapp(whatsapp: string): Promise<boolean> {
    const formattedPhone = `+55${whatsapp.replace(/\D/g, "")}`

    try {
        await whatsappApi.post(`/chat/whatsappNumbers/${whatsappApi_instance}`, {
            contato_whatsapp: formattedPhone
        })
        return true
    } catch (error) {
        return false
    }
}