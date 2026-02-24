/** Imagens de aplicações visuais do selo (em public/)
 *
 * Para ajustar a ordem das imagens no carrossel, altere o número "order" de cada item.
 * O carrossel exibe na ordem crescente (1, 2, 3...). Ex.: para colocar "O Selo" primeiro, use order: 1.
 */

export type AplicacaoItem = {
  id: string
  title: string
  src: string
  order: number
}

/** Lista de imagens. Altere "order" para definir a ordem de exibição (menor = primeiro). */
const IMAGES: { id: string; title: string; src: string; order: number }[] = [
  { id: 'instagram', title: 'Foto de perfil Instagram', src: 'APLICAÇÃO-FOTO-PERFIL-INSTAGRAM.jpg', order: 3 },
  { id: 'propostas', title: 'Propostas e pastas', src: 'APLICAÇÃO-PROPOSTAS-PASTAS.jpg', order: 2 },
  { id: 'ppts', title: 'DUE e Apresentações', src: 'APLICAÇÕES-PPTS.jpg', order: 3 },
  { id: 'selo', title: 'O Selo', src: 'APRESENTACAO-SELO.jpg', order: 4 },
  { id: 'email', title: 'Assinatura de e-mail', src: 'ASSINATURA-EMAIL.jpg', order: 2 },
  { id: 'cadernos', title: 'Cadernos', src: 'CADERNOS.jpg', order: 6 },
  { id: 'canecas', title: 'Canecas', src: 'CANECAS.jpg', order: 7 },
  { id: 'capa', title: 'Capa com selo e fundo degradê', src: 'CAPA COM SELO E FUNDO DEGRADE.jpg', order: 1 },
  { id: 'ebooks', title: 'Capas E-books', src: 'CAPAS-EBOOKS.jpg', order: 9 },
  { id: 'elementos', title: 'Elementos do selo 10 anos', src: 'EXPLICAÇÃO-ELEMENTOS-SELO10ANOS.jpg', order: 10 },
  { id: 'flamulas', title: 'Flâmulas', src: 'FLAMULAS.jpg', order: 11 },
  { id: 'garrafas', title: 'Garrafas', src: 'GARRAFAS.jpg', order: 12 },
]

export const aplicacoesVisuais: AplicacaoItem[] = IMAGES.slice()
  .sort((a, b) => a.order - b.order)
  .map((item) => ({
    id: item.id,
    title: item.title,
    src: '/' + encodeURIComponent(item.src),
    order: item.order,
  }))

/** Para fallback quando o arquivo tem nome com espaço no disco */
export function getImageSrc(filename: string): string {
  return '/' + encodeURIComponent(filename)
}
