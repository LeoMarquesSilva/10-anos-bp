/** Imagens de aplicações visuais do selo (em public/) */

export type AplicacaoItem = {
  id: string
  title: string
  src: string
}

/** Nomes dos arquivos em public/ conforme solicitado pelo usuário */
const IMAGES = [
  { id: 'instagram', title: 'Foto de perfil Instagram', src: 'APLICAÇÃO-FOTO-PERFIL-INSTAGRAM.jpg' },
  { id: 'propostas', title: 'Propostas e pastas', src: 'APLICAÇÃO-PROPOSTAS-PASTAS.jpg' },
  { id: 'ppts', title: 'DUE e Apresentações', src: 'APLICAÇÕES-PPTS.jpg' },
  { id: 'selo', title: 'O Selo', src: 'APRESENTACAO-SELO.jpg' },
  { id: 'email', title: 'Assinatura de e-mail', src: 'ASSINATURA-EMAIL.jpg' },
  { id: 'cadernos', title: 'Cadernos', src: 'CADERNOS.jpg' },
  { id: 'canecas', title: 'Canecas', src: 'CANECAS.jpg' },
  { id: 'capa', title: 'Capa com selo e fundo degradê', src: 'CAPA COM SELO E FUNDO DEGRADE.jpg' },
  { id: 'ebooks', title: 'Capas E-books', src: 'CAPAS-EBOOKS.jpg' },
  { id: 'elementos', title: 'Elementos do selo 10 anos', src: 'EXPLICAÇÃO-ELEMENTOS-SELO10ANOS.jpg' },
  { id: 'flamulas', title: 'Flâmulas', src: 'FLAMULAS.jpg' },
  { id: 'garrafas', title: 'Garrafas', src: 'GARRAFAS.jpg' },
]

export const aplicacoesVisuais: AplicacaoItem[] = IMAGES.map((item) => ({
  ...item,
  src: '/' + encodeURIComponent(item.src),
}))

/** Para fallback quando o arquivo tem nome com espaço no disco */
export function getImageSrc(filename: string): string {
  return '/' + encodeURIComponent(filename)
}
