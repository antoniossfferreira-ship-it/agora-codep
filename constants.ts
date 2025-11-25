import { TrainingAxis, Methodology } from './types';

export const TRAINING_AXES: TrainingAxis[] = [
  {
    id: 'eixo1',
    title: 'Eixo 1 — Gestão Administrativa e Operacional',
    description: 'Foco em arquivos, fluxos, compras e legislação.',
    topics: [
      'Gestão de arquivos e documentação',
      'Fluxos administrativos padronizados',
      'Compras públicas e nova lei de licitações (Lei 14.133/2021)',
      'Gestão orçamentária básica',
      'Gestão de contratos',
      'Ética e responsabilidade administrativa',
      'LAI (Lei de Acesso à Informação)'
    ]
  },
  {
    id: 'eixo2',
    title: 'Eixo 2 — Gestão Acadêmica',
    description: 'Processos ligados à vida acadêmica e registros.',
    topics: [
      'Matrícula e rematrícula',
      'Registro acadêmico',
      'Currículo, PPCs e resoluções internas',
      'Normas acadêmicas e calendários',
      'Sigaa / sistemas institucionais'
    ]
  },
  {
    id: 'eixo3',
    title: 'Eixo 3 — Tecnologias e Transformação Digital',
    description: 'Modernização e ferramentas digitais.',
    topics: [
      'Excel avançado',
      'Automação administrativa',
      'Digitalização de processos',
      'Segurança da informação',
      'Introdução à programação aplicada à gestão'
    ]
  },
  {
    id: 'eixo4',
    title: 'Eixo 4 — Comunicação e Relacionamento',
    description: 'Melhoria no atendimento e clima organizacional.',
    topics: [
      'Redação oficial e institucional',
      'Comunicação interna efetiva',
      'Atendimento humanizado',
      'Gestão de conflitos',
      'Cultura organizacional'
    ]
  },
  {
    id: 'eixo5',
    title: 'Eixo 5 — Desenvolvimento Humano',
    description: 'Competências comportamentais e liderança.',
    topics: [
      'Trabalho colaborativo',
      'Planejamento e organização',
      'Liderança para chefias',
      'Inteligência emocional e bem-estar laboral'
    ]
  }
];

export const METHODOLOGIES: string[] = [
  Methodology.PRESENTIAL,
  Methodology.EAD,
  Methodology.WORKSHOPS,
  Methodology.WEBINARS,
  Methodology.MENTORSHIP,
  Methodology.MANUALS
];

// Mock data for the dashboard visualization
export const MOCK_STATS_AXES = [
  { name: 'Gestão Admin', value: 45 },
  { name: 'Gestão Acadêmica', value: 30 },
  { name: 'Tecnologias', value: 65 },
  { name: 'Comunicação', value: 25 },
  { name: 'Desenv. Humano', value: 35 },
];

export const MOCK_STATS_METHODOLOGY = [
  { name: 'Presencial', value: 40 },
  { name: 'EAD / Híbrido', value: 80 },
  { name: 'Mentoria', value: 20 },
  { name: 'Oficinas', value: 55 },
];