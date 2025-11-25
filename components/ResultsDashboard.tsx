import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_STATS_AXES, MOCK_STATS_METHODOLOGY } from '../constants';
import { ArrowLeft } from 'lucide-react';

interface ResultsDashboardProps {
  onReset: () => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ onReset }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h2 className="text-3xl font-bold text-slate-900">Parcial de Resultados</h2>
           <p className="text-slate-500">Tendências identificadas para o PAC 2026 até o momento.</p>
        </div>
        <button onClick={onReset} className="flex items-center gap-2 text-blue-600 font-medium hover:underline">
          <ArrowLeft className="w-4 h-4" /> Voltar ao Início
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Chart 1: Axes of Interest */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Interesse por Eixo Temático</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MOCK_STATS_AXES}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={120} 
                  tick={{fontSize: 12}} 
                  interval={0}
                />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" fill="#1e3a8a" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Methodology Preference */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Preferência de Metodologia</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_STATS_METHODOLOGY}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {MOCK_STATS_METHODOLOGY.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {MOCK_STATS_METHODOLOGY.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-bold text-blue-900 mb-2">Próximos Passos (Cronograma)</h4>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="block font-bold text-blue-800">Jan-Fev</span>
            <span className="text-blue-600">Diagnóstico e Consulta</span>
          </div>
          <div>
            <span className="block font-bold text-blue-800">Março</span>
            <span className="text-blue-600">Construção da Matriz</span>
          </div>
          <div>
            <span className="block font-bold text-blue-800">Abr-Nov</span>
            <span className="text-blue-600">Execução das Capacitações</span>
          </div>
          <div>
            <span className="block font-bold text-blue-800">Dezembro</span>
            <span className="text-blue-600">Relatório Final</span>
          </div>
        </div>
      </div>
    </div>
  );
};