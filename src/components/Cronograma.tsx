import { useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { Calendar, Check, Circle } from 'lucide-react'
import { Section } from './Section'
import { cronograma } from '../content/plano'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const spring = { type: 'spring' as const, stiffness: 200, damping: 24 }
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: spring },
}

type ParsedItem = {
  label: string
  statusTag: 'Concluído' | 'Em andamento' | null
  statusExtra: string | null
}

function parseItem(texto: string): ParsedItem {
  const concluidoMatch = texto.match(/^(.+?)\s*–\s*Concluído\s*(?:\((.*?)\))?\s*$/i)
  const emAndamentoMatch = texto.match(/^(.+?)\s*–\s*Em andamento\s*$/i)
  if (concluidoMatch) {
    return {
      label: concluidoMatch[1].trim(),
      statusTag: 'Concluído',
      statusExtra: concluidoMatch[2]?.trim() ?? null,
    }
  }
  if (emAndamentoMatch) {
    return {
      label: emAndamentoMatch[1].trim(),
      statusTag: 'Em andamento',
      statusExtra: null,
    }
  }
  return { label: texto, statusTag: null, statusExtra: null }
}

export function Cronograma() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggleChecked = useCallback((faseIndex: number, itemIndex: number) => {
    const key = `${faseIndex}-${itemIndex}`
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  return (
    <Section id="cronograma" variant="claro" showSelo>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={stagger}
        className="w-full max-w-3xl mx-auto"
      >
        <div className="mb-10">
          <h2 className="font-[var(--font-heading)] text-[var(--azul-marca)] text-xl mb-2 uppercase">
            Cronograma do Projeto
          </h2>
          <p className="text-[var(--texto-muted)] text-sm max-w-xl">
            Marcos e entregas previstas para a campanha dos 10 anos. Marque os itens concluídos.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--dourado)] via-[var(--dourado)]/60 to-transparent rounded-full md:left-6"
            aria-hidden
          />

          <ul className="space-y-6">
            {cronograma.map((fase, faseIndex) => (
              <motion.li
                key={fase.periodo}
                variants={item}
                className="relative pl-12 md:pl-14"
              >
                <span
                  className="absolute left-0 top-7 size-[10px] rounded-full bg-[var(--dourado)] border-2 border-white shadow-md md:left-[5px] md:top-8"
                  aria-hidden
                />

                <Card
                  className={cn(
                    'overflow-hidden border border-[var(--azul-marca)]/12 bg-white shadow-sm',
                    'transition-all duration-200 hover:shadow-md hover:border-[var(--dourado)]/30',
                    'border-l-4 border-l-[var(--dourado)]'
                  )}
                >
                  <CardHeader className="pb-2 pt-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <CardTitle className="font-[var(--font-heading)] text-[var(--azul-marca)] text-base leading-tight uppercase">
                        {fase.fase}
                      </CardTitle>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--dourado)]/15 px-3 py-1 text-xs font-medium text-[var(--azul-marca)]"
                        aria-label={`Período: ${fase.periodo}`}
                      >
                        <Calendar className="size-3.5 shrink-0" />
                        {fase.periodo}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pb-5">
                    <ul className="space-y-2">
                      {fase.itens.map((texto, itemIndex) => {
                        const parsed = parseItem(texto)
                        const key = `${faseIndex}-${itemIndex}`
                        const isChecked = checked.has(key)
                        return (
                          <li
                            key={itemIndex}
                            className={cn(
                              'flex items-start gap-3 text-sm text-[var(--texto-escuro)] group',
                              isChecked && 'opacity-90'
                            )}
                          >
                            <button
                              type="button"
                              onClick={() => toggleChecked(faseIndex, itemIndex)}
                              className={cn(
                                'flex-shrink-0 mt-0.5 rounded-full p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--dourado)] focus:ring-offset-2',
                                isChecked
                                  ? 'text-emerald-600 bg-emerald-100'
                                  : 'text-[var(--azul-marca)]/40 hover:text-[var(--dourado)] hover:bg-[var(--dourado)]/10'
                              )}
                              aria-label={isChecked ? 'Marcar como não concluído' : 'Marcar como concluído'}
                            >
                              {isChecked ? (
                                <Check className="size-5" strokeWidth={2.5} />
                              ) : (
                                <Circle className="size-5" strokeWidth={2} />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <span
                                className={cn(
                                  isChecked && 'line-through text-[var(--texto-muted)]'
                                )}
                              >
                                {parsed.label}
                              </span>
                              {(parsed.statusExtra || parsed.statusTag || isChecked) && (
                                <span className="ml-2 inline-flex flex-wrap items-center gap-1.5">
                                  {isChecked && (
                                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                                      Concluído
                                    </span>
                                  )}
                                  {!isChecked && parsed.statusTag === 'Concluído' && (
                                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                                      Concluído
                                    </span>
                                  )}
                                  {!isChecked && parsed.statusTag === 'Em andamento' && (
                                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                                      Em andamento
                                    </span>
                                  )}
                                  {parsed.statusExtra && (
                                    <span className="text-xs text-[var(--texto-muted)]">
                                      ({parsed.statusExtra})
                                    </span>
                                  )}
                                </span>
                              )}
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </Section>
  )
}
