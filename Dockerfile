# Etapa 1: Build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Transpila o código TypeScript para JS
RUN npm run build

# Etapa 2: Execução
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

# Define porta de execução
ENV PORT=10000
EXPOSE $PORT

# Executa o app já transpilado
CMD ["npm", "run", "start"]
