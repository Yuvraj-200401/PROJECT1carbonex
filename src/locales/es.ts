export default {
  hero: {
    title1: 'Tokenizando el Carbono Azul',
    title2: 'con IA + Blockchain.',
    subtitle: 'CARBO-NEX es una plataforma descentralizada para verificar y tokenizar créditos de carbono azul. Usamos IA y blockchain para brindar transparencia, liquidez y confianza al mercado de carbono.',
    getStarted: 'Empezar',
    launchApp: 'Lanzar App',
    marketplace: 'Explorar Mercado',
  },
  stats: [
    {
        label: 'CO₂ Verificado (t)',
        description: 'Toneladas de CO₂ equivalente verificadas y tokenizadas a través de nuestra plataforma.'
    },
    {
        label: 'ONGs Incorporadas',
        description: 'Grupos de conservación globales que aprovechan CARBO-NEX para financiar sus proyectos.'
    },
    {
        label: 'Precisión de Verificación',
        description: 'La verificación impulsada por IA garantiza el más alto nivel de integridad de los datos.'
    }
  ],
  features: {
    title: 'Cómo Funciona',
    subtitle: 'Un flujo continuo desde la verificación hasta la monetización, basado en la confianza y la transparencia.',
    items: [
        {
            title: 'Verificación con IA',
            description: 'Sube imágenes de drones y datos del sitio. Nuestros modelos de IA analizan y verifican los datos según las directrices del NCCR, garantizando integridad y precisión.'
        },
        {
            title: 'Tokeniza Tu Impacto',
            description: 'Una vez verificados, tus créditos de carbono se acuñan como tokens únicos en la blockchain, creando un registro transparente e inmutable de tu impacto ambiental.'
        },
        {
            title: 'Mercado Líquido',
            description: 'Lista tus créditos tokenizados en nuestro mercado abierto. Conecta con compradores e inversores para financiar tus esfuerzos de conservación y escalar tu impacto.'
        }
    ]
  },
  footer: {
    copyright: '© {year} CARBO-NEX. Todos los derechos reservados.'
  }
} as const;
