import React, { useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { IntroSection } from './components/IntroSection';
import { SurveyForm } from './components/SurveyForm';
import { ResultsDashboard } from './components/ResultsDashboard';

function MainApp() {
  const [viewState, setViewState] = useState<'intro' | 'survey' | 'results'>('intro');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <AppHeader />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          {viewState === 'intro' && (
            <IntroSection onStart={() => setViewState('survey')} />
          )}

          {viewState === 'survey' && (
            <SurveyForm onComplete={() => setViewState('results')} />
          )}

          {viewState === 'results' && (
            <ResultsDashboard onReset={() => setViewState('intro')} />
          )}

        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2024 Universidade do Estado da Bahia - UNEB. Todos os direitos reservados.</p>
          <p className="mt-2">Sistema de Apoio à Gestão de Pessoas - Desenvolvimento Organizacional</p>
        </div>
      </footer>
    </div>
  );
}

export default MainApp;