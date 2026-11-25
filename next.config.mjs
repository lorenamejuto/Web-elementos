/** @type {import('next').NextConfig} */

// Direcciones cortas impresas en los QR de las etiquetas.
// /m → perfumes y brumas (colección Memorias) · /h → línea hogar.
// Son temporales (307) a propósito: así se puede cambiar el destino
// más adelante sin reimprimir etiquetas. No pasarlas a permanent: true.
// Se cubren mayúsculas y minúsculas porque el QR codifica "/M" y "/H".
const destinosQR = {
  m: '/?utm_source=qr&utm_medium=etiqueta&utm_campaign=memorias#nicho',
  h: '/?utm_source=qr&utm_medium=etiqueta&utm_campaign=hogar#hogar',
}

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  redirects() {
    return Object.entries(destinosQR).flatMap(([clave, destino]) =>
      [clave, clave.toUpperCase()].map((ruta) => ({
        source: `/${ruta}`,
        destination: destino,
        permanent: false,
      })),
    )
  },
}

export default nextConfig
