import { motion } from 'motion/react'
import { Section } from './Section'
import { bloco02 } from '../content/plano'
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
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: spring },
}

export function Block02() {
  const { estrategia, serie01, serie02, serie03 } = bloco02

  return (
    <Section id="bloco02" variant="azul" showSelo>
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
                Estratégia Digital 10 Anos
              </CardTitle>
              <p className="text-white/90 text-sm font-normal">
                Plataformas foco: {estrategia.plataformas.join(', ')}
              </p>
              <p className="text-white/90 text-sm font-semibold pt-2">Objetivos:</p>
              <ul className="space-y-1 text-sm text-white/85">
                {estrategia.objetivos.map((o, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--dourado-claro)]">–</span>
                    {o}
                  </li>
                ))}
              </ul>
            </CardHeader>
          </Card>
        </motion.div>

        {[
          {
            title: serie01.titulo,
            content: (
              <>
                <p className="text-white/90 text-sm">{serie01.formato}</p>
                <p className="text-white/90 text-sm font-semibold pt-2">Conteúdo:</p>
                <ul className="space-y-1 text-sm text-white/85">
                  {serie01.conteudo.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
                <p className="text-white/90 text-sm font-semibold pt-2">Estrutura do carrossel:</p>
                <ul className="space-y-1 text-sm text-white/85">
                  {serie01.estrutura.map((e, i) => (
                    <li key={i}>– {e}</li>
                  ))}
                </ul>
                <p className="text-white/90 text-sm font-semibold pt-2">Objetivos:</p>
                <ul className="space-y-1 text-sm text-white/85">
                  {serie01.objetivos.map((o, i) => (
                    <li key={i}>– {o}</li>
                  ))}
                </ul>
              </>
            ),
          },
          {
            title: serie02.titulo,
            content: (
              <>
                <p className="text-white/90 text-sm">{serie02.texto}</p>
                <p className="text-white/90 text-sm font-semibold pt-2">Exemplos:</p>
                <ul className="space-y-1 text-sm text-white/85">
                  {serie02.exemplos.map((e, i) => (
                    <li key={i}>– {e}</li>
                  ))}
                </ul>
                <p className="text-white/90 text-sm font-semibold pt-2">Formato:</p>
                <ul className="space-y-1 text-sm text-white/85">
                  {serie02.formato.map((f, i) => (
                    <li key={i}>– {f}</li>
                  ))}
                </ul>
                <p className="text-white/90 text-sm font-semibold pt-2">Objetivos:</p>
                <ul className="space-y-1 text-sm text-white/85">
                  {serie02.objetivos.map((o, i) => (
                    <li key={i}>– {o}</li>
                  ))}
                </ul>
              </>
            ),
          },
          {
            title: serie03.titulo,
            content: (
              <>
                <p className="text-white/90 text-sm">{serie03.texto}</p>
                <p className="text-white/90 text-sm font-semibold pt-2">Aplicações:</p>
                <ul className="space-y-1 text-sm text-white/85">
                  {serie03.aplicacoes.map((a, i) => (
                    <li key={i}>– {a}</li>
                  ))}
                </ul>
                <p className="text-white/90 text-sm italic pt-2">Objetivo: {serie03.objetivo}</p>
              </>
            ),
          },
        ].map((block, index) => (
          <motion.div key={index} variants={child}>
            <Card
              className="border-white/15 bg-white/5 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-black/10"
            >
              <CardHeader>
                <CardTitle className="font-[var(--font-heading)] text-[var(--dourado-claro)] text-lg">
                  {block.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">{block.content}</CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
