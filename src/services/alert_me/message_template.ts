export interface messagesTemplate { 
    Notificacao_Evento: string,
    Notificacao_Ingresso: string,
    Alerta_InformarVenda: string,
    Solicitar_feedback: string,
    Agradecimento: string,
}

type AtLeastOne<T> = {
    [K in keyof T]: Pick<T, K>
}[keyof T]

export type PartialMessagesTemplate = AtLeastOne<messagesTemplate>

export const template_messages = {
    Notificacao_Evento: `Olá, {nome}! Um evento novo foi criado e condiz com seu alerta de "{alerta}", acesse o link abaixo para visualizar! \n\n{link}`,
    Notificacao_Ingresso: `Olá, {nome}! Um ingresso novo foi anunciado para o evento "{evento}", acesse o link abaixo para visualizar! \n\n{link}`,
    Alerta_InformarVenda: `Olá, {nome}! O seu ingresso para o evento {evento} foi vendido? É extremamente importante para o nosso crescimento que você confirme a vinda na nossa plataforma! Acesse o link abaixo para informar \n\n{link}`,
    Solicitar_feedback: `Olá, {nome}! O que você está achando do nosso serviço e plataforma? Sua opinião é muito importante para nossa evolução! Acesse o link abaixo para dar o seu feedback \n\n{link}`,
    Agradecimento: `Olá, {nome}! Agradecemos por utilizar a nossa plataforma! Esperamos que você tenha uma experiência incrível!`,
}