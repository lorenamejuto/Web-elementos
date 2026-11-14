import Image from 'next/image'
import { FlaskConical, GraduationCap, ShieldCheck } from 'lucide-react'
import { MenuMovil } from '@/components/menu-movil'
import { INGREDIENTES, textoNotas, type IngredienteId } from '@/lib/ingredientes'
import { PestanasColeccion } from '@/components/pestanas-coleccion'
import { PortadaRotativa } from '@/components/portada-rotativa'
import { contacto, perfumeriaDeNicho, perfumeriaHogar, type Linea, type Mundo, type Producto } from '@/lib/catalogo'

const nav = [
  { href: '#nicho', label: 'Perfumería de nicho' },
  { href: '#hogar', label: 'Hogar' },
  { href: '#laboratorio', label: 'Laboratorio' },
  { href: '#nosotras', label: 'Nosotras' },
]

// Todos los perfumes del catálogo (cualquier colección) rotan en la portada.
const perfumesDeCatalogo = perfumeriaDeNicho.colecciones.flatMap((c) => c.lineas.flatMap((l) => l.productos)).filter((p) => p.formato.startsWith('Perfume'))

const elementosDeUnaCreacion = ['Una materia prima', 'Una memoria', 'Una emoción', 'Una imagen', 'Una textura', 'Un lugar', 'Una idea', 'Una técnica', 'Dos miradas diferentes']

function Etiqueta({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-sans text-[11px] font-semibold uppercase tracking-[0.28em] lg:text-[13px] ${className}`}>{children}</p>
}

// Título de cada sección principal: el nombre del mundo, grande y en su color, para que cada sección se distinga de un vistazo.
function Capitulo({ nombre, acento }: { nombre: string; acento: string }) {
  return <h2 className={`mb-8 font-display text-[clamp(2.55rem,5.95vw,5.5rem)] italic leading-[0.95] tracking-[-0.02em] lg:mb-10 ${acento}`}>{nombre}</h2>
}

function Marca({ claro = false }: { claro?: boolean }) {
  return (
    <a href="#inicio" className="flex shrink-0 items-center gap-3" aria-label="ELEMENTOS — Universo Olfativo, ir al inicio">
      <Image src={claro ? '/img/logo-elementos-claro.png' : '/img/logo-elementos.png'} alt="" width={44} height={44} priority />
      <span className="flex flex-col leading-none">
        <span className={`font-sans text-[15px] font-medium tracking-[0.32em] ${claro ? 'text-papel' : 'text-misterio'}`}>ELEMENTOS</span>
        <span className={`mt-1.5 font-serif text-[12px] italic ${claro ? 'text-papel/70' : 'text-oro'}`}>Universo Olfativo</span>
      </span>
    </a>
  )
}

function Encabezado() {
  return (
    <header className="sticky top-0 z-30 border-b border-tinta/10 bg-papel/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3 lg:px-12">
        <Marca />
        <nav className="hidden items-center gap-6 whitespace-nowrap font-sans text-[11px] font-semibold uppercase tracking-[0.2em] lg:flex xl:gap-10 xl:tracking-[0.24em]" aria-label="Navegación principal">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-extasis">{item.label}</a>
          ))}
          <a href="#contacto" className="transition-colors hover:text-extasis">Contacto</a>
          {contacto.tienda && <a href={contacto.tienda} target="_blank" rel="noreferrer" className="bg-misterio px-4 py-2.5 text-papel transition-colors hover:bg-extasis">Tienda</a>}
        </nav>
        <MenuMovil items={[...nav, { href: '#contacto', label: 'Contacto' }, ...(contacto.tienda ? [{ href: contacto.tienda, label: 'Tienda online ↗' }] : [])]} />
      </div>
    </header>
  )
}

function Portada() {
  return (
    <section id="inicio" className="relative overflow-hidden px-5 pb-20 pt-12 lg:px-12 lg:pb-28 lg:pt-16">
      <div className="pointer-events-none absolute -right-40 top-10 h-[640px] w-[640px] rounded-full border border-oro/25 lg:h-[860px] lg:w-[860px]" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="relative z-10">
          <Etiqueta className="elevar text-extasis">Perfumería de nicho · Hecho en Argentina</Etiqueta>
          <h1 className="elevar elevar-2 mt-7 font-display text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.03em] text-misterio">
            Convertir<br />lo invisible<br /><em className="text-extasis">en aroma.</em>
          </h1>
          <p className="elevar elevar-3 mt-9 max-w-lg font-serif text-lg leading-relaxed text-tinta/80 lg:text-xl">
            ELEMENTOS es perfumería de nicho independiente, creada en Argentina por dos miradas distintas que encontraron un lenguaje común. Formulamos perfumes, brumas corporales, difusores y perfuminas en nuestro laboratorio, y cada creación nace de su propio proceso: una memoria, una materia prima o una emoción que buscamos llevar al aroma.
          </p>
          <div className="elevar elevar-3 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#nicho" className="bg-misterio px-7 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-papel transition-colors hover:bg-extasis">Conocer las fragancias</a>
            {contacto.tienda && <a href={contacto.tienda} target="_blank" rel="noreferrer" className="border border-misterio px-7 py-[15px] font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-misterio transition-colors hover:bg-misterio hover:text-papel">Comprar online ↗</a>}
            <a href="#nosotras" className="border-b border-misterio pb-1 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-misterio transition-colors hover:border-extasis hover:text-extasis">Quiénes somos</a>
          </div>
        </div>
        <PortadaRotativa perfumes={perfumesDeCatalogo} />
      </div>
    </section>
  )
}

function Territorio() {
  const items = [
    { titulo: 'Perfumería de nicho', detalle: 'Perfumes · Brumas', href: '#nicho', color: 'bg-extasis' },
    { titulo: 'Perfumería para el hogar', detalle: 'Difusores · Perfuminas', href: '#hogar', color: 'bg-presagio' },
    { titulo: 'Laboratorio', detalle: 'Materias primas · Experimentación', href: '#laboratorio', color: 'bg-ritual' },
  ]
  return (
    <section aria-label="El universo ELEMENTOS" className="border-y border-tinta/15 bg-arena px-5 lg:px-12">
      <div className="mx-auto grid max-w-[1440px] divide-y divide-tinta/15 md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <a key={item.titulo} href={item.href} className="group flex items-center justify-between gap-6 py-7 md:px-8 md:first:pl-0">
            <span>
              <span className="flex items-center gap-3 font-display text-2xl text-misterio">
                <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} aria-hidden="true" />{item.titulo}
              </span>
              <span className="mt-1 block pl-[22px] font-sans text-[11px] uppercase tracking-[0.2em] text-tinta/60">{item.detalle}</span>
            </span>
            <span className="font-sans text-lg text-misterio transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </section>
  )
}

function IconoIngrediente({ id }: { id: IngredienteId }) {
  const url = `url(/ingredientes/${INGREDIENTES[id].icono}.svg) center / contain no-repeat`
  // El ícono se pinta con el color de fondo a través de una máscara CSS sobre el SVG.
  return <span aria-hidden="true" className="size-7 shrink-0 bg-oro-oscuro" style={{ mask: url, WebkitMask: url }} />
}

// Perfumes: notas en tres niveles (salida, corazón, base), con ícono. Un nivel vacío no se muestra.
function Piramide({ piramide }: { piramide: NonNullable<Producto['piramide']> }) {
  const niveles = [
    { titulo: 'Salida', ids: piramide.salida },
    { titulo: 'Corazón', ids: piramide.corazon },
    { titulo: 'Base', ids: piramide.base },
  ].filter((n) => n.ids.length > 0)
  return (
    <dl className="mt-4 space-y-2.5">
      {niveles.map((n) => (
        <div key={n.titulo} className="grid grid-cols-[4.75rem_1fr] items-center gap-3">
          <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-tinta/50">{n.titulo}</dt>
          <dd className="flex flex-wrap gap-x-5 gap-y-1.5">
            {n.ids.map((id) => (
              <span key={id} className="flex items-center gap-1.5 font-serif text-[0.95rem] italic text-tinta/75">
                <IconoIngrediente id={id} />
                {INGREDIENTES[id].nombre}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  )
}

// Resto de los productos: notas en texto, como en la etiqueta.
function notasEnTexto(ids: IngredienteId[]) {
  return ids.map((id, i) => (i === 0 || id === 'iso-e-super' ? INGREDIENTES[id].nombre : INGREDIENTES[id].nombre.toLowerCase())).join(', ')
}

function TarjetaProducto({ producto, indice }: { producto: Producto; indice: number }) {
  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-arena">
        <Image src={producto.imagen} alt={`${producto.nombre}, ${producto.formato.toLowerCase()} ELEMENTOS con notas de ${textoNotas(producto.notas)}`} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        <span className="absolute left-4 top-4 bg-papel/90 px-2.5 py-1 font-sans text-[10px] font-semibold tracking-[0.2em] text-tinta">{String(indice + 1).padStart(2, '0')}</span>
      </div>
      <div className="mt-5 border-t-2 pt-4" style={{ borderColor: producto.color }}>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-[1.75rem] leading-tight text-misterio">{producto.nombre}</h3>
          <span className="shrink-0 font-sans text-[10px] uppercase tracking-[0.2em] text-tinta/50">{producto.formato}</span>
        </div>
        {producto.piramide ? <Piramide piramide={producto.piramide} /> : <p className="mt-2 font-serif text-base italic text-tinta/75">{notasEnTexto(producto.notas)}</p>}
        {producto.relato && <p className="mt-3 font-serif text-base leading-relaxed text-tinta/80">{producto.relato}</p>}
      </div>
    </article>
  )
}

function Lineas({ lineas }: { lineas: Linea[] }) {
  return (
    <div className="space-y-20">
      {lineas
        .filter((l) => l.productos.length > 0)
        .map((linea) => (
          <div key={linea.titulo} className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h3 className="font-display text-[clamp(2.25rem,3.4vw,3rem)] leading-[1.05] italic text-misterio">{linea.titulo}</h3>
              <p className="mt-3 max-w-xs font-serif text-base leading-relaxed text-tinta/70 lg:text-lg">{linea.descripcion}</p>
            </div>
            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
              {linea.productos.map((producto, i) => <TarjetaProducto key={producto.nombre} producto={producto} indice={i} />)}
            </div>
          </div>
        ))}
    </div>
  )
}

function Proximamente({ nombre, lineas }: { nombre: string; lineas: Linea[] }) {
  return (
    <div className="border border-dashed border-tinta/25 px-6 py-16 text-center lg:py-24">
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-oro lg:text-[13px]">Nueva colección · Próximamente</p>
      <p className="mt-5 font-display text-[clamp(2.25rem,4vw,3.5rem)] italic leading-tight text-misterio">{nombre}</p>
      {lineas.length > 0 && <p className="mt-4 font-serif text-lg text-tinta/70">{lineas.map((l) => l.titulo).join(' · ')}</p>}
    </div>
  )
}

function SeccionMundo({ mundo, titulo, intro, acento }: { mundo: Mundo; titulo: React.ReactNode; intro: string; acento: string }) {
  return (
    <section id={mundo.id} className="px-5 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Capitulo nombre={mundo.nombre} acento={acento} />
        <div className="mb-16 grid gap-6 border-b border-tinta/20 pb-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.1] text-misterio">{titulo}</p>
          </div>
          <p className="max-w-md font-serif text-lg leading-relaxed text-tinta/75 lg:justify-self-end">{intro}</p>
        </div>
        <PestanasColeccion
          acento={acento}
          pestanas={mundo.colecciones
            .map((c) => {
              const proximamente = !c.lineas.some((l) => l.productos.length > 0)
              return { id: c.id, nombre: c.nombre, proximamente, contenido: proximamente ? <Proximamente nombre={c.nombre} lineas={c.lineas} /> : <Lineas lineas={c.lineas} /> }
            })}
        />
      </div>
    </section>
  )
}

function Relato() {
  return (
    <section aria-labelledby="relato-titulo" className="bg-misterio px-5 py-24 text-papel lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
        <div>
          <Etiqueta className="text-dharma">El nombre</Etiqueta>
          <h2 id="relato-titulo" className="mt-6 font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[1] tracking-[-0.02em]">
            Los elementos de una creación<em className="text-dharma"> no siempre se ven.</em>
          </h2>
          <p className="mt-10 max-w-xl font-serif text-xl leading-relaxed text-papel/80">
            Nuestro nombre nació ligado a la naturaleza: tierra, fuego, aire, agua y éter. Con el tiempo entendimos que también son elementos todo lo que se encuentra para dar origen a algo nuevo.
          </p>
        </div>
        <ul className="self-end border-t border-papel/20">
          {elementosDeUnaCreacion.map((item, i) => (
            <li key={item} className="flex items-baseline gap-6 border-b border-papel/20 py-3.5">
              <span className="w-6 font-sans text-[10px] tracking-[0.2em] text-papel/40">{String(i + 1).padStart(2, '0')}</span>
              <span className={`font-display text-2xl ${i === elementosDeUnaCreacion.length - 1 ? 'italic text-dharma' : ''}`}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Laboratorio() {
  const pasos = ['Exploración', 'Pruebas', 'Encuentro', 'Discusión', 'Ajustes', 'Fórmula ELEMENTOS']
  const compromisos = [
    {
      icono: GraduationCap,
      titulo: 'Formación continua',
      texto: 'Empezamos con cursos y nunca dejamos de estudiar. Este año, Lore está terminando el Seminario Anual de Composición Olfativa y Caro se formó en cursos en Cracovia y Francia. Todo lo que aprendemos vuelve a nuestras creaciones.',
    },
    {
      icono: ShieldCheck,
      titulo: 'Normas IFRA',
      texto: 'Formulamos siguiendo los estándares de IFRA (International Fragrance Association), que definen qué materias primas pueden usarse y en qué concentraciones según cada tipo de producto.',
    },
    {
      icono: FlaskConical,
      titulo: 'Cuidado en cada producto',
      texto: 'Trabajamos solo con materias primas reguladas y seguras. Cada fórmula se prueba, se ajusta y se valida en el laboratorio antes de llegar a vos.',
    },
  ]
  return (
    <section id="laboratorio" className="border-y border-tinta/15 bg-arena px-5 py-24 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <Capitulo nombre="Laboratorio" acento="text-ritual" />
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.1] text-misterio">Aprender, formular,<br /><em>cuidar cada detalle.</em></p>
            <p className="mt-8 max-w-lg font-serif text-lg leading-relaxed text-tinta/80 lg:text-xl">
              Todo empezó con cursos, materias primas y los primeros acordes. Hoy el laboratorio es el centro de ELEMENTOS: ahí investigamos, comparamos, probamos y validamos cada creación.
            </p>
            <p className="mt-5 max-w-lg font-serif text-lg leading-relaxed text-tinta/80">
              Para nosotras, crear con libertad va de la mano de hacerlo con responsabilidad. Un perfume puede ser experimental en su idea, pero nunca en su seguridad.
            </p>
            <ol className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-misterio" aria-label="Nuestro proceso de creación">
              {pasos.map((paso, i) => (
                <li key={paso} className="flex items-center gap-3">
                  <span className={i === pasos.length - 1 ? 'bg-misterio px-3 py-1.5 text-papel' : ''}>{paso}</span>
                  {i < pasos.length - 1 && <span className="text-oro" aria-hidden="true">→</span>}
                </li>
              ))}
            </ol>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[2.1/1] overflow-hidden">
              <Image src="/img/laboratorio-2.jpg" alt="Mesa de laboratorio con frascos ámbar de materias primas" fill sizes="(min-width: 1024px) 50vw, 90vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src="/img/laboratorio-formulacion.jpg" alt="Oliendo una tira de prueba frente a la biblioteca de materias primas del laboratorio" fill sizes="(min-width: 1024px) 25vw, 45vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src="/img/laboratorio-1.jpg" alt="En el laboratorio, frente a la biblioteca de materias primas" fill sizes="(min-width: 1024px) 25vw, 45vw" className="object-cover object-[50%_58%]" />
            </div>
          </div>
        </div>

        <div className="mt-24 lg:mt-32">
          <div className="mb-10 flex flex-col gap-4 border-b border-tinta/20 pb-6 md:flex-row md:items-end md:justify-between">
            <h3 className="font-display text-[clamp(2.25rem,3.4vw,3rem)] leading-[1.05] text-misterio">Nuestro <em>compromiso</em></h3>
            <p className="max-w-md font-serif text-base leading-relaxed text-tinta/70">Lo que no negociamos, sin importar la creación.</p>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {compromisos.map(({ icono: Icono, titulo, texto }, i) => (
              <li key={titulo} className="flex flex-col border-t-2 border-oro bg-papel p-8 lg:p-10">
                <div className="flex items-center justify-between">
                  <Icono className="size-8 text-misterio" strokeWidth={1.25} aria-hidden="true" />
                  <span className="font-sans text-[11px] font-semibold tracking-[0.2em] text-oro">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="mt-8 font-display text-2xl text-misterio lg:text-[1.75rem]">{titulo}</h4>
                <p className="mt-4 font-serif text-base leading-relaxed text-tinta/80">{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Nosotras() {
  const perfiles = [
    {
      nombre: 'Lore',
      llega: 'Llega a un perfume desde una historia, una imagen o un recuerdo.',
      texto: 'Es quien pone en palabras el universo de ELEMENTOS. Investiga, busca referencias, ordena las ideas y construye el relato que acompaña cada creación. Para ella, la memoria y la emoción son materias primas tan importantes como las que están en el laboratorio.',
      aportes: ['Narrativa', 'Memoria y emoción', 'Conceptualización', 'Referencias', 'Imagen', 'Investigación'],
      hoy: 'Este año está terminando el Seminario Anual de Composición Olfativa.',
    },
    {
      nombre: 'Caro',
      llega: 'Llega a un perfume desde la materia prima, la fórmula y la sensación sobre la piel.',
      texto: 'Tiene una sensibilidad especial para el producto: busca perfumes únicos, interpreta y ajusta fórmulas hasta encontrar el equilibrio. Disfruta del contacto con quienes eligen ELEMENTOS, le encanta enseñar y tiene una perseverancia que empuja el proyecto hacia adelante.',
      aportes: ['Fórmulas y ajustes', 'Búsqueda de materias primas', 'Experiencia del cliente', 'Enseñanza', 'Perseverancia'],
      hoy: 'Este año se estuvo formando en cursos de perfumería en Cracovia y en Francia.',
    },
  ]
  const suenos = ['Seguir creando fragancias con identidad propia', 'Dar cursos y capacitaciones para compartir lo que aprendemos', 'Tener un espacio físico donde recibir a quienes nos eligen', 'Construir una trayectoria reconocida en la perfumería independiente']
  return (
    <section id="nosotras" className="px-5 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Capitulo nombre="Nosotras" acento="text-extasis" />
        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-24">
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src="/img/creadoras.jpg" alt="Lore y Caro junto a la mesa de perfumes de ELEMENTOS al aire libre" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-5 -right-5 -z-10 h-full w-full border border-oro/50" aria-hidden="true" />
          </div>
          <div>
            <p className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.1] text-misterio">Dos miradas,<br /><em>un lenguaje común.</em></p>
            <div className="mt-8 max-w-xl space-y-5 font-serif text-lg leading-relaxed text-tinta/80">
              <p>
                ELEMENTOS nació antes que la marca. Nos encontramos desde una curiosidad compartida por la perfumería y, al acercarnos a ese mundo, descubrimos algo que no esperábamos: podíamos crear juntas.
              </p>
              <p>
                Llegamos con gustos distintos, referencias distintas y maneras distintas de interpretar un aroma. En lugar de buscar que esas diferencias desaparecieran, aprendimos a hacerlas convivir. Primero vinieron los cursos, las materias primas y los primeros acordes; después, probar, comparar, investigar y volver a formular, una y otra vez.
              </p>
              <p>
                En ese ir y venir apareció un lenguaje propio. Lo que una propone, la otra lo transforma, y el resultado es algo que ninguna de las dos habría creado sola. De esa sinergia nació ELEMENTOS.
              </p>
            </div>
          </div>
        </div>

        <figure className="mx-auto my-24 max-w-4xl text-center lg:my-32">
          <Image src="/img/logo-elementos.png" alt="" width={48} height={48} className="mx-auto" />
          <blockquote className="mt-8 font-display text-[clamp(1.8rem,3.6vw,3rem)] italic leading-[1.2] text-misterio">
            “ELEMENTOS sería más pequeño y más monocromático sin la mirada de la otra.”
          </blockquote>
        </figure>

        <div className="grid gap-6 lg:grid-cols-2">
          {perfiles.map((p) => (
            <article key={p.nombre} className="flex flex-col bg-arena p-8 lg:p-12">
              <h3 className="font-display text-5xl italic text-misterio">{p.nombre}</h3>
              <p className="mt-5 font-serif text-xl leading-snug text-extasis">{p.llega}</p>
              <p className="mt-5 font-serif text-base leading-relaxed text-tinta/80 lg:text-lg">{p.texto}</p>
              <ul className="mt-7 flex flex-wrap gap-2" aria-label={`Lo que aporta ${p.nombre}`}>
                {p.aportes.map((a) => (
                  <li key={a} className="border border-tinta/20 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-tinta/70">{a}</li>
                ))}
              </ul>
              <div className="mt-auto pt-9">
                <div className="flex gap-4 border-t border-oro/60 pt-5">
                  <span className="shrink-0 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-oro">Hoy</span>
                  <p className="font-serif text-base italic leading-relaxed text-tinta/80">{p.hoy}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 grid gap-14 lg:mt-32 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Etiqueta className="text-oro">Lo que soñamos</Etiqueta>
            <h3 className="mt-5 font-display text-[clamp(2.25rem,3.4vw,3rem)] leading-[1.05] text-misterio">Un proyecto que crece<br /><em>sin perder por qué nació.</em></h3>
            <p className="mt-7 max-w-md font-serif text-lg leading-relaxed text-tinta/75">
              No buscamos solo vender productos. Queremos construir algo con identidad y recorrido, y seguir disfrutando de crear juntas.
            </p>
          </div>
          <div>
            <ol className="border-t border-tinta/20">
              {suenos.map((sueno, i) => (
                <li key={sueno} className="flex items-baseline gap-6 border-b border-tinta/20 py-5">
                  <span className="w-6 shrink-0 font-sans text-[10px] font-semibold tracking-[0.2em] text-oro">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-xl text-misterio lg:text-2xl">{sueno}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-extasis">Alegría · Amistad · Curiosidad · Ganas de crear</p>
          </div>
        </div>

        <div className="mx-auto mt-24 flex max-w-3xl items-start gap-5 bg-arena p-6 lg:p-8">
          <Image src="/img/logo-elementos.png" alt="" width={40} height={40} className="mt-1 shrink-0" />
          <p className="font-serif text-base leading-relaxed text-tinta/80">
            Antes nos conocían como <span className="italic">Elementos Cosmética</span>. No empezamos de cero: el nombre cambia porque el universo creció. Hoy somos <span className="font-sans text-[13px] font-semibold tracking-[0.2em] text-misterio">ELEMENTOS</span> <span className="italic text-oro">Universo Olfativo</span>.
          </p>
        </div>
      </div>
    </section>
  )
}

function Contacto() {
  const enlaces = [
    contacto.tienda && { href: contacto.tienda, label: 'Tienda online', detalle: 'elementoscosmetica.mitiendanube.com' },
    contacto.instagram && { href: contacto.instagram, label: 'Instagram', detalle: '@elementoscosmetica' },
    contacto.whatsapp && { href: contacto.whatsapp, label: 'WhatsApp' },
    contacto.email && { href: `mailto:${contacto.email}`, label: 'Email', detalle: contacto.email },
  ].filter(Boolean) as { href: string; label: string; detalle?: string }[]

  return (
    <footer id="contacto" className="bg-tinta px-5 pb-10 pt-24 text-papel lg:px-12 lg:pt-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <Etiqueta className="text-dharma">Contacto</Etiqueta>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">¿Querés conocer<br /><em className="text-dharma">las fragancias?</em></h2>
            <p className="mt-8 max-w-lg font-serif text-lg leading-relaxed text-papel/70">Encontrá todos nuestros productos en la tienda online, o escribinos y te contamos sobre cada creación y cómo elegir la tuya.</p>
          </div>
          {enlaces.length > 0 && (
            <ul className="flex min-w-0 flex-col border-t border-papel/20">
              {enlaces.map((e) => (
                <li key={e.href}>
                  <a href={e.href} target={e.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center justify-between gap-4 border-b border-papel/20 py-5 font-display text-xl transition-colors hover:text-dharma sm:text-2xl">
                    <span className="min-w-0">
                      {e.label}
                      {e.detalle && <span className="mt-1 block break-words font-sans text-[12px] tracking-[0.04em] text-papel/55">{e.detalle}</span>}
                    </span> <span aria-hidden="true" className="shrink-0 font-sans text-base">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-24 flex flex-col justify-between gap-6 border-t border-papel/15 pt-8 sm:flex-row sm:items-center">
          <Marca claro />
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-papel/45">© {new Date().getFullYear()} ELEMENTOS · Perfumería de nicho hecha en Argentina</p>
        </div>
      </div>
    </footer>
  )
}

export default function Page() {
  return (
    <>
      <Encabezado />
      <main>
        <Portada />
        <Territorio />
        <SeccionMundo
          mundo={perfumeriaDeNicho}
          acento="text-extasis"
          titulo={<>Cada perfume,<br /><em>su propio proceso.</em></>}
          intro="Ninguna fragancia nace de una fórmula repetida. Cada una empieza con una pregunta —¿qué queremos hacer sentir?— y se termina de definir en el encuentro entre las dos."
        />
        <Relato />
        <SeccionMundo
          mundo={perfumeriaHogar}
          acento="text-presagio"
          titulo={<>Aromas para<br /><em>los espacios.</em></>}
          intro="El mismo cuidado de la perfumería de nicho, llevado a los lugares que habitamos."
        />
        <Laboratorio />
        <Nosotras />
      </main>
      <Contacto />
    </>
  )
}
