// Librería de ingredientes: nombre visible + ícono (public/ingredientes/<icono>.svg).
// Varios ingredientes pueden compartir ícono (p. ej. "Rosa búlgara" usa el de rosa).
export const INGREDIENTES = {
  acai: { nombre: 'Açaí', icono: 'acai' },
  anana: { nombre: 'Ananá', icono: 'anana' },
  bambu: { nombre: 'Bambú', icono: 'bambu' },
  bergamota: { nombre: 'Bergamota', icono: 'bergamota' },
  bouquet: { nombre: 'Bouquet', icono: 'bouquet' },
  'caramelo-salado': { nombre: 'Caramelo salado', icono: 'caramelo-salado' },
  cardamomo: { nombre: 'Cardamomo', icono: 'cardamomo' },
  'flores-blancas': { nombre: 'Flores blancas', icono: 'flores-blancas' },
  fougere: { nombre: 'Fougère', icono: 'fougere' },
  guayaba: { nombre: 'Guayaba', icono: 'guayaba' },
  higo: { nombre: 'Higo', icono: 'higo' },
  'iso-e-super': { nombre: 'Iso E Super', icono: 'iso-e-super' },
  jazmin: { nombre: 'Jazmín', icono: 'jazmin' },
  jengibre: { nombre: 'Jengibre', icono: 'jengibre' },
  lavanda: { nombre: 'Lavanda', icono: 'lavanda' },
  mango: { nombre: 'Mango', icono: 'mango' },
  maracuya: { nombre: 'Maracuyá', icono: 'maracuya' },
  melon: { nombre: 'Melón', icono: 'melon' },
  miel: { nombre: 'Miel', icono: 'miel' },
  neroli: { nombre: 'Neroli', icono: 'neroli' },
  'notas-verdes': { nombre: 'Notas verdes', icono: 'notas-verdes' },
  orquidea: { nombre: 'Orquídea', icono: 'orquidea' },
  oud: { nombre: 'Oud', icono: 'oud' },
  patchouli: { nombre: 'Patchouli', icono: 'patchouli' },
  pepino: { nombre: 'Pepino', icono: 'pepino' },
  petitgrain: { nombre: 'Petitgrain', icono: 'petitgrain' },
  pomelo: { nombre: 'Pomelo', icono: 'pomelo' },
  rosa: { nombre: 'Rosa', icono: 'rosa' },
  'rosa-bulgara': { nombre: 'Rosa búlgara', icono: 'rosa' },
  sandalo: { nombre: 'Sándalo', icono: 'sandalo' },
  te: { nombre: 'Té', icono: 'te' },
  vainilla: { nombre: 'Vainilla', icono: 'vainilla' },
  violetas: { nombre: 'Violetas', icono: 'violeta' },
} as const

export type IngredienteId = keyof typeof INGREDIENTES

// "bergamota, jazmín y patchouli": para textos alternativos y lectores de pantalla.
export function textoNotas(ids: readonly IngredienteId[]) {
  const n = ids.map((id) => INGREDIENTES[id].nombre.toLowerCase())
  return n.length > 1 ? `${n.slice(0, -1).join(', ')} y ${n.at(-1)}` : (n[0] ?? '')
}
