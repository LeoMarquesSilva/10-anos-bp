import { motion } from 'motion/react'
import { Sparkles, Building2, Globe, Layout, Check } from 'lucide-react'
import { Section } from './Section'
import { bloco01 } from '../content/plano'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const spring = { type: 'spring' as const, stiffness: 200, damping: 24 }
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
}
const child = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: spring },
}

export function Block01() {
  const { lancamento, aplicacao } = bloco01

  return (
    <Section id="bloco01" variant="claro" showSelo>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="w-full max-w-4xl mx-auto space-y-8"
      >
        <motion.article variants={child}>
          <Card className="border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground" aria-hidden>
                    <Sparkles className="size-5" />
                  </span>
                  <div className="space-y-1.5">
                    <CardTitle className="font-[var(--font-heading)] text-[var(--azul-marca)] text-lg uppercase leading-tight">
                      {lancamento.titulo}
                    </CardTitle>
                    <CardDescription className="text-sm text-foreground/90">
                      {lancamento.texto}
                    </CardDescription>
                  </div>
                </div>
                <span className="rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  Março
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Proposta do evento
                </p>
                <ul className="space-y-2">
                  {lancamento.proposta.map((p, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm">
                      <Check className="size-4 shrink-0 text-muted-foreground" strokeWidth={2.5} aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm italic text-muted-foreground">
                {lancamento.conclusao}
              </p>
            </CardContent>
          </Card>
        </motion.article>

        <motion.article variants={child}>
          <Card className="border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground" aria-hidden>
                  <Layout className="size-5" />
                </span>
                <CardTitle className="font-[var(--font-heading)] text-[var(--azul-marca)] text-lg uppercase leading-tight pt-1">
                  Aplicação da Identidade Visual
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-6">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Building2 className="size-4 text-muted-foreground" />
                  Institucional
                </p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {aplicacao.institucional.map((a, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="size-4 shrink-0 mt-0.5 text-muted-foreground" strokeWidth={2.5} aria-hidden />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Globe className="size-4 text-muted-foreground" />
                  Site
                </p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {aplicacao.site.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="size-4 shrink-0 mt-0.5 text-muted-foreground" strokeWidth={2.5} aria-hidden />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-sm font-medium text-foreground mb-2">
                  Seção especial &quot;10 Anos&quot; no site
                </p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {aplicacao.secaoEspecial.map((e, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="size-4 shrink-0 mt-0.5 text-muted-foreground" strokeWidth={2.5} aria-hidden />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm italic text-muted-foreground">
                {aplicacao.conclusao}
              </p>
            </CardContent>
          </Card>
        </motion.article>
      </motion.div>
    </Section>
  )
}
