# Experian Challenge API

Esta API foi desenvolvida para realizar operações de Create, Read, Update e Delete (CRUD) em uma entidade de produtores rurais, utilizando uma arquitetura modular em camadas (Layered Modular Architecture). Com foco em escalabilidade e manutenibilidade, e separação de responsabilidades

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript

- **Express**: Framework web para Node.js

- **Prisma**: ORM para trabalhar com o banco de dados PostgreSQL

- **TypeScript**: Superset de JavaScript que adiciona tipagem estática, ajudando a detectar erros em tempo de desenvolvimento e tornando o código mais robusto e fácil de manter

- **Vitest**: Ferramenta de testes para realizar testes de ponta a ponta (e2e)

- **Docker**: Para conteinerização da aplicação e do ambiente de banco de dados

- **Zod**: Biblioteca para validação de dados com bom suporte a infêrencia de tipos estática

- **BiomeJS**: Ferramenta para lint e formatação de código

- **Pino**: Logger de alto desempenho para Node.js

## Estrutura de Pastas

A aplicação segue a estrutura modular e é separada em camadas:

- **/modules**: Contém os módulos da aplicação. Cada módulo tem suas próprias rotas, controladores, dtos, serviços, repositórios e etc
  - **/farmers**: Módulo de produtores rurais
- **/shared**: Contém funcionalidades e configurações compartilhadas entre os módulos
  - **/config**: Configurações gerais da aplicação
  - **/database**: Configurações e helpers relacionados ao banco de dados
  - **/helpers**: Funções e tipos auxiliares
  - **/middlewares**: Middlewares de aplicação

## Como rodar a aplicação

### Requisitos

- **Docker**: Certifique-se de que o Docker está instalado em sua máquina
- **pnpm**: Sistema de gerenciamento de pacotes (usado para instalar dependências localmente, se necessário)

### Variáveis de ambiente

Antes de iniciar a aplicação, configure as variáveis de ambiente. Um exemplo de arquivo `.env` está disponível como `.env.example`. As variáveis principais incluem:

- `DATABASE_URL`: URL de conexão com o banco de dados PostgreSQL
- `PORT`: Porta onde a API será exposta.

> [!INFO]  
> Na variável de ambiente `DATABASE_URL`, você pode alterar a senha do usuário e nome do banco de dados, mas é importante que o nome do usuário, o host e o permaneçam os mesmos

### Passos para rodar a aplicação com Docker

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/experian-challenge-api.git

   cd experian-challenge-api
    ```

2. Configure as variáveis de ambiente
    ```bash
    cp .env.example .env
    ```

3. Inicie a aplicação
    ```
    make dev
    ```

> [!WARNING]  
> O comando `make dev` no Windows pode não funcionar diretamente, neste caso, utilize o comando equivalente definido no `Makefile`:
    ```
    docker compose up api
    ```

# Rodando os testes end-to-end

Os testes e2e são executados utilizando o Vitest como ferramenta de testes, e rodam dentro de um container docker, para rodar os testes execute o seguinte comando:

Execute o comando para subir o ambiente de teste:

```bash
make test-e2e
```

> [!WARNING]  
> O comando `make test-e2e` no Windows pode não funcionar diretamente, neste caso, utilize o comando equivalente definido no `Makefile`:
    ```
    docker compose up api-test
    ```

# Arquitetura da Aplicação

- **Controllers**: Responsável por lidar com as requisições HTTP e invocar os serviços apropriados

- **DTOs**: Objetos de transferência de dados, utilizados para validar dados e definir contratos entre controller e service

- **Services**: Contém as regras de negócio da aplicação, responsável por atender às requisições feitas pelos controllers

- **Repositories**: Camada de persistência dos dados, responsável por interagir com o banco de dados


