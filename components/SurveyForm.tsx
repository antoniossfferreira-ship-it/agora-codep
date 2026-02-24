import React, { useState } from 'react';
import { TRAINING_AXES, METHODOLOGIES } from '../constants';
import { SurveyResponse } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface SurveyFormProps {
  onComplete: (response: SurveyResponse) => void;
}

const initialState: SurveyResponse = {
  department: '',
  campus: '',
  role: '',
  selectedTopics: [],
  customSuggestions: '',
  preferredMethodologies: [],
};

export const SurveyForm: React.FC<SurveyFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<SurveyResponse>(initialState);

  const toggleTopic = (topic: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTopics: prev.selectedTopics.includes(topic)
        ? prev.selectedTopics.filter((t) => t !== topic)
        : [...prev.selectedTopics, topic],
    }));
  };

  const toggleMethodology = (methodology: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredMethodologies: prev.preferredMethodologies.includes(methodology)
        ? prev.preferredMethodologies.filter((m) => m !== methodology)
        : [...prev.preferredMethodologies, methodology],
    }));
  };

  const canSubmit =
    formData.department.trim() &&
    formData.campus.trim() &&
    formData.role.trim() &&
    formData.selectedTopics.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onComplete(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-slate-900">Questionário de necessidades formativas</h2>
        <p className="text-slate-600 mt-2">
          Preencha os campos abaixo para sugerir prioridades de capacitação para o PAC 2026.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <input
          className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Setor/Departamento"
          value={formData.department}
          onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
        />
        <input
          className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Campus"
          value={formData.campus}
          onChange={(e) => setFormData((prev) => ({ ...prev, campus: e.target.value }))}
        />
        <input
          className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Cargo/Função"
          value={formData.role}
          onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Selecione os temas prioritários</h3>
        <div className="space-y-5">
          {TRAINING_AXES.map((axis) => (
            <div key={axis.id}>
              <p className="font-medium text-slate-700">{axis.title}</p>
              <div className="mt-2 grid md:grid-cols-2 gap-2">
                {axis.topics.map((topic) => {
                  const selected = formData.selectedTopics.includes(topic);
                  return (
                    <button
                      type="button"
                      key={topic}
                      onClick={() => toggleTopic(topic)}
                      className={`text-left rounded-lg border px-3 py-2 text-sm transition-colors ${
                        selected
                          ? 'border-blue-300 bg-blue-50 text-blue-900'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Metodologias preferidas</h3>
        <div className="flex flex-wrap gap-2">
          {METHODOLOGIES.map((method) => {
            const selected = formData.preferredMethodologies.includes(method);
            return (
              <button
                type="button"
                key={method}
                onClick={() => toggleMethodology(method)}
                className={`rounded-full px-4 py-2 text-sm border ${
                  selected
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-slate-300 text-slate-700'
                }`}
              >
                {method}
              </button>
            );
          })}
        </div>

        <textarea
          className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows={4}
          placeholder="Sugestões adicionais de cursos, temas ou necessidades do setor..."
          value={formData.customSuggestions}
          onChange={(e) => setFormData((prev) => ({ ...prev, customSuggestions: e.target.value }))}
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-800 transition-colors"
      >
        <CheckCircle2 className="h-5 w-5" />
        Enviar e visualizar parcial
      </button>
    </form>
  );
};
