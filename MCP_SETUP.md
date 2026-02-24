# MCPs: shadcn, lucide-icons, page-design-guide

## Projeto

- **lucide-react**: já instalado. Use `import { IconName } from 'lucide-react'` nos componentes.
- **shadcn/ui**: inicializado (Tailwind v4 + `components.json`). Adicione componentes com:
  ```bash
  npx shadcn@latest add button
  npx shadcn@latest add card
  ```
- **page-design-guide**: servidor MCP para orientação de design (cores, tipografia, layout).

## Conexão dos MCPs no Cursor

Foi criado o arquivo **`.cursor/mcp.json`** neste repositório com:

- **shadcn**: URL `https://www.shadcn.io/api/mcp` — acesso ao registro de componentes shadcn/ui.
- **page-design-guide**: comando `npx -y page-design-guide-mcp` — guia de design para a IA.

Se o Cursor usar apenas o MCP global, copie o conteúdo de `.cursor/mcp.json` para `~/.cursor/mcp.json` (ou **File > Preferences > Cursor Settings > MCP** e adicione os servidores manualmente).

Após conectar, você pode pedir à IA para usar componentes shadcn, ícones Lucide e seguir o page-design-guide nas respostas.
