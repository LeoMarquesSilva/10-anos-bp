import { motion } from 'motion/react'
import { Section } from './Section'
import { bloco04 } from '../content/plano'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const spring = { type: 'spring' as const, stiffness: 200, damping: 24 }
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}
const child = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: spring },
}

export function Block04() {
  const { evento, relatorio } = bloco04

  return (
    <Section id="bloco04" variant="azul" showSelo>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={stagger}
        className="w-full max-w-2xl mx-auto space-y-6"
      >
        <motion.div variants={child}>
          <Card className="border-white/15 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-[var(--font-heading)] text-[var(--dourado-claro)] text-lg">
                {evento.titulo}
              </CardTitle>
              <p className="text-white/90 text-sm font-semibold pt-1">No evento de 10 anos:</p>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <ul className="space-y-1 text-sm text-white/85">
                {evento.itens.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--dourado-claro)]">–</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-white/85 text-sm italic pt-3">{evento.conclusao}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={child}>
          <Card className="border-white/15 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-[var(--font-heading)] text-[var(--dourado-claro)] text-lg">
                {relatorio.titulo}
              </CardTitle>
              <p className="text-white/90 text-sm font-normal">{relatorio.texto}</p>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div>
                <p className="text-white/90 text-sm font-semibold">Estrutura sugerida:</p>
                <ul className="mt-1.5 space-y-1 text-sm text-white/85">
                  {relatorio.estrutura.map((e, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[var(--dourado-claro)]">–</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-white/90 text-sm font-semibold">Aplicações estratégicas:</p>
                <ul className="mt-1.5 space-y-1 text-sm text-white/85">
                  {relatorio.aplicacoes.map((a, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[var(--dourado-claro)]">–</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-white/85 text-sm italic pt-2">{relatorio.conclusao}</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  )
}
