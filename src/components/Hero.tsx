import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section
      id="hero"
      className={styles.heroSection}
      aria-label="Apresentação 10 Anos"
    >
      <motion.div
        className={styles.heroGrid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 22 }}
      >
        <div className={styles.heroContent}>
          <motion.span
            className={styles.heroBadge}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Plano de Ação
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.15 }}
          >
            10 anos de trajetória
          </motion.h1>
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.25 }}
          >
            Uma década de excelência jurídica, confiança e resultados.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <a href="#visao" className={styles.heroCta}>
              Conhecer o plano
              <ChevronRight className="size-4" aria-hidden />
            </a>
          </motion.div>
        </div>
        <motion.div
          className={styles.heroSeloWrap}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 22, delay: 0.2 }}
        >
          <img
            src="/teste-selo-png-azul.png"
            alt="Selo 10 Anos – Bismarchi | Pires Sociedade de Advogados"
            className={styles.heroSelo}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
