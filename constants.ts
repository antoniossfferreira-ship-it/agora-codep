import { CompetencyDefinition, Course, RoleProfile } from './types';

export const COMPETENCIES: CompetencyDefinition[] = [
  {
    id: 'proc-adm',
    name: 'Processos Administrativos',
    category: 'Técnica',
    description: 'Domínio de fluxos, protocolo, documentos e rotinas administrativas.',
  },
  {
    id: 'compras',
    name: 'Compras e Contratos Públicos',
    category: 'Técnica',
    description: 'Aplicação da Lei 14.133/2021 e gestão básica de contratos.',
  },
  {
    id: 'gestao-acad',
    name: 'Gestão Acadêmica',
    category: 'Técnica',
    description: 'Normas acadêmicas, registros e suporte a sistemas acadêmicos.',
  },
  {
    id: 'dados-digitais',
    name: 'Ferramentas Digitais e Dados',
    category: 'Técnica',
    description: 'Uso de planilhas, automação leve e segurança da informação.',
  },
  {
    id: 'atendimento',
    name: 'Atendimento e Comunicação Institucional',
    category: 'Comportamental',
    description: 'Comunicação clara, redação oficial e atendimento humanizado.',
  },
  {
    id: 'planejamento',
    name: 'Planejamento e Melhoria de Processos',
    category: 'Gestão',
    description: 'Priorização, gestão do trabalho e melhoria contínua.',
  },
];

export const ROLE_PROFILES: RoleProfile[] = [
  {
    id: 'tecnico-secretaria',
    label: 'Técnico Universitário — Secretaria Acadêmica',
    family: 'Técnico Universitário',
    requiredLevels: {
      'proc-adm': 4,
      compras: 2,
      'gestao-acad': 4,
      'dados-digitais': 3,
      atendimento: 4,
      planejamento: 3,
    },
  },
  {
    id: 'tecnico-administrativo',
    label: 'Técnico Universitário — Apoio Administrativo',
    family: 'Técnico Universitário',
    requiredLevels: {
      'proc-adm': 4,
      compras: 3,
      'gestao-acad': 2,
      'dados-digitais': 3,
      atendimento: 3,
      planejamento: 3,
    },
  },
  {
    id: 'analista-gestao',
    label: 'Analista Universitário — Gestão e Planejamento',
    family: 'Analista Universitário',
    requiredLevels: {
      'proc-adm': 4,
      compras: 4,
      'gestao-acad': 3,
      'dados-digitais': 4,
      atendimento: 3,
      planejamento: 5,
    },
  },
];

export const COURSES: Course[] = [
  {
    id: 'curso-lei14133',
    title: 'Aplicação Prática da Lei 14.133/2021 na UNEB',
    modality: 'Híbrido',
    workloadHours: 30,
    competencies: ['compras', 'proc-adm', 'planejamento'],
    level: 4,
  },
  {
    id: 'curso-secretaria',
    title: 'Gestão Acadêmica e Registro Escolar',
    modality: 'EAD',
    workloadHours: 40,
    competencies: ['gestao-acad', 'proc-adm', 'atendimento'],
    level: 4,
  },
  {
    id: 'curso-dados',
    title: 'Excel Avançado e Indicadores para Gestão Universitária',
    modality: 'Presencial',
    workloadHours: 24,
    competencies: ['dados-digitais', 'planejamento'],
    level: 4,
  },
  {
    id: 'curso-atendimento',
    title: 'Atendimento Humanizado e Redação Oficial',
    modality: 'EAD',
    workloadHours: 20,
    competencies: ['atendimento', 'proc-adm'],
    level: 3,
  },
  {
    id: 'curso-melhoria',
    title: 'Mapeamento e Melhoria de Processos Administrativos',
    modality: 'Híbrido',
    workloadHours: 32,
    competencies: ['planejamento', 'proc-adm', 'dados-digitais'],
    level: 4,
  },
  {
    id: 'curso-lgpd',
    title: 'LGPD, Segurança da Informação e Governança de Dados',
    modality: 'EAD',
    workloadHours: 16,
    competencies: ['dados-digitais', 'proc-adm'],
    level: 3,
  },
];
