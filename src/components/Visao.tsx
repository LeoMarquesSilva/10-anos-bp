import { motion } from 'motion/react'
import { Target } from 'lucide-react'
import { Section } from './Section'
import { visaoEstrategica } from '../content/plano'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
          <ul className="grid gap-3 sm:grid-cols-2">
            {visaoEstrategica.objetivos.map((obj, i) => (
              <motion.li key={i} variants={item}>
                <Card className="h-full border border-border bg-card shadow-sm transition-colors hover:bg-accent/30 hover:border-accent">
                  <CardContent className="flex items-start gap-3 py-4 px-5">
                    <span
                      className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-snug pt-0.5">{obj}</span>
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
