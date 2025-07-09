Ilumeo Project Backend
Este é o backend do projeto Ilumeo, uma aplicação Node.js com TypeScript que utiliza Express para criar uma API RESTful e TypeORM para gerenciamento de banco de dados. O backend é responsável por gerenciar entradas de tempo (TimeEntry) associadas a códigos de usuário, permitindo registrar entradas e saídas, além de consultar históricos.
Tecnologias Utilizadas

Node.js: Ambiente de execução para JavaScript no servidor.
TypeScript: Superset do JavaScript com tipagem estática.
Express: Framework para construção de APIs RESTful.
TypeORM: ORM para gerenciamento de banco de dados (PostgreSQL).
Jest: Framework de testes para testes unitários e de integração.
Supertest: Biblioteca para testar requisições HTTP.
ESLint e Prettier: Ferramentas para linting e formatação de código.
dotenv: Gerenciamento de variáveis de ambiente.

Pré-requisitos

Node.js (v18 ou superior)
npm (v9 ou superior)
PostgreSQL (v13 ou superior)
Docker (opcional, para rodar o banco de dados em um contêiner)

Configuração do Ambiente
1. Clone o Repositório
git clone <URL_DO_REPOSITORIO>
cd ilumeo-project/backend

2. Instale as Dependências
Instale as dependências listadas no package.json:
npm install

3. Configure as Variáveis de Ambiente
Crie um arquivo .env na raiz do diretório backend com base no .env-example:
cp .env-example .env

Edite o arquivo .env com as configurações do seu ambiente. Um exemplo do conteúdo do .env está descrito abaixo.
4. Configure o Banco de Dados
O projeto usa PostgreSQL como banco de dados. Certifique-se de que o PostgreSQL está instalado e rodando, ou use Docker para iniciar um contêiner:
docker run --name ilumeo-postgres -e POSTGRES_USER=ilumeo_user -e POSTGRES_PASSWORD=ilumeo_password -e POSTGRES_DB=ilumeo_db -p 5432:5432 -d postgres

Atualize o arquivo .env com as credenciais do banco de dados:
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=ilumeo_user
DB_PASSWORD=ilumeo_password
DB_DATABASE=ilumeo_db
APP_PORT=3001

5. Execute as Migrations
Para criar a tabela time_entry no banco de dados, execute as migrations do TypeORM:
npm run build
npx typeorm migration:run -d dist/config/database.js

Isso executará a migration definida em src/migration/1751913238384-CreateTimeEntry.ts, criando a tabela time_entry com as colunas id, code, startTime, endTime, e type.
Para reverter a migration (se necessário):
npx typeorm migration:revert -d dist/config/database.js

6. Inicie o Servidor
Para iniciar o servidor em modo de desenvolvimento com recarregamento automático:
npm run dev

Para rodar em produção, primeiro compile o projeto e depois inicie:
npm run build
npm start

O servidor estará disponível em http://localhost:3001 (ou a porta definida em APP_PORT).
7. Execute os Testes
Os testes unitários e de integração estão configurados com Jest. Para executar todos os testes:
npm test

Para executar os testes com cobertura:
npm run test:coverage

Para rodar os testes em modo de observação (watch):
npm run test:watch

Os testes estão localizados em src/**/*.spec.ts e cobrem o TimeEntryController e suas interações com o TimeEntryService.
Estrutura do Projeto
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuração do TypeORM
│   ├── controller/
│   │   └── TimeEntryController.ts  # Controladores da API
│   ├── entity/
│   │   └── TimeEntry.ts         # Entidade do TypeORM
│   ├── migration/
│   │   └── 1751913238384-CreateTimeEntry.ts  # Migration do TypeORM
│   ├── repository/
│   │   └── TimeEntryRepository.ts  # Repositório para operações no banco
│   ├── routes/
│   │   └── index.ts             # Definição das rotas da API
│   ├── service/
│   │   └── TimeEntryService.ts   # Lógica de negócio
│   ├── index.ts                  # Ponto de entrada da aplicação
│   └── ormconfig.ts              # Configuração adicional do TypeORM
├── jest.config.ts                # Configuração do Jest
├── package.json                  # Dependências e scripts
├── tsconfig.json                 # Configuração do TypeScript
└── .env-example                  # Exemplo de variáveis de ambiente

Endpoints da API

POST /api/time-entry: Cria uma nova entrada de tempo.
Corpo: { "code": "USER123", "type": "entry" | "exit" }
Resposta: 201 Created com a entrada criada.


GET /api/time-entry?code=USER123: Busca todas as entradas de tempo para um código.
Resposta: 200 OK com uma lista de entradas.



Linting e Formatação
Para verificar o código com ESLint:
npm run lint

Para corrigir problemas automaticamente:
npm run lint:fix

O Prettier está configurado para garantir a formatação consistente do código.
Notas

Certifique-se de que o PostgreSQL está rodando antes de executar as migrations ou iniciar o servidor.
Os testes usam mocks para o TimeEntryService, eliminando a necessidade de um banco de dados real durante os testes.
Para ambiente de produção, considere usar um gerenciador de processos como PM2 e configure o banco de dados adequadamente.
