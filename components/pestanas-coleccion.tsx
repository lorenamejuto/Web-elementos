'use client'

import { useId, useRef, useState } from 'react'

type Pestana = { id: string; nombre: string; proximamente?: boolean; contenido: React.ReactNode }

// Pestañas accesibles (teclado con flechas). Los paneles inactivos quedan en el HTML con `hidden`, así Google los indexa igual.
export function PestanasColeccion({ pestanas, acento }: { pestanas: Pestana[]; acento: string }) {
  // Arranca en la primera colección con productos, para no recibir al visitante con una pestaña vacía.
  const [activa, setActiva] = useState(() => Math.max(0, pestanas.findIndex((p) => !p.proximamente)))
  const base = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  if (pestanas.length === 1) return <>{pestanas[0].contenido}</>

  const mover = (e: React.KeyboardEvent, i: number) => {
    const destino = e.key === 'ArrowRight' ? (i + 1) % pestanas.length : e.key === 'ArrowLeft' ? (i - 1 + pestanas.length) % pestanas.length : null
    if (destino === null) return
    e.preventDefault()
    setActiva(destino)
    refs.current[destino]?.focus()
  }

  return (
    <div>
      <div role="tablist" aria-label="Colecciones" className="-mt-4 mb-14 flex flex-wrap gap-x-8 gap-y-5 lg:mb-16 lg:gap-x-12">
        {pestanas.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            role="tab"
            id={`${base}-tab-${p.id}`}
            aria-selected={i === activa}
            aria-controls={`${base}-panel-${p.id}`}
            tabIndex={i === activa ? 0 : -1}
            onClick={() => setActiva(i)}
            onKeyDown={(e) => mover(e, i)}
            className={`border-b-2 pb-3 text-left transition-colors ${i === activa ? `border-current ${acento}` : 'border-transparent text-tinta/45 hover:text-misterio'}`}
          >
            <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.24em] lg:text-[11px]">
              Colección{p.proximamente && <span className="ml-2 bg-oro/15 px-1.5 py-0.5 text-oro">Próximamente</span>}
            </span>
            <span className="mt-1.5 block font-display text-xl sm:text-2xl lg:text-[1.75rem]">{p.nombre}</span>
          </button>
        ))}
      </div>
      {pestanas.map((p, i) => (
        <div key={p.id} role="tabpanel" id={`${base}-panel-${p.id}`} aria-labelledby={`${base}-tab-${p.id}`} hidden={i !== activa}>
          {p.contenido}
        </div>
      ))}
    </div>
  )
}
