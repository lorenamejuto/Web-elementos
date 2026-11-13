// Catálogo ELEMENTOS, organizado en dos mundos.
// Las notas están tomadas tal cual de las etiquetas de cada producto.
// Para sumar la historia de una creación, completar `relato` (no inventar: si no existe, dejarlo vacío).

export type Producto = {
  nombre: string
  notas: string
  formato: string
  color: string
  imagen: string
  relato?: string
}

export type Linea = {
  titulo: string
  descripcion: string
  productos: Producto[]
}

// Una colección atraviesa los dos mundos: cada mundo lista sus líneas por colección.
// Una colección sin productos no se muestra; las pestañas aparecen solo cuando hay más de una con productos.
export type Coleccion = {
  id: string
  nombre: string
  lineas: Linea[]
}

export type Mundo = {
  id: string
  nombre: string
  colecciones: Coleccion[] // en orden de aparición: la más nueva primero
}

export const COLECCIONES = {
  memorias: { id: 'memorias', nombre: 'Memorias' },
  mistica: { id: 'mistica', nombre: 'La Mística de lo Esotérico' },
}

export const perfumeriaDeNicho: Mundo = {
  id: 'nicho',
  nombre: 'Perfumería de nicho',
  colecciones: [
    {
      ...COLECCIONES.memorias,
      // Próximamente: completar productos. Mientras ninguna línea tenga productos, la pestaña muestra "Próximamente".
      lineas: [
        { titulo: 'Perfumes', descripcion: '', productos: [] },
        { titulo: 'Brumas', descripcion: '', productos: [] },
      ],
    },
    {
      ...COLECCIONES.mistica,
      lineas: [
        {
          titulo: 'Perfumes',
          descripcion: 'Composiciones de autor para llevar sobre la piel.',
          productos: [
            { nombre: 'Divino Tesoro', notas: 'Bergamota, jazmín, patchouli', formato: 'Perfume', color: '#884538', imagen: '/img/divino-tesoro.jpg' },
            { nombre: 'Éxtasis', notas: 'Iso E Super, pomelo, oud', formato: 'Perfume', color: '#b42630', imagen: '/img/extasis.jpg' },
            { nombre: 'Ritual', notas: 'Guayaba, flores blancas, miel', formato: 'Perfume', color: '#997b4b', imagen: '/img/ritual.jpg' },
            { nombre: 'Dharma', notas: 'Jazmín, bouquet, cardamomo', formato: 'Perfume', color: '#e67f4c', imagen: '/img/dharma.jpg' },
            { nombre: 'Presagio', notas: 'Orquídea, jengibre', formato: 'Perfume', color: '#556b31', imagen: '/img/presagio.jpg' },
            { nombre: 'Eclipse', notas: 'Caramelo salado, cardamomo', formato: 'Perfume', color: '#8f8d8d', imagen: '/img/eclipse.jpg' },
          ],
        },
        {
          titulo: 'Brumas',
          descripcion: 'Más livianas, para usar en cualquier momento del día.',
          productos: [
            { nombre: 'Mantra', notas: 'Açaí, pepino, melón', formato: 'Bruma · 100 ml', color: '#521776', imagen: '/img/mantra.webp' },
            { nombre: 'Verdalia', notas: 'Bambú, petitgrain', formato: 'Bruma · 100 ml', color: '#556b31', imagen: '/img/verdalia.webp' },
            { nombre: 'Alquimia', notas: 'Rosa búlgara, sándalo', formato: 'Bruma · 100 ml', color: '#823039', imagen: '/img/alquimia.webp' },
          ],
        },
      ],
    },
  ],
}

export const perfumeriaHogar: Mundo = {
  id: 'hogar',
  nombre: 'Perfumería para el hogar',
  colecciones: [
    {
      ...COLECCIONES.memorias,
      // Próximamente: completar productos. Mientras ninguna línea tenga productos, la pestaña muestra "Próximamente".
      lineas: [
        { titulo: 'Home spray', descripcion: '', productos: [] },
        { titulo: 'Jabón líquido', descripcion: '', productos: [] },
        { titulo: 'Difusores', descripcion: '', productos: [] },
      ],
    },
    {
      ...COLECCIONES.mistica,
      lineas: [
        {
          titulo: 'Difusores',
          descripcion: 'Un aroma constante que acompaña el espacio.',
          productos: [
            { nombre: 'Calma', notas: 'Mango y maracuyá', formato: 'Difusor', color: '#b42630', imagen: '/img/calma.jpg' },
            { nombre: 'Brisa', notas: 'Ananá y notas verdes', formato: 'Difusor', color: '#556b31', imagen: '/img/brisa.jpg' },
            { nombre: 'Nostalgia', notas: 'Lavanda e higo', formato: 'Difusor', color: '#521776', imagen: '/img/nostalgia.jpg' },
          ],
        },
        {
          titulo: 'Perfuminas',
          descripcion: 'Para perfumar ambientes y textiles en el momento.',
          productos: [
            { nombre: 'Secreto', notas: 'Fougère, cardamomo, violetas', formato: 'Perfumina · 250 ml', color: '#012060', imagen: '/img/secreto.webp' },
            { nombre: 'Raíces', notas: 'Té, lavanda', formato: 'Perfumina · 250 ml', color: '#717bb7', imagen: '/img/raices.webp' },
            { nombre: 'Revelación', notas: 'Vainilla, neroli', formato: 'Perfumina · 250 ml', color: '#6a8c9a', imagen: '/img/revelacion.webp' },
          ],
        },
      ],
    },
  ],
}

// Si un campo queda vacío, el sitio no muestra el enlace.
export const contacto = {
  tienda: 'https://elementoscosmetica.mitiendanube.com/',
  instagram: 'https://www.instagram.com/elementoscosmetica/',
  whatsapp: '', // ej: 'https://wa.me/549XXXXXXXXXX'
  email: 'elementoscosmetica.tienda@gmail.com',
}
