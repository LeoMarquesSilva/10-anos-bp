import { useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { Users, BarChart3, MessageSquareQuote, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { Section } from './Section'
import { bloco02 } from '../content/plano'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const spring = { type: 'spring' as const, stiffness: 280, damping: 30 }
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.06 },
  },
}
const child = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 24 } },
}

const SERIE_ICONS = [Users, BarChart3, MessageSquareQuote] as const

export function Block02() {
  const { estrategia, serie01, serie02, serie03 } = bloco02
  const series = [serie01, serie02, serie03]
  const [page, setPage] = useState(0)
  const total = series.length
  const canPrev = page > 0
  const canNext = page < total - 1
  const goPrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])
  const goNext = useCallback(() => setPage((p) => Math.min(total - 1, p + 1)), [])

  return (
    <Section id="bloco02" variant="azul" showSelo>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="w-full max-w-4xl mx-auto space-y-8"
      >
        <motion.div variants={child}>
          <Card className="border-white/15 bg-white/5 backdrop-blur-sm border">
            <CardHeader>
              <CardTitle className="font-[var(--font-heading)] text-[var(--dourado)] text-lg uppercase">
                Estratégia Digital 10 Anos
              </CardTitle>
              <p className="text-white/90 text-sm font-normal">
                Plataformas foco: {estrategia.plataformas.join(', ')}
              </p>
              <p className="text-white/90 text-sm font-semibold pt-2 uppercase tracking-wide">Objetivos</p>
              <ul className="space-y-1.5 text-sm text-white/85">
                {estrategia.objetivos.map((o, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-[var(--dourado)]" strokeWidth={2.5} />
                    {o}
                  </li>
                ))}
              </ul>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div variants={child}>
          <p className="text-sm font-medium text-white/80 uppercase tracking-wide mb-4">
            Séries de conteúdo
          </p>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl min-h-[340px] sm:min-h-[380px]">
              <motion.div
                className="flex"
                style={{
                  width: `${total * 100}%`,
                  x: `-${page * (100 / total)}%`,
                }}
                transition={spring}
              >
                {series.map((serie, i) => {
                  const Icon = SERIE_ICONS[i]
                  return (
                    <div
                      key={i}
                      className="min-w-0 flex-shrink-0 px-2 sm:px-3"
                      style={{ width: `${100 / total}%` }}
                    >
                      <Card className="h-full min-h-[320px] sm:min-h-[360px] border-2 border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-xl hover:shadow-black/10">
                        <CardHeader className="pb-2">
                          <div className="flex items-start gap-3">
                            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--dourado)]/20 text-[var(--dourado)]">
                              <Icon className="size-6" strokeWidth={1.5} />
                            </span>
                            <CardTitle className="font-[var(--font-heading)] text-white text-base sm:text-lg uppercase leading-tight pt-1">
                              {serie.titulo}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4 text-sm">
                          {'formato' in serie && typeof serie.formato === 'string' && (
                            <p className="text-white/90 leading-relaxed">{serie.formato}</p>
                          )}
                          {'texto' in serie && serie.texto && (
                            <p className="text-white/90 leading-relaxed">{serie.texto}</p>
                          )}

                          {'conteudo' in serie && serie.conteudo && (
                            <div>
                              <p className="text-white font-semibold uppercase tracking-wide mb-1.5">Conteúdo</p>
                              <ul className="space-y-1 text-white/85">
                                {serie.conteudo.map((c, j) => (
                                  <li key={j} className="flex items-start gap-2">
                                    <Check className="size-3.5 shrink-0 mt-1 text-[var(--dourado)]" />
                                    {c}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {'estrutura' in serie && serie.estrutura && (
                            <div>
                              <p className="text-white font-semibold uppercase tracking-wide mb-1.5">Estrutura do carrossel</p>
                              <ul className="space-y-1 text-white/85">
                                {serie.estrutura.map((e, j) => (
                                  <li key={j} className="flex items-start gap-2">
                                    <Check className="size-3.5 shrink-0 mt-1 text-[var(--dourado)]" />
                                    {e}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {'exemplos' in serie && serie.exemplos && (
                            <div>
                              <p className="text-white font-semibold uppercase tracking-wide mb-1.5">Exemplos</p>
                              <ul className="space-y-1 text-white/85">
                                {serie.exemplos.map((e, j) => (
                                  <li key={j} className="flex items-start gap-2">
                                    <Check className="size-3.5 shrink-0 mt-1 text-[var(--dourado)]" />
                                    {e}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {'formato' in serie && Array.isArray(serie.formato) && (
                            <div>
                              <p className="text-white font-semibold uppercase tracking-wide mb-1.5">Formato</p>
                              <ul className="space-y-1 text-white/85">
                                {serie.formato.map((f, j) => (
                                  <li key={j} className="flex items-start gap-2">
                                    <Check className="size-3.5 shrink-0 mt-1 text-[var(--dourado)]" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {'aplicacoes' in serie && serie.aplicacoes && (
                            <div>
                              <p className="text-white font-semibold uppercase tracking-wide mb-1.5">Aplicações</p>
                              <ul className="space-y-1 text-white/85">
                                {serie.aplicacoes.map((a, j) => (
                                  <li key={j} className="flex items-start gap-2">
                                    <Check className="size-3.5 shrink-0 mt-1 text-[var(--dourado)]" />
                                    {a}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {'objetivos' in serie && (
                            <div>
                              <p className="text-white font-semibold uppercase tracking-wide mb-1.5">Objetivos</p>
                              <ul className="space-y-1 text-white/85">
                                {serie.objetivos.map((o, j) => (
                                  <li key={j} className="flex items-start gap-2">
                                    <Check className="size-3.5 shrink-0 mt-1 text-[var(--dourado)]" />
                                    {o}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {'objetivo' in serie && typeof serie.objetivo === 'string' && (
                            <p className="text-white/90 italic border-l-2 border-[var(--dourado)]/50 pl-4 py-1">
                              {serie.objetivo}
                            </p>
                          )}

                          <p className="text-white/60 text-xs font-medium pt-2">
                            {i + 1} de {total}
                          </p>
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
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 rounded-full size-11 bg-white/10 border-2 border-white/30 text-white hover:bg-[var(--dourado)] hover:border-[var(--dourado)] hover:text-[#101f2e] hover:scale-110 transition-all"
                  onClick={goPrev}
                  disabled={!canPrev}
                  aria-label="Série anterior"
                >
                  <ChevronLeft className="size-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 rounded-full size-11 bg-white/10 border-2 border-white/30 text-white hover:bg-[var(--dourado)] hover:border-[var(--dourado)] hover:text-[#101f2e] hover:scale-110 transition-all"
                  onClick={goNext}
                  disabled={!canNext}
                  aria-label="Próxima série"
                >
                  <ChevronRight className="size-5" />
                </Button>

                <div className="flex justify-center gap-2 mt-6">
                  {series.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPage(i)}
                      className={cn(
                        'size-2.5 rounded-full transition-all duration-300',
                        i === page
                          ? 'bg-[var(--dourado)] w-8 scale-110'
                          : 'bg-white/30 hover:bg-white/50 hover:scale-110'
                      )}
                      aria-label={`Série ${i + 1}`}
                      aria-current={i === page ? 'true' : undefined}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  )
}
