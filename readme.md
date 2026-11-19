# SnapTech

Galeria com Next.js e uma API Spring Boot para armazenar e pesquisar imagens.

## Executar

Requisitos: Node.js, JDK 25 e Docker Desktop com o mecanismo iniciado.

1. Na pasta `BackEnd`, execute `docker compose up -d db` e `./mvnw.cmd spring-boot:run`.
2. Em outro terminal, na pasta `Frontend`, execute `npm ci` e `npm run dev`.
3. Acesse http://localhost:3000. A página inicial leva à galeria.

A API fica em http://localhost:8080/v1/images. O banco usa `postgres` como usuário e senha, conforme o Compose. Se o banco local usar outra senha, defina `DB_PASSWORD` antes de iniciar a API. O diretório de dados depende do volume configurado no Compose; os dados existentes não foram movidos nem apagados.

Para outra URL da API, defina `NEXT_PUBLIC_API_URL` no frontend antes de iniciar ou compilar.

## Roteiros 14 e 15

- Pesquisa por trecho do nome ou tags, combinada com PNG, JPEG ou GIF; todos os formatos com filtro vazio.
- Cards com extensão, tamanho em KB/MB/GB e data brasileira.
- Download ao clicar na imagem, preservando o nome e a extensão em minúsculas. A miniatura continua disponível para exibição inline.
- Indicador de carregamento, animação, estado sem resultados e tratamento de falha.
- `RenderIf` e `Template` com `loading` opcional e padrão `false`.
- Navegação entre galeria e formulário. O formulário inclui envio de imagem e validação de formato e limite de 30 MB.
- Compatibilidade do filtro JPEG com os registros antigos armazenados como JPG.

O frontend usa Webpack nos scripts porque o Turbopack apresentou falha interna de processo neste ambiente Windows.

## Validação

No frontend: `npm run lint` e `npm run build`.

No backend: `./mvnw.cmd test`. Os testes usam H2 em memória e não acessam o PostgreSQL local. Cobrem upload, filtros combinados, busca por tag, data brasileira, conteúdo e cabeçalhos do download, CORS, formato inválido e imagem inexistente.
