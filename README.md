# IB Logística - Sistema de Tratativas

Sistema de gerenciamento de tratativas para a IB Logística, desenvolvido com Vue 3 e TypeScript.

## Requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior

## Configuração do Projeto

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd frontend_tratativas
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações locais.

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run preview` - Visualiza a versão de produção localmente
- `npm run type-check` - Verifica os tipos TypeScript
- `npm run lint` - Executa o linter e corrige problemas
- `npm run format` - Formata o código com Prettier

## Estrutura do Projeto

```
src/
  ├── assets/        # Arquivos estáticos (CSS, imagens)
  ├── components/    # Componentes Vue reutilizáveis
  ├── router/        # Configuração das rotas
  ├── services/      # Serviços e integrações com API
  ├── types/         # Definições de tipos TypeScript
  └── views/         # Componentes de página
```

## Convenções de Código

- Use TypeScript para todo novo código
- Siga o estilo de código definido pelo ESLint e Prettier
- Componentes devem usar a Composition API com `<script setup>`
- Nomeie componentes usando PascalCase
- Use kebab-case para arquivos e diretórios

## Desenvolvimento

O projeto usa Vite como bundler e servidor de desenvolvimento. O servidor iniciará em `http://localhost:3000` por padrão.

### Hot Module Replacement

O HMR está habilitado por padrão. As alterações no código serão refletidas instantaneamente no navegador.

### Debugging

Use o Vue DevTools para depuração. O plugin está configurado e disponível em desenvolvimento.

## Build e Deploy

Para fazer o build do projeto:

```bash
npm run build
```

Os arquivos compilados estarão na pasta `dist/`.

## Licença

Este projeto é privado e de propriedade da IB Logística.
