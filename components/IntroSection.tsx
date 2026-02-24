import React from 'react';
import { ArrowRight, Brain, ListChecks, Target } from 'lucide-react';

interface IntroSectionProps {
  onStart: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onStart }) => {
  return (
    <section className="space-y-8 animate-fade-in">
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8">
        <p className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 mb-4">
          Protótipo de pesquisa • Recomendação por competências
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          Sistema de recomendação de cursos para técnicos e analistas da UNEB
        </h2>
        <p className="text-slate-600 mt-4 text-lg max-w-3xl">
          Em vez de questionário genérico, este fluxo usa competências esperadas por cargo/função,
          compara com o nível atual informado e gera recomendações de cursos com justificativa.
        </p>

        <button
          onClick={onStart}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition-colors"
        >
          Iniciar análise de competências
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <ListChecks className="h-6 w-6 text-blue-700 mb-3" />
          <h3 className="font-semibold text-slate-800">Matriz por cargo</h3>
          <p className="text-sm text-slate-600 mt-2">Define nível esperado para cada competência crítica.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <Brain className="h-6 w-6 text-blue-700 mb-3" />
          <h3 className="font-semibold text-slate-800">Motor de recomendação</h3>
          <p className="text-sm text-slate-600 mt-2">Prioriza cursos que fecham as maiores lacunas.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <Target className="h-6 w-6 text-blue-700 mb-3" />
          <h3 className="font-semibold text-slate-800">Trilha personalizada</h3>
          <p className="text-sm text-slate-600 mt-2">Entrega ranking de cursos com explicabilidade.</p>
        </div>
      </div>
    </section>
  );
};
