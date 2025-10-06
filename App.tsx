
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UrlInputForm } from './components/UrlInputForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { fetchWebsiteAnalysis } from './services/geminiService';
import type { AnalysisResponse } from './types';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!url) {
      setError('Please enter a valid website URL.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await fetchWebsiteAnalysis(url);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the website. The AI may be busy or the URL is inaccessible. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <Header />
        <main className="mt-8">
          <UrlInputForm url={url} setUrl={setUrl} onSubmit={handleSubmit} isLoading={isLoading} />
          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
          {isLoading && <LoadingSpinner />}
          {analysis && !isLoading && <AnalysisDisplay analysis={analysis} />}
        </main>
      </div>
       <footer className="w-full max-w-5xl mx-auto mt-16 py-4 text-center text-gray-500 text-sm">
          <p>Powered by Gemini. Designed for visionary creators.</p>
        </footer>
    </div>
  );
};

export default App;
