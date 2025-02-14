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
    Notificacao_Evento: `🎉 Olá, {nome}! Um novo evento foi criado e combina com seu alerta de "{alerta}"! 🎭🎶  
    Não perca essa oportunidade! Acesse o link abaixo para conferir os detalhes:  
    🔗 {link}`,

    Notificacao_Ingresso: `🎟️ Olá, {nome}! Um novo ingresso foi anunciado para o evento "{evento}"! 🎊  
    Garanta já o seu antes que acabe! Acesse aqui para conferir:  
    🔗 {link}`,

    Alerta_InformarVenda: `💬 Olá, {nome}! Você já vendeu seu ingresso para o evento "{evento}"?  
    📢 É super importante para o nosso crescimento que você confirme sua participação na nossa plataforma!  
    Clique no link abaixo e nos avise rapidinho:  
    🔗 {link}`,

    Solicitar_feedback: `📢 Ei, {nome}! Queremos saber sua opinião! 🤔💡  
    O que você está achando da nossa plataforma? Sua opinião faz toda a diferença para melhorarmos cada vez mais! 🚀  
    Deixe seu feedback no link abaixo:  
    💬 🔗 {link}`,

    Agradecimento: `💖 Olá, {nome}! Muito obrigado por utilizar a nossa plataforma! 🙌  
    Esperamos que sua experiência tenha sido incrível! ✨  
    Conte sempre com a gente! 🚀🎉`,
}
