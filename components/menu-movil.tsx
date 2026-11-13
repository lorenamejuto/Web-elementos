'use client'

import { useRef } from 'react'

export function MenuMovil({ items }: { items: { href: string; label: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null)
  return (
    <details ref={ref} className="group relative lg:hidden">
      <summary className="cursor-pointer list-none p-2 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-misterio">
        <span className="group-open:hidden">Menú</span>
        <span className="hidden group-open:inline">Cerrar</span>
      </summary>
      <nav className="absolute right-0 top-full mt-3 flex w-56 flex-col border border-tinta/10 bg-papel p-2 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] shadow-lg" aria-label="Navegación móvil">
        {items.map((item) => (
          <a key={item.href} href={item.href} {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})} onClick={() => ref.current?.removeAttribute('open')} className="px-4 py-3 hover:bg-arena">{item.label}</a>
        ))}
      </nav>
    </details>
  )
}
