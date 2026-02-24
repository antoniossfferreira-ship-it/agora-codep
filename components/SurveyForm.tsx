import React, { useEffect, useMemo, useState } from 'react';
import { COMPETENCIES } from '../constants';
import { RecommendationInput, ServerProfile } from '../types';
import { Sparkles } from 'lucide-react';
import matrix from '../data/matriz_competencias_uneb.json';
import competenciesByFunction from '../data/competencias_por_funcao_uneb.json';
import unebStructure from '../data/uneb_structure.json';

interface SurveyFormProps {
  onComplete: (response: RecommendationInput) => void;
}

type FunctionMap = Record<string, { eixo_prioritario: string; competencias: Record<string, number> }>;
const functionMap = competenciesByFunction as FunctionMap;

const matrixCompetencies = new Set(
  Object.values(matrix).flatMap((eixo) => eixo.competencias),
);

const buildInitialLevels = () =>
  COMPETENCIES.reduce<Record<string, number>>((acc, competency) => {
    acc[competency.id] = 2;
    return acc;
  }, {});

const buildExpectedForFunction = (functionName: string) => {
  const expected = COMPETENCIES.reduce<Record<string, number>>((acc, competency) => {
    acc[competency.id] = 2;
    return acc;
  }, {});

  const mapping = functionMap[functionName];
  if (!mapping) return expected;

  Object.entries(mapping.competencias).forEach(([competencyId, level]) => {
    if (matrixCompetencies.has(competencyId) && expected[competencyId] !== undefined) {
      expected[competencyId] = level;
    }
  });

  return expected;
};

export const SurveyForm: React.FC<SurveyFormProps> = ({ onComplete }) => {
  const defaultFunction = unebStructure.funcoes[0] || Object.keys(functionMap)[0];

  const [profile, setProfile] = useState<ServerProfile>({
    role: unebStructure.cargos[0] || 'Técnico Universitário',
    function: defaultFunction,
    department: unebStructure.unidades[0] || '',
    campus: unebStructure.campi[0] || '',
  });

  const [formData, setFormData] = useState<RecommendationInput>({
    roleId: 'tecnico-administrativo',
    campus: profile.campus,
    unit: profile.department,
    currentLevels: buildInitialLevels(),
    learningGoals: '',
    expectedLevels: buildExpectedForFunction(defaultFunction),
    profile,
  });

  const expectedLevels = useMemo(
    () => buildExpectedForFunction(profile.function),
    [profile.function],
  );

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      campus: profile.campus,
      unit: profile.department,
      profile,
      expectedLevels,
      roleId: profile.role === 'Analista Universitário' ? 'analista-gestao' : 'tecnico-administrativo',
    }));
  }, [profile, expectedLevels]);

  const canSubmit = Boolean(profile.campus && profile.department && profile.function && profile.role);

  return (
    <form
      className="space-y-6 animate-fade-in"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onComplete({ ...formData, expectedLevels, profile });
      }}
    >
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-900">Perfil e análise de competências</h2>
        <p className="text-slate-600 mt-2">
          Selecione cargo/carreira, função e unidade para carregar automaticamente os níveis esperados.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Perfil</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <select
            className="rounded-xl border border-slate-300 px-4 py-3 bg-white"
            value={profile.role}
            onChange={(e) => setProfile((prev) => ({ ...prev, role: e.target.value }))}
          >
            {unebStructure.cargos.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <select
            className="rounded-xl border border-slate-300 px-4 py-3 bg-white"
            value={profile.function}
            onChange={(e) => setProfile((prev) => ({ ...prev, function: e.target.value }))}
          >
            {Object.keys(functionMap).map((fn) => (
              <option key={fn} value={fn}>
                {fn}
              </option>
            ))}
          </select>

          <select
            className="rounded-xl border border-slate-300 px-4 py-3 bg-white"
            value={profile.department}
            onChange={(e) => setProfile((prev) => ({ ...prev, department: e.target.value }))}
          >
            {unebStructure.unidades.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>

          <select
            className="rounded-xl border border-slate-300 px-4 py-3 bg-white"
            value={profile.campus}
            onChange={(e) => setProfile((prev) => ({ ...prev, campus: e.target.value }))}
          >
            {unebStructure.campi.map((campus) => (
              <option key={campus} value={campus}>
                {campus}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Nível atual por competência</h3>
        <div className="space-y-4">
          {COMPETENCIES.map((competency) => {
            const current = formData.currentLevels[competency.id];
            const target = expectedLevels[competency.id] ?? 2;

            return (
              <div key={competency.id} className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">{competency.name}</p>
                    <p className="text-xs text-slate-500">{competency.category} • alvo para a função: {target}</p>
                  </div>
                  <span className="text-sm font-medium text-blue-800">Nível atual: {current}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={current}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      currentLevels: {
                        ...prev.currentLevels,
                        [competency.id]: Number(e.target.value),
                      },
                    }))
                  }
                  className="w-full mt-3"
                />
              </div>
            );
          })}
        </div>

        <textarea
          className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3"
          rows={3}
          placeholder="Objetivos de aprendizagem (opcional)."
          value={formData.learningGoals}
          onChange={(e) => setFormData((prev) => ({ ...prev, learningGoals: e.target.value }))}
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white disabled:opacity-50"
      >
        <Sparkles className="h-5 w-5" />
        Gerar recomendações
      </button>
    </form>
  );
};
