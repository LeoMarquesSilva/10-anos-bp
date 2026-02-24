import { useState, useCallback } from 'react'
import { motion } from 'motion/react'
import {
  Target,
  Award,
  Users,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Section } from './Section'
import { visaoEstrategica } from '../content/plano'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const OBJETIVO_ICONS = [
  Award,      // Reforçar a autoridade do escritório
  Target,     // Consolidar a marca no mercado
  Users,      // Humanizar a comunicação institucional
  TrendingUp, // Evidenciar impacto e resultados
] as const

const spring = { type: 'spring' as const, stiffness: 280, damping: 30 }
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 24 },
  },
}

export function Visao() {
  const [page, setPage] = useState(0)
  const objetivos = visaoEstrategica.objetivos
  const total = objetivos.length
  const canPrev = page > 0
  const canNext = page < total - 1
  const goPrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])
  const goNext = useCallback(() => setPage((p) => Math.min(total - 1, p + 1)), [])

  return (
    <Section id="visao" variant="claro" showSelo>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={container}
        className="w-full max-w-4xl mx-auto"
      >
        <motion.div variants={item} className="mb-8">
          <Card className="border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground" aria-hidden>
                  <Target className="size-5" />
                </span>
                <div className="space-y-1.5">
                  <CardTitle className="font-[var(--font-heading)] text-[var(--azul-marca)] text-xl uppercase">
                    Visão Estratégica
                  </CardTitle>
                  <CardDescription className="text-base text-foreground/90">
                    {visaoEstrategica.intro}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <div className="mb-4">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Objetivos do projeto
          </p>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl min-h-[280px] sm:min-h-[320px]">
              <motion.div
                className="flex"
                style={{
                  width: `${total * 100}%`,
                  x: `-${page * (100 / total)}%`,
                }}
                transition={spring}
              >
                {objetivos.map((obj, i) => {
                  const Icon = OBJETIVO_ICONS[i] ?? Target
                  return (
                    <div
                      key={i}
                      className="min-w-0 flex-shrink-0 px-2 sm:px-3"
                      style={{ width: `${100 / total}%` }}
                    >
                      <Card className="h-full min-h-[260px] sm:min-h-[300px] border-2 border-border bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:border-[var(--azul-marca)]/20">
                        <CardContent className="flex flex-col items-center justify-center text-center py-12 sm:py-16 px-6 sm:px-10">
                          <motion.div
                            key={`${i}-${page}`}
                            initial={{ opacity: 0, y: 20, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                            className="flex flex-col items-center w-full"
                          >
                            <motion.span
                              className="flex size-20 sm:size-24 shrink-0 items-center justify-center rounded-2xl bg-[var(--azul-marca)]/8 text-[var(--azul-marca)] mb-6"
                              aria-hidden
                              initial={{ scale: 0.85 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.06 }}
                            >
                              <Icon className="size-10 sm:size-12" strokeWidth={1.5} />
                            </motion.span>
                            <motion.span
                              className="text-lg sm:text-xl font-semibold text-foreground leading-snug max-w-md"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1, duration: 0.25 }}
                            >
                              {obj}
                            </motion.span>
                            <motion.span
                              className="text-sm text-muted-foreground mt-4 font-medium"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.16 }}
                            >
                              {i + 1} de {total}
                            </motion.span>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </motion.div>
            </div>

            {total > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 rounded-full size-11 bg-card border-2 border-border shadow-lg hover:bg-accent/50 hover:scale-110 transition-transform"
                  onClick={goPrev}
                  disabled={!canPrev}
                  aria-label="Objetivo anterior"
                >
                  <ChevronLeft className="size-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 rounded-full size-11 bg-card border-2 border-border shadow-lg hover:bg-accent/50 hover:scale-110 transition-transform"
                  onClick={goNext}
                  disabled={!canNext}
                  aria-label="Próximo objetivo"
                >
                  <ChevronRight className="size-5" />
                </Button>

                <div className="flex justify-center gap-2 mt-6">
                  {objetivos.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPage(i)}
                      className={cn(
                        'size-2.5 rounded-full transition-all duration-300',
                        i === page
                          ? 'bg-[var(--azul-marca)] w-8 scale-110'
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-110'
                      )}
                      aria-label={`Objetivo ${i + 1}`}
                      aria-current={i === page ? 'true' : undefined}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
