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
              'text-white hover:bg-white/10 rounded-full px-4 transition-colors duration-200',
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
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/15 bg-[#101f2e]/98 backdrop-blur-xl"
      >
        <nav
          className="mx-auto flex h-14 md:h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-8"
          aria-label="Navegação principal"
        >
          <a
            href="#hero"
            className="flex-shrink-0 flex items-center rounded-full transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#101f2e]"
            aria-label="Ir para o início"
          >
            <img
              src="/teste-selo-png-azul.png"
              alt=""
              className="h-8 w-auto md:h-9"
            />
          </a>

          <ul className="hidden md:flex items-center justify-center gap-0.5 flex-1">
            <NavLinks linkClassName="!text-sm !text-white" />
          </ul>

          <div className="hidden md:block flex-shrink-0">
            <Button
              asChild
              size="sm"
              className="rounded-full bg-[var(--dourado)] !text-white border-0 hover:bg-[var(--dourado-claro)] hover:!text-white font-semibold px-5 h-9 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <a href="#orcamentos" className="!text-white">Orçamentos</a>
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10 rounded-full h-9 w-9"
                aria-label="Abrir menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] bg-[#101f2e] border-white/15"
            >
              <SheetHeader>
                <SheetTitle className="text-white text-lg uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
                  Menu
                </SheetTitle>
              </SheetHeader>
              <ul className="mt-8 flex flex-col gap-0.5">
                <NavLinks onClick={() => setOpen(false)} linkClassName="!text-white !justify-start" />
              </ul>
              <div className="mt-6 pt-6 border-t border-white/15">
                <Button
                  asChild
                  className="w-full rounded-full bg-[var(--dourado)] !text-white border-0 hover:bg-[var(--dourado-claro)] hover:!text-white font-semibold h-10"
                >
                  <a href="#orcamentos" onClick={() => setOpen(false)} className="!text-white">
                    Orçamentos
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
