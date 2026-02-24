import React, { useMemo, useState } from 'react';
import { COMPETENCIES, ROLE_PROFILES } from '../constants';
import { RecommendationInput } from '../types';
import { Sparkles } from 'lucide-react';

interface SurveyFormProps {
  onComplete: (response: RecommendationInput) => void;
}

const buildInitialLevels = () =>
  COMPETENCIES.reduce<Record<string, number>>((acc, competency) => {
    acc[competency.id] = 2;
    return acc;
  }, {});

export const SurveyForm: React.FC<SurveyFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<RecommendationInput>({
    roleId: ROLE_PROFILES[0].id,
    campus: '',
    unit: '',
    currentLevels: buildInitialLevels(),
    learningGoals: '',
  });

  const selectedRole = useMemo(
    () => ROLE_PROFILES.find((role) => role.id === formData.roleId) ?? ROLE_PROFILES[0],
    [formData.roleId],
  );

  const canSubmit = Boolean(formData.campus.trim() && formData.unit.trim());

  return (
    <form
      className="space-y-6 animate-fade-in"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onComplete(formData);
      }}
    >
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-900">Análise de competências por cargo</h2>
        <p className="text-slate-600 mt-2">
          Informe cargo/função e nível atual (1 a 5) para gerar recomendações de cursos aderentes
          às competências esperadas.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <select
          className="rounded-xl border border-slate-300 px-4 py-3 bg-white"
          value={formData.roleId}
          onChange={(e) => setFormData((prev) => ({ ...prev, roleId: e.target.value }))}
        >
          {ROLE_PROFILES.map((role) => (
            <option key={role.id} value={role.id}>
              {role.label}
            </option>
          ))}
        </select>

        <input
          className="rounded-xl border border-slate-300 px-4 py-3"
          placeholder="Campus"
          value={formData.campus}
          onChange={(e) => setFormData((prev) => ({ ...prev, campus: e.target.value }))}
        />

        <input
          className="rounded-xl border border-slate-300 px-4 py-3"
          placeholder="Unidade/Setor"
          value={formData.unit}
          onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Nível atual por competência</h3>
        <div className="space-y-4">
          {COMPETENCIES.map((competency) => {
            const current = formData.currentLevels[competency.id];
            const target = selectedRole.requiredLevels[competency.id] ?? 3;

            return (
              <div key={competency.id} className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">{competency.name}</p>
                    <p className="text-xs text-slate-500">{competency.category} • alvo para o cargo: {target}</p>
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
                <p className="text-xs text-slate-500 mt-2">{competency.description}</p>
              </div>
            );
          })}
        </div>

        <textarea
          className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3"
          rows={3}
          placeholder="Objetivos de aprendizagem (opcional): ex. preparação para assumir função de coordenação."
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
