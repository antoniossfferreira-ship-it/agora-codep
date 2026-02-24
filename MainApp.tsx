import React, { useMemo, useState } from 'react';
import { AppHeader } from './components/AppHeader.tsx';
import { IntroSection } from './components/IntroSection.tsx';
import { SurveyForm } from './components/SurveyForm.tsx';
import { ResultsDashboard } from './components/ResultsDashboard.tsx';
import { COMPETENCIES, COURSES, ROLE_PROFILES } from './constants';
import { RecommendationInput, RecommendationItem, RecommendationResult } from './types';

function buildRecommendation(input: RecommendationInput): RecommendationResult {
  const role = ROLE_PROFILES.find((item) => item.id === input.roleId) ?? ROLE_PROFILES[0];

  const gaps = Object.fromEntries(
    COMPETENCIES.map((competency) => {
      const target = role.requiredLevels[competency.id] ?? 3;
      const current = input.currentLevels[competency.id] ?? 1;
      return [competency.id, Math.max(0, target - current)];
    }),
  );

  const recommendations: RecommendationItem[] = COURSES.map((course) => {
    const coveredGaps = course.competencies.filter((competencyId) => (gaps[competencyId] ?? 0) > 0);

    const gapScore = coveredGaps.reduce((sum, competencyId) => sum + (gaps[competencyId] ?? 0), 0);
    const aderenciaCargo = coveredGaps.length / Math.max(1, course.competencies.length);
    const nivelAderente = course.level >= 3 ? 1 : 0.6;
    const score = gapScore * 0.55 + aderenciaCargo * 3 + nivelAderente * 2;

    const reasons = [
      `Atende ${coveredGaps.length} competência(s) com lacuna para o cargo ${role.family}.`,
      `Foco em: ${coveredGaps
        .map((id) => COMPETENCIES.find((item) => item.id === id)?.name)
        .filter(Boolean)
        .join(', ') || 'competências de manutenção'}.`,
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

function MainApp() {
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
}

export default MainApp;
