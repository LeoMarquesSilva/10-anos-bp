import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Section } from './Section'
import { orcamentos } from '../content/plano'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const spring = { type: 'spring' as const, stiffness: 280, damping: 30 }

type ItemOrcamento = {
  descricao: string
  quantidade: number
  valorUnitario: string
  valorUnitarioNum: number
  valorTotal: string
  imagem: string
}

const itens: ItemOrcamento[] = [
  orcamentos.canecas,
  orcamentos.garrafas,
  orcamentos.cadernos,
  orcamentos.flamulas,
]

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

const totalSlides = itens.length

export function Orcamentos() {
  const [page, setPage] = useState(0)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [quantidades, setQuantidades] = useState<number[]>(() =>
    itens.map((i) => i.quantidade)
  )

  const updateQty = useCallback((index: number, qty: number) => {
    const n = Math.max(0, Math.floor(qty))
    setQuantidades((prev) => {
      const next = [...prev]
      next[index] = n
      return next
    })
  }, [])

  const canPrev = page > 0
  const canNext = page < totalSlides - 1
  const goPrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])
  const goNext = useCallback(
    () => setPage((p) => Math.min(totalSlides - 1, p + 1)),
    []
  )

  const totalGeral = quantidades.reduce(
    (acc, qty, i) => acc + qty * itens[i].valorUnitarioNum,
    0
  )

  return (
    <Section id="orcamentos" variant="azul" showSelo>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={spring}
        className="w-full max-w-4xl mx-auto"
      >
        <h2 className="font-[var(--font-heading)] text-white text-xl mb-2 uppercase">
          Orçamentos
        </h2>
        <p className="text-white/90 text-sm mb-6">
          Valores de referência para canecas, garrafas, cadernos e flâmulas com o selo 10 anos. Ajuste a quantidade para ver o total.
        </p>

        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <motion.div
              className="flex"
              style={{
                width: `${totalSlides * 100}%`,
                x: `-${page * (100 / totalSlides)}%`,
              }}
              transition={spring}
            >
              {itens.map((item, index) => (
                <div
                  key={index}
                  className="min-w-0 flex-shrink-0 p-2"
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  <Card className="overflow-hidden border-white/15 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:shadow-lg h-full flex flex-col">
                    <button
                      type="button"
                      className="aspect-[4/3] bg-black/20 overflow-hidden flex-shrink-0 flex items-center justify-center w-full cursor-pointer hover:opacity-95 transition-opacity"
                      onClick={() => setLightbox(item.imagem)}
                      aria-label={`Ampliar imagem: ${item.descricao}`}
                    >
                      <img
                        src={item.imagem}
                        alt=""
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </button>
                    <CardContent className="p-4 flex-1 flex flex-col gap-2">
                      <p className="font-semibold text-[var(--dourado)] uppercase text-sm">
                        {item.descricao}
                      </p>
                      <p className="text-sm text-white/85">
                        Valor unitário: {item.valorUnitario}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <label htmlFor={`qty-${index}`} className="text-sm text-white/85">
                          Quantidade:
                        </label>
                        <div className="flex items-center rounded-lg border border-white/20 overflow-hidden bg-white/10">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-none text-white hover:bg-white/20"
                            onClick={() =>
                              updateQty(index, quantidades[index] - 1)
                            }
                            aria-label="Diminuir"
                          >
                            −
                          </Button>
                          <input
                            id={`qty-${index}`}
                            type="number"
                            min={0}
                            step={1}
                            value={quantidades[index]}
                            onChange={(e) =>
                              updateQty(index, Number(e.target.value) || 0)
                            }
                            className="w-14 bg-transparent text-center text-white font-medium text-sm border-0 focus:ring-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-none text-white hover:bg-white/20"
                            onClick={() =>
                              updateQty(index, quantidades[index] + 1)
                            }
                            aria-label="Aumentar"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <p className="text-base font-bold text-white pt-2 border-t border-white/15 mt-auto">
                        Total: {formatBRL(quantidades[index] * item.valorUnitarioNum)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {totalSlides > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 rounded-full size-10 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
                onClick={goPrev}
                disabled={!canPrev}
                aria-label="Anterior"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 rounded-full size-10 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
                onClick={goNext}
                disabled={!canNext}
                aria-label="Próximo"
              >
                <ChevronRight className="size-5" />
              </Button>

              <div className="flex justify-center gap-1.5 mt-4">
                {itens.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    className={cn(
                      'size-2 rounded-full transition-all duration-200',
                      i === page
                        ? 'bg-[var(--dourado)] w-6'
                        : 'bg-white/30 hover:bg-white/50'
                    )}
                    aria-label={`Item ${i + 1}`}
                    aria-current={i === page ? 'true' : undefined}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <motion.div
          className="mt-6 pt-6 border-t border-white/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-white/90 text-sm font-semibold mb-3 uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
            Resumo do orçamento
          </p>
          <ul className="space-y-1.5 text-white/90 text-sm mb-4 text-left max-w-md mx-auto sm:mx-0">
            {itens
              .map((item, index) => ({
                ...item,
                qty: quantidades[index],
                subtotal: quantidades[index] * item.valorUnitarioNum,
              }))
              .filter((row) => row.qty > 0)
              .map((row) => (
                <li key={row.descricao} className="flex flex-wrap items-baseline justify-between gap-2">
                  <span>
                    {row.descricao}: <strong className="text-white">{row.qty}</strong> un.
                  </span>
                  <span className="text-[var(--dourado)] font-medium">
                    {formatBRL(row.subtotal)}
                  </span>
                </li>
              ))}
          </ul>
          {itens.every((_, i) => quantidades[i] === 0) && (
            <p className="text-white/70 text-sm mb-4">Nenhum item selecionado.</p>
          )}
          <div className="text-center pt-3 border-t border-white/15">
            <p className="text-white/90 text-sm">Total geral</p>
            <p className="text-2xl font-bold text-[var(--dourado)] mt-1 uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
              {formatBRL(totalGeral)}
            </p>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#101f2e]/95 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[85vh]"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox}
                alt=""
                className="max-h-[85vh] w-auto rounded-lg shadow-2xl object-contain"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 size-10 rounded-full bg-white/15 text-white hover:bg-white/25 text-2xl"
                onClick={() => setLightbox(null)}
                aria-label="Fechar"
              >
                ×
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
