import React from 'react';
import { ArrowRight, ClipboardList, Target, Users } from 'lucide-react';

interface IntroSectionProps {
  onStart: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onStart }) => {
  return (
    <section className="space-y-8 animate-fade-in">
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8">
        <p className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 mb-4">
          Consulta pública • PAC 2026
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          Apoie a construção das trilhas de formação da UNEB
        </h2>
        <p className="text-slate-600 mt-4 text-lg max-w-3xl">
          Este protótipo coleta prioridades de capacitação para servidores técnico-administrativos
          (Técnico e Analista Universitário), apoiando formações mais aderentes às necessidades
          reais das unidades.
        </p>

        <button
          onClick={onStart}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition-colors"
        >
          Iniciar questionário
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <ClipboardList className="h-6 w-6 text-blue-700 mb-3" />
          <h3 className="font-semibold text-slate-800">Diagnóstico participativo</h3>
          <p className="text-sm text-slate-600 mt-2">Mapeie lacunas de competências por setor e função.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <Target className="h-6 w-6 text-blue-700 mb-3" />
          <h3 className="font-semibold text-slate-800">Planejamento focado</h3>
          <p className="text-sm text-slate-600 mt-2">Priorize cursos alinhados ao PDI e às metas institucionais.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <Users className="h-6 w-6 text-blue-700 mb-3" />
          <h3 className="font-semibold text-slate-800">Formação em serviço</h3>
          <p className="text-sm text-slate-600 mt-2">Fortaleça a atuação cotidiana com trilhas formativas aplicáveis.</p>
        </div>
      </div>
    </section>
  );
};
