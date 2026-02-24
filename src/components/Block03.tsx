import { motion } from 'motion/react'
import { Section } from './Section'
import { bloco03 } from '../content/plano'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const spring = { type: 'spring' as const, stiffness: 200, damping: 24 }
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.06 },
  },
}
const child = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: spring },
}

export function Block03() {
  return (
    <Section id="bloco03" variant="claro" showSelo>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={stagger}
        className="w-full max-w-2xl mx-auto grid gap-6 sm:grid-cols-2"
      >
        <motion.div variants={child}>
          <Card className="border-[var(--azul-marca)]/15 bg-white shadow-sm h-full">
            <CardHeader>
              <CardTitle className="font-[var(--font-heading)] text-[var(--azul-marca)] text-lg">
                Plano de Gravações
              </CardTitle>
              <p className="text-sm font-semibold text-[var(--texto-escuro)] pt-1">
                Gravações previstas:
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-1.5 text-sm text-[var(--texto-muted)]">
                {bloco03.gravacoes.map((g, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--dourado)]">–</span>
                    {g}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={child}>
          <Card className="border-[var(--azul-marca)]/15 bg-white shadow-sm h-full">
            <CardHeader>
              <CardTitle className="font-[var(--font-heading)] text-[var(--azul-marca)] text-lg">
                Entregáveis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-1.5 text-sm text-[var(--texto-muted)]">
                {bloco03.entregaveis.map((e, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--dourado)]">–</span>
                    {e}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  )
}
