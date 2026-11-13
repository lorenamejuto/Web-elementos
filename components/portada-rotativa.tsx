'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { Producto } from '@/lib/catalogo'

const INTERVALO_MS = 5500

// Rota los perfumes del catálogo en la portada: la foto chica pasa a ser la grande en el siguiente ciclo.
// El primer par se renderiza en el servidor (sin parpadeo); el resto del orden se mezcla al montar.
export function PortadaRotativa({ perfumes }: { perfumes: Producto[] }) {
  const [orden, setOrden] = useState(perfumes)
  const [actual, setActual] = useState(0)
  const [cargadas, setCargadas] = useState(() => new Set([0, 1]))

  useEffect(() => {
    if (perfumes.length < 3) return
    const [primero, segundo, ...resto] = perfumes
    for (let i = resto.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[resto[i], resto[j]] = [resto[j], resto[i]]
    }
    setOrden([primero, segundo, ...resto])

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (document.hidden) return
      setActual((a) => (a + 1) % perfumes.length)
    }, INTERVALO_MS)
    return () => clearInterval(id)
  }, [perfumes])

  const n = orden.length
  const chica = (actual + 1) % n

  // Precarga solo la foto que viene, para no bajar todo el catálogo de entrada.
  useEffect(() => {
    setCargadas((prev) => (prev.has((actual + 2) % n) ? prev : new Set(prev).add((actual + 2) % n)))
  }, [actual, n])

  const alt = (p: Producto) => `Perfume ${p.nombre} de ELEMENTOS, con notas de ${p.notas.toLowerCase()}`

  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-arena">
        {orden.map((p, i) =>
          cargadas.has(i) ? (
            <Image
              key={p.nombre}
              src={p.imagen}
              alt={i === actual ? alt(p) : ''}
              aria-hidden={i !== actual}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 460px, 90vw"
              className={`object-cover transition-opacity duration-[1200ms] ease-out ${i === actual ? 'opacity-100' : 'opacity-0'}`}
            />
          ) : null,
        )}
      </div>
      <div className="absolute -bottom-8 left-0 w-[38%] overflow-hidden border-[6px] border-papel bg-arena shadow-xl sm:-left-12">
        <div className="relative aspect-[3/4]">
          {orden.map((p, i) =>
            cargadas.has(i) ? (
              <Image
                key={p.nombre}
                src={p.imagen}
                alt={i === chica ? alt(p) : ''}
                aria-hidden={i !== chica}
                fill
                sizes="180px"
                className={`object-cover transition-opacity duration-[1200ms] ease-out ${i === chica ? 'opacity-100' : 'opacity-0'}`}
              />
            ) : null,
          )}
        </div>
      </div>
      <p aria-live="off" className="absolute -right-2 bottom-6 hidden rotate-90 origin-bottom-right font-sans text-[10px] uppercase tracking-[0.3em] text-tinta/50 sm:block">
        {orden[actual].nombre} · {orden[chica].nombre}
      </p>
    </div>
  )
}
