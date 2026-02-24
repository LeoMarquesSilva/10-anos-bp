import { useState } from 'react'
import { motion } from 'motion/react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const links = [
  { id: 'hero', label: 'Início' },
  { id: 'visao', label: 'Visão' },
  { id: 'bloco01', label: 'Identidade' },
  { id: 'cronograma', label: 'Cronograma' },
  { id: 'bloco02', label: 'Marketing Digital' },
  { id: 'bloco03', label: 'Audiovisual' },
  { id: 'bloco04', label: 'Evento' },
  { id: 'aplicacoes', label: 'Aplicações' },
  { id: 'orcamentos', label: 'Orçamentos' },
]

function NavLinks({
  onClick,
  linkClassName,
}: {
  onClick?: () => void
  linkClassName?: string
}) {
  return (
    <>
      {links.map(({ id, label }) => (
        <li key={id}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'text-white/85 hover:text-white hover:bg-white/10 rounded-full px-4 transition-colors duration-200',
              linkClassName
            )}
            asChild
          >
            <a href={`#${id}`} onClick={onClick}>
              {label}
            </a>
          </Button>
        </li>
      ))}
    </>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 28 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#101f2e]/95 backdrop-blur-lg"
      >
        <nav
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 md:px-6"
          aria-label="Navegação principal"
        >
          {/* Logo: selo (referência: logo à esquerda) */}
          <a
            href="#hero"
            className="flex-shrink-0 flex items-center gap-2 rounded-full transition-opacity hover:opacity-90"
            aria-label="Ir para o início"
          >
            <img
              src="/teste-selo-png-azul.png"
              alt=""
              className="h-9 w-auto md:h-10"
            />
          </a>

          {/* Desktop: links centralizados */}
          <ul className="hidden md:flex items-center justify-center gap-0.5 flex-1">
            <NavLinks linkClassName="!text-sm" />
          </ul>

          {/* CTA desktop: pill à direita (referência: Sign up) */}
          <div className="hidden md:block flex-shrink-0">
            <Button
              asChild
              size="sm"
              className="rounded-full bg-white/15 text-white border border-white/25 hover:bg-[var(--dourado)] hover:text-[#101f2e] hover:border-[var(--dourado)] font-medium px-5 transition-colors duration-200"
            >
              <a href="#orcamentos">Orçamentos</a>
            </Button>
          </div>

          {/* Mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10 rounded-full"
                aria-label="Abrir menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-[#101f2e] border-white/10"
            >
              <SheetHeader>
                <SheetTitle className="text-white uppercase text-base" style={{ fontFamily: 'var(--font-heading)' }}>
                  Menu
                </SheetTitle>
              </SheetHeader>
              <ul className="mt-8 flex flex-col gap-0.5">
                <NavLinks onClick={() => setOpen(false)} />
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <Button
                  asChild
                  className="w-full rounded-full bg-white/15 text-white border border-white/25 hover:bg-[var(--dourado)] hover:text-[#101f2e]"
                >
                  <a href="#orcamentos" onClick={() => setOpen(false)}>
                    Ver orçamentos
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </motion.header>
    </>
  )
}
