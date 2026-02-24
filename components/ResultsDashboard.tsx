import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { COMPETENCIES } from '../constants';
import { RecommendationResult } from '../types';

interface ResultsDashboardProps {
  result: RecommendationResult;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, onReset }) => {
  const gapData = COMPETENCIES.map((competency) => ({
    name: competency.name,
    gap: result.gaps[competency.id] ?? 0,
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Recomendações personalizadas</h2>
          <p className="text-slate-500">
            Perfil: {result.role.label} • {result.input.campus} / {result.input.unit}
          </p>
        </div>
        <button onClick={onReset} className="flex items-center gap-2 text-blue-600 font-medium hover:underline">
          <ArrowLeft className="w-4 h-4" /> Nova análise
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Lacunas por competência</h3>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gapData} margin={{ top: 5, right: 20, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-20} textAnchor="end" height={90} interval={0} tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="gap" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Top cursos recomendados</h3>
        {result.recommendations.map((item, idx) => (
          <div key={item.course.id} className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-blue-700">#{idx + 1} recomendação • score {item.score.toFixed(1)}</p>
                <h4 className="text-lg font-semibold text-slate-900">{item.course.title}</h4>
                <p className="text-sm text-slate-500">
                  {item.course.modality} • {item.course.workloadHours}h • nível {item.course.level}
                </p>
              </div>
            </div>
            <ul className="mt-3 text-sm text-slate-700 list-disc pl-5 space-y-1">
              {item.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
