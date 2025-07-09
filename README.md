# Ilumeo Project Backend

Este é o backend do projeto **Ilumeo**, uma aplicação Node.js com TypeScript que utiliza o **Express** para criar uma API RESTful e o **TypeORM** para gerenciamento de banco de dados PostgreSQL. O backend gerencia entradas de tempo (`TimeEntry`) associadas a códigos de usuário, permitindo registrar entradas e saídas, além de consultar históricos.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor (v18 ou superior).
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Express**: Framework para construção de APIs RESTful.
- **TypeORM**: ORM para gerenciamento de banco de dados (PostgreSQL).
- **Jest**: Framework para testes unitários e de integração.
- **Supertest**: Biblioteca para testar requisições HTTP.
- **ESLint e Prettier**: Ferramentas para linting e formatação de código.
- **dotenv**: Gerenciamento de variáveis de ambiente.

## Pré-requisitos

- **Node.js**: v18 ou superior
- **npm**: v9 ou superior
- **PostgreSQL**: v13 ou superior
- **Docker**: Opcional, para rodar o banco de dados em um contêiner

## Configuração do Ambiente

### 1. Clone o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd ilumeo-project/backend
```

### 2. Instale as Dependências

Instale as dependências listadas no `package.json`:

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do diretório `backend` com base no `.env-example`:

```bash
cp .env-example .env
```

Edite o arquivo `.env` com as credenciais do seu banco de dados e outras configurações. Um exemplo do `.env-example` está disponível abaixo.

### 4. Configure o Banco de Dados

O projeto usa **PostgreSQL** como banco de dados. Certifique-se de que o PostgreSQL está instalado e rodando, ou inicie um contêiner Docker:

```bash
docker run --name ilumeo-postgres -e POSTGRES_USER=ilumeo_user -e POSTGRES_PASSWORD=ilumeo_password -e POSTGRES_DB=ilumeo_db -p 5432:5432 -d postgres
```

Atualize o arquivo `.env` com as configurações do banco de dados:

```plaintext
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=ilumeo_user
DB_PASSWORD=ilumeo_password
DB_DATABASE=ilumeo_db
APP_PORT=3001
```

### 5. Execute as Migrations

Para criar a tabela `time_entry` no banco de dados, compile o projeto e execute as migrations do TypeORM:

```bash
npm run build
npx typeorm migration:run -d dist/config/database.js
```

Isso executará a migration definida em `src/migration/1751913238384-CreateTimeEntry.ts`, criando a tabela `time_entry` com as colunas `id`, `code`, `startTime`, `endTime`, e `type`.

Para reverter a migration (se necessário):

```bash
npx typeorm migration:revert -d dist/config/database.js
```

### 6. Inicie o Servidor

Para iniciar o servidor em modo de desenvolvimento com recarregamento automático:

```bash
npm run dev
```

Para rodar em produção, compile o projeto e inicie:

```bash
npm run build
npm start
```

O servidor estará disponível em `http://localhost:3001` (ou a porta definida em `APP_PORT`).

### 7. Execute os Testes

Os testes unitários e de integração estão configurados com **Jest**. Para executar todos os testes:

```bash
npm test
```

Para executar os testes com cobertura:

```bash
npm run test:coverage
```

Para rodar os testes em modo de observação (watch):

```bash
npm run test:watch
```

Os testes estão localizados em `src/**/*.spec.ts` e cobrem o `TimeEntryController` e suas interações com o `TimeEntryService`. Os testes utilizam mocks para evitar dependências do banco de dados.

### Estrutura do Projeto

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts                     # Configuração do TypeORM
│   ├── controller/
│   │   └── TimeEntryController.ts          # Controladores da API
│   ├── entity/
│   │   └── TimeEntry.ts                    # Entidade do TypeORM
│   ├── migration/
│   │   └── 1751913238384-CreateTimeEntry.ts  # Migration do TypeORM
│   ├── repository/
│   │   └── TimeEntryRepository.ts          # Repositório para operações no banco
│   ├── routes/
│   │   └── index.ts                        # Definição das rotas da API
│   ├── service/
│   │   └── TimeEntryService.ts             # Lógica de negócio
│   ├── index.ts                            # Ponto de entrada da aplicação
│   └── ormconfig.ts                        # Configuração adicional do TypeORM
├── jest.config.ts                          # Configuração do Jest
├── package.json                            # Dependências e scripts
├── tsconfig.json                           # Configuração do TypeScript
├── .env-example                            # Exemplo de variáveis de ambiente
└── .env                                    # Variáveis de ambiente (não versionado)
```

### Endpoints da API

- **POST /api/time-entry**
  - **Descrição**: Cria uma nova entrada de tempo.
  - **Corpo da Requisição**:
    ```json
    {
      "code": "USER123",
      "type": "entry"
    }
    ```
  - **Resposta**: `201 Created` com a entrada criada.
  - **Exemplo de Resposta**:
    ```json
    {
      "id": 1,
      "code": "USER123",
      "startTime": "2025-07-08T12:00:00.000Z",
      "type": "entry"
    }
    ```

- **GET /api/time-entry?code=USER123**
  - **Descrição**: Busca todas as entradas de tempo para um código.
  - **Parâmetros de Query**: `code` (string, obrigatório)
  - **Resposta**: `200 OK` com uma lista de entradas.
  - **Exemplo de Resposta**:
    ```json
    [
      {
        "id": 1,
        "code": "USER123",
        "startTime": "2025-07-08T12:00:00.000Z",
        "type": "entry"
      },
      {
        "id": 2,
        "code": "USER123",
        "startTime": "2025-07-08T14:00:00.000Z",
        "type": "exit"
      }
    ]
    ```

### Linting e Formatação

Para verificar o código com ESLint:

```bash
npm run lint
```

Para corrigir problemas automaticamente:

```bash
npm run lint:fix
```

O **Prettier** está configurado para garantir formatação consistente do código.

### Notas

- **Banco de Dados**: Certifique-se de que o PostgreSQL está rodando antes de executar migrations ou iniciar o servidor. Use as credenciais corretas no `.env`.
- **Testes**: Os testes utilizam mocks para o `TimeEntryService`, eliminando a necessidade de um banco de dados real durante a execução.
- **Produção**: Para ambiente de produção, considere usar um gerenciador de processos como **PM2** e configure o banco de dados com segurança (por exemplo, usando SSL).
- **Permissões**: Se necessário, use `sudo` para criar o arquivo `.env` em diretórios com restrições de permissão, mas ajuste as permissões com `chown` e `chmod` após a criação.

### Exemplo de `.env-example`

Crie um arquivo `.env-example` na raiz do diretório `backend` com o seguinte conteúdo:

```plaintext
# Configurações do Banco de Dados (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=ilumeo_user
DB_PASSWORD=ilumeo_password
DB_DATABASE=ilumeo_db

# Porta da Aplicação
APP_PORT=3001
```

Para criar o `.env` a partir do `.env-example`:

```bash
cp .env-example .env
```

Edite o `.env` com as credenciais reais do seu banco de dados. Se precisar de permissões elevadas:

```bash
sudo cp .env-example .env
sudo nano .env
sudo chown $USER:$USER .env
sudo chmod 600 .env
```
