import React, { useMemo, useState } from 'react';
import { AppHeader } from './components/AppHeader.tsx';
import { IntroSection } from './components/IntroSection.tsx';
import { SurveyForm } from './components/SurveyForm.tsx';
import { ResultsDashboard } from './components/ResultsDashboard.tsx';
import { COMPETENCIES, COURSES, ROLE_PROFILES } from './constants';
import { RecommendationInput, RecommendationItem, RecommendationResult } from './types';
import competenciesByFunction from './data/competencias_por_funcao_uneb.json';

type FunctionMap = Record<string, { eixo_prioritario: string; competencias: Record<string, number> }>;
const functionMap = competenciesByFunction as FunctionMap;

function buildRecommendation(input: RecommendationInput): RecommendationResult {
  const role = ROLE_PROFILES.find((item) => item.id === input.roleId) ?? ROLE_PROFILES[0];
  const expected = input.expectedLevels ?? role.requiredLevels;

  const gaps = Object.fromEntries(
    COMPETENCIES.map((competency) => {
      const target = expected[competency.id] ?? 2;
      const current = input.currentLevels[competency.id] ?? 1;
      return [competency.id, Math.max(0, target - current)];
    }),
  );

  const functionData = input.profile ? functionMap[input.profile.function] : undefined;
  const preferredAxis = functionData?.eixo_prioritario;

  const recommendations: RecommendationItem[] = COURSES.map((course) => {
    const coveredGaps = course.competencies.filter((competencyId) => (gaps[competencyId] ?? 0) > 0);

    const gapScore = coveredGaps.reduce((sum, competencyId) => sum + (gaps[competencyId] ?? 0), 0);
    const aderenciaCargo = coveredGaps.length / Math.max(1, course.competencies.length);
    const nivelAderente = course.level >= 3 ? 1 : 0.6;
    const eixoBonus = preferredAxis && course.title.includes('Gestão') ? 0.5 : 0;
    const score = gapScore * 0.55 + aderenciaCargo * 3 + nivelAderente * 2 + eixoBonus;

    const reasons = [
      `Atende ${coveredGaps.length} competência(s) com lacuna para a função ${input.profile?.function ?? role.label}.`,
      `Foco em: ${coveredGaps
        .map((id) => COMPETENCIES.find((item) => item.id === id)?.name)
        .filter(Boolean)
        .join(', ') || 'competências de manutenção'}.`,
      `Eixo prioritário da função: ${preferredAxis ?? 'não informado'}.`,
      `Modalidade ${course.modality} com ${course.workloadHours}h para aplicação em serviço.`,
    ];

    return {
      course,
      score,
      reasons,
      coveredGaps,
    };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return { input, role, gaps, recommendations };
}

const App: React.FC = () => {
  const [viewState, setViewState] = useState<'intro' | 'analysis' | 'results'>('intro');
  const [inputData, setInputData] = useState<RecommendationInput | null>(null);

  const result = useMemo(() => (inputData ? buildRecommendation(inputData) : null), [inputData]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <AppHeader />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {viewState === 'intro' && <IntroSection onStart={() => setViewState('analysis')} />}

          {viewState === 'analysis' && (
            <SurveyForm
              onComplete={(response) => {
                setInputData(response);
                setViewState('results');
              }}
            />
          )}

          {viewState === 'results' && result && (
            <ResultsDashboard
              result={result}
              onReset={() => {
                setInputData(null);
                setViewState('intro');
              }}
            />
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2024 Universidade do Estado da Bahia - UNEB. Todos os direitos reservados.</p>
          <p className="mt-2">Protótipo de recomendação por competências • Técnicos e Analistas</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
