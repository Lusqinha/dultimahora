import { whatsappApi } from "@/lib/api";
import { validateNumber } from "@/lib/utils";

const whatsappApi_instance = process.env.WHATSAPP_INSTANCE_NAME;

export async function sendWhatsappMessage(phoneNumber: string, message: string) {
  console.log("Sending message to", phoneNumber);
  if (!validateNumber(phoneNumber)) {
    throw new Error("Número de telefone inválido");
  }

  try {
    const response = await whatsappApi.post(`/message/sendText/${whatsappApi_instance}`, {
      number: phoneNumber,
      text: message,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao enviar mensagem");
  }
}

