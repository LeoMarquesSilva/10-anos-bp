import { type ReactNode } from 'react'
import { motion } from 'motion/react'
import styles from './Section.module.css'

export type SectionVariant = 'claro' | 'azul'

type SectionProps = {
  id: string
  variant?: SectionVariant
  children: ReactNode
  className?: string
  showSelo?: boolean
}

const SELO_URL = {
  claro: '/TESTE-SELO-PNG.png',
  azul: '/teste-selo-png-azul.png',
}

export function Section({ id, variant = 'claro', children, className = '', showSelo = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${styles[variant]} ${className}`}
      aria-labelledby={id}
    >
      {showSelo && (
        <motion.div
          className={styles.seloWrap}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 120, damping: 24 }}
        >
          <img
            src={SELO_URL[variant]}
            alt="Selo 10 Anos Bismarchi Pires"
            className={styles.selo}
          />
        </motion.div>
      )}
      <div className={styles.inner}>{children}</div>
    </section>
  )
}
