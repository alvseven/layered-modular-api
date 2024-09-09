# Experian Challenge API

Esta API foi desenvolvida para realizar operações de Create, Read, Update e Delete (CRUD) em uma entidade de produtores rurais, utilizando uma arquitetura modular em camadas (Layered Modular Architecture). Com foco em escalabilidade e manutenibilidade

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript

- **Express**: Framework web para Node.js

- **Postgres**: Banco de dados relacional

- **Prisma**: ORM para trabalhar com o banco de dados PostgreSQL

- **TypeScript**: Superset de JavaScript que adiciona tipagem estática, ajudando a detectar erros em tempo de desenvolvimento e tornando o código mais robusto e fácil de manter

- **Vitest**: Ferramenta de testes para realizar testes de ponta a ponta (e2e)

- **Docker**: Para conteinerização da aplicação e do ambiente de banco de dados

- **Zod**: Biblioteca para validação de dados com bom suporte a infêrencia de tipos estática

- **BiomeJS**: Ferramenta para lint e formatação de código

- **Pino**: Logger de alto desempenho para Node.js

## Estrutura de Pastas

A aplicação segue a estrutura modular e é separada em camadas:

- **/modules**: contém os módulos da aplicação, cada módulo tem suas próprias rotas, controladores, dtos, serviços, repositórios e etc

  - **/farmers**: módulo de produtores rurais

- **/shared**: contém funcionalidades e configurações compartilhadas entre os módulos

  - **/config**: configurações gerais da aplicação

  - **/database**: configurações e helpers relacionados ao banco de dados

  - **/helpers**: funções e tipos auxiliares

  - **/middlewares**: middlewares de aplicação

## Como rodar a aplicação

### Requisitos

- **Docker**: Certifique-se de que o Docker está instalado em sua máquina

- **pnpm**: Sistema de gerenciamento de pacotes (usado para instalar dependências localmente, se necessário)

#### Variáveis de ambiente

Antes de iniciar a aplicação, configure as variáveis de ambiente. Um exemplo de arquivo `.env` está disponível como `.env.example`. As variáveis principais incluem:

- `DATABASE_URL`: URL de conexão com o banco de dados PostgreSQL
- `PORT`: Porta onde a API será exposta.

> [!IMPORTANT]  
> Na variável de ambiente `DATABASE_URL`, você pode alterar a senha do usuário e nome do banco de dados, mas é importante que o nome do usuário permaneça o mesmo que o definido em `.env.example`(usuário padrão do postgres), a porta deve ser a porta padrão do container postgres(5432), e o host deve ter o mesmo nome definido no serviço do `docker-compose.yml`(postgres)

#### Passos para rodar a aplicação com Docker

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario experian-challenge-api.git

cd experian-challenge-api
```

2. Crie um arquivo ```.env```, utilizando o arquivo ```.env.example``` como exemplo:

```bash
cp .env.example .env
```

3. Inicie a aplicação:

```bash
pnpm dev
```

#### Rodando o seed

Para popular o banco de dados com dados (criando 10 produtores rurais), com a sua aplicação rodando, abra um novo terminal e execute o comando:

```bash
pnpm seed
```

#### Rodando os testes end-to-end

Os testes e2e são executados utilizando o Vitest como ferramenta de testes, e rodam dentro de um container docker, para rodar os testes execute o seguinte comando:

```bash
pnpm test:e2e
```

### CI/CD

A aplicação conta com uma pipeline de CI configurada para garantir a qualidade do código e a integridade da aplicação, a pipeline realiza as seguintes etapas:

- **Linting**: Verifica a conformidade do código com as regras de estilo e padrões definidos
- **Testes End-to-End**: Executa testes completos da aplicação para garantir que todas as funcionalidades estejam funcionando como esperado

A pipeline é acionada automaticamente a partir de pull requests direcionados para a branch `main`, garantindo que o código seja revisado e validado antes de ser mesclado

**Observação**: A aplicação conta com CI, mas considerações futuras incluem a implementação de CD para deploy automático na AWS

### Deploy

O deploy da aplicação foi realizado em uma instância EC2 na AWS, a aplicação está disponível publicamente na [URL](http://34.230.11.112:3333).

**Observação**: A aplicação está acessível via HTTP, considerações futuras incluem a configuração de HTTPS para maior segurança

#### Arquitetura da Aplicação

- **Controllers**: Responsável por lidar com as requisições HTTP e invocar os serviços apropriados

- **DTOs**: Objetos de transferência de dados, utilizados para validar dados e definir contratos entre controller e service

- **Services**: Contém as regras de negócio da aplicação, responsável por atender às requisições feitas pelos controllers

- **Repositories**: Camada de persistência dos dados, responsável por interagir com o banco de dados
