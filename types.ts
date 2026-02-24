export interface CompetencyDefinition {
  id: string;
  name: string;
  category: 'Técnica' | 'Comportamental' | 'Gestão';
  description: string;
}

export interface RoleProfile {
  id: string;
  label: string;
  family: 'Técnico Universitário' | 'Analista Universitário';
  requiredLevels: Record<string, number>;
}

export interface Course {
  id: string;
  title: string;
  modality: 'EAD' | 'Presencial' | 'Híbrido';
  workloadHours: number;
  competencies: string[];
  level: number;
}

export interface RecommendationInput {
  roleId: string;
  campus: string;
  unit: string;
  currentLevels: Record<string, number>;
  learningGoals: string;
}

export interface RecommendationItem {
  course: Course;
  score: number;
  reasons: string[];
  coveredGaps: string[];
}

export interface RecommendationResult {
  input: RecommendationInput;
  role: RoleProfile;
  gaps: Record<string, number>;
  recommendations: RecommendationItem[];
}
