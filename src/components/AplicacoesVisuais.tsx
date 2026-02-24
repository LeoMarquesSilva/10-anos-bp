import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Section } from './Section'
import { aplicacoesVisuais } from '../content/aplicacoes'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const spring = { type: 'spring' as const, stiffness: 280, damping: 30 }

const total = aplicacoesVisuais.length

export function AplicacoesVisuais() {
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [page, setPage] = useState(0)

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
              {aplicacoesVisuais.map((item) => (
                <div
                  key={item.id}
                  className="min-w-0 flex-shrink-0 p-1"
                  style={{ width: `${100 / total}%` }}
                >
                  <Card className="overflow-hidden border-[var(--azul-marca)]/10 bg-white shadow-sm transition-all hover:shadow-lg hover:border-[var(--dourado)]/30 h-full">
                    <button
                      type="button"
                      className="w-full text-left block h-full flex flex-col"
                      onClick={() => setLightbox(item.src)}
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
                {aplicacoesVisuais.map((_, i) => (
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
                className="max-h-[85vh] w-auto rounded-lg shadow-2xl"
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
