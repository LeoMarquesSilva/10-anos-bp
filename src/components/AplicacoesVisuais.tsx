import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, GripVertical, ChevronUp, ChevronDown } from 'lucide-react'
import { Section } from './Section'
import { aplicacoesVisuais, type AplicacaoItem } from '../content/aplicacoes'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const STORAGE_KEY = '10-anos-bp-aplicacoes-order'

function getInitialOrder(): string[] {
  const defaultIds = aplicacoesVisuais.map((i) => i.id)
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultIds
    const saved = JSON.parse(raw) as string[]
    const valid = saved.filter((id) => defaultIds.includes(id))
    const appended = defaultIds.filter((id) => !saved.includes(id))
    return [...valid, ...appended]
  } catch {
    return defaultIds
  }
}

const spring = { type: 'spring' as const, stiffness: 280, damping: 30 }

export function AplicacoesVisuais() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [page, setPage] = useState(0)
  const [orderedIds, setOrderedIds] = useState<string[]>(getInitialOrder)
  const [openOrderSheet, setOpenOrderSheet] = useState(false)

  const itemsToShow = useMemo(() => {
    return orderedIds
      .map((id) => aplicacoesVisuais.find((i) => i.id === id))
      .filter((x): x is AplicacaoItem => Boolean(x))
  }, [orderedIds])

  const total = itemsToShow.length

  const saveOrder = useCallback((ids: string[]) => {
    setOrderedIds(ids)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // ignore
    }
  }, [])

  const move = useCallback(
    (index: number, direction: -1 | 1) => {
      const next = index + direction
      if (next < 0 || next >= orderedIds.length) return
      const newIds = [...orderedIds]
      ;[newIds[index], newIds[next]] = [newIds[next], newIds[index]]
      saveOrder(newIds)
    },
    [orderedIds, saveOrder]
  )

  const canPrev = page > 0
  const canNext = page < total - 1

  const goPrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])
  const goNext = useCallback(() => setPage((p) => Math.min(total - 1, p + 1)), [])

  return (
    <Section id="aplicacoes" variant="claro" showSelo>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={spring}
        className="w-full max-w-5xl mx-auto"
      >
        <h2 className="font-[var(--font-heading)] text-[var(--azul-marca)] text-xl mb-2 uppercase">
          Aplicações visuais do selo
        </h2>
        <p className="text-[var(--texto-muted)] text-sm mb-6 max-w-xl">
          Identidade 10 anos aplicada em materiais institucionais, digitais e brindes.
        </p>

        <div className="flex items-center gap-2 mb-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-[var(--azul-marca)]/30 text-[var(--azul-marca)] hover:bg-[var(--azul-marca)]/10"
            onClick={() => setOpenOrderSheet(true)}
          >
            <GripVertical className="size-4 mr-1.5" />
            Ajustar ordem
          </Button>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <motion.div
              className="flex"
              style={{
                width: `${total * 100}%`,
                x: `-${page * (100 / total)}%`,
              }}
              transition={spring}
            >
              {itemsToShow.map((item) => (
                <div
                  key={item.id}
                  className="min-w-0 flex-shrink-0 p-1"
                  style={{ width: `${100 / total}%` }}
                >
                  <Card className="overflow-hidden border-[var(--azul-marca)]/10 bg-white shadow-sm transition-all hover:shadow-lg hover:border-[var(--dourado)]/30 h-full">
                    <button
                      type="button"
                      className="w-full text-left block h-full flex flex-col"
                      onClick={() => setLightboxIndex(itemsToShow.indexOf(item))}
                      aria-label={`Ver ${item.title}`}
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-muted flex-shrink-0 flex items-center justify-center">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-contain transition-transform hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="py-3 flex-1">
                        <p className="text-sm font-semibold text-[var(--azul-marca)]">{item.title}</p>
                      </CardContent>
                    </button>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {total > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 rounded-full size-10 bg-white border-[var(--azul-marca)]/20 shadow-md hover:bg-[var(--azul-marca)] hover:text-white hover:border-[var(--azul-marca)]"
                onClick={goPrev}
                disabled={!canPrev}
                aria-label="Anterior"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 rounded-full size-10 bg-white border-[var(--azul-marca)]/20 shadow-md hover:bg-[var(--azul-marca)] hover:text-white hover:border-[var(--azul-marca)]"
                onClick={goNext}
                disabled={!canNext}
                aria-label="Próximo"
              >
                <ChevronRight className="size-5" />
              </Button>

              <div className="flex justify-center gap-1.5 mt-4 flex-wrap">
                {itemsToShow.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    className={cn(
                      'size-2 rounded-full transition-all duration-200',
                      i === page
                        ? 'bg-[var(--azul-marca)] w-6'
                        : 'bg-[var(--azul-marca)]/30 hover:bg-[var(--azul-marca)]/50'
                    )}
                    aria-label={`Slide ${i + 1}`}
                    aria-current={i === page ? 'true' : undefined}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#101f2e]/95 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center gap-2"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {total > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="flex-shrink-0 rounded-full size-12 bg-[#101f2e]/90 border-white/20 text-white hover:bg-[var(--azul-marca)] hover:border-[var(--azul-marca)]"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex((i) => (i === null ? null : Math.max(0, i - 1)))
                  }}
                  disabled={lightboxIndex <= 0}
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="size-6" />
                </Button>
              )}
              <img
                src={itemsToShow[lightboxIndex].src}
                alt={itemsToShow[lightboxIndex].title}
                className="max-h-[85vh] w-auto rounded-lg shadow-2xl flex-1 object-contain"
              />
              {total > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="flex-shrink-0 rounded-full size-12 bg-[#101f2e]/90 border-white/20 text-white hover:bg-[var(--azul-marca)] hover:border-[var(--azul-marca)]"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex((i) => (i === null ? null : Math.min(total - 1, i + 1)))
                  }}
                  disabled={lightboxIndex >= total - 1}
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="size-6" />
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 size-10 rounded-full bg-white/15 text-white hover:bg-white/25 text-2xl"
                onClick={() => setLightboxIndex(null)}
                aria-label="Fechar"
              >
                ×
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sheet open={openOrderSheet} onOpenChange={setOpenOrderSheet}>
        <SheetContent
          side="right"
          className="w-full max-w-sm sm:max-w-md bg-[var(--fundo-escuro)] border-[var(--azul-marca)]/20"
        >
          <SheetHeader>
            <SheetTitle className="text-[var(--azul-marca)] uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
              Ordem das aplicações
            </SheetTitle>
          </SheetHeader>
          <div className="py-6 space-y-2 overflow-y-auto max-h-[60vh]">
            {itemsToShow.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg border border-[var(--azul-marca)]/30 bg-[#1e3648] shadow-sm px-2 py-2"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-white/10 border border-white/10">
                  <img
                    src={item.src}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                <span className="flex-1 text-sm text-white truncate min-w-0">{item.title}</span>
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 text-[var(--azul-marca)] hover:bg-[var(--azul-marca)]/20 disabled:opacity-30"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label="Subir"
                  >
                    <ChevronUp className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 text-[var(--azul-marca)] hover:bg-[var(--azul-marca)]/20 disabled:opacity-30"
                    onClick={() => move(index, 1)}
                    disabled={index === itemsToShow.length - 1}
                    aria-label="Descer"
                  >
                    <ChevronDown className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <SheetFooter>
            <Button
              type="button"
              className="bg-[var(--azul-marca)] hover:bg-[var(--azul-marca)]/90"
              onClick={() => setOpenOrderSheet(false)}
            >
              Concluído
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Section>
  )
}
