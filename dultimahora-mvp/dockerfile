# Use a imagem base oficial do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e pnpm-lock.yaml para o diretório de trabalho
COPY package.json pnpm-lock.yaml ./

# Instale pnpm globalmente
RUN npm install -g pnpm

# Instale as dependências do projeto
RUN pnpm install

# Copie todo o código do projeto para o diretório de trabalho
COPY . .

# Defina a variável de ambiente para produção
ENV NODE_ENV=production
ENV DATABASE_URL="file:./dev.db"

# Execute o build do projeto
RUN pnpm run build

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["pnpm", "start"]