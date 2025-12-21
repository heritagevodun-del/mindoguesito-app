'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, append, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const suggestedQuestions = [
    "🌿 Le Vodun est-il une religion de paix ?",
    "🏛️ Pourquoi Ouidah est la 'Rome' du Vodun ?",
    "⛓️ Raconte-moi la Porte du Non-Retour",
    "🐍 Que symbolise le Python Sacré ?",
  ];

  return (
    <div className="flex flex-col h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="fixed top-0 w-full bg-[#FDFBF7]/90 backdrop-blur-md border-b border-amber-100 z-10 p-4 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-serif font-bold text-amber-900 tracking-wide">
            Mindoguesito <span className="text-xs font-sans font-normal text-amber-600 block sm:inline opacity-80">| Le Sage de Ouidah</span>
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pt-24 pb-32 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-8 mt-10">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-200">
                  <span className="text-3xl">🧘🏾‍♂️</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-amber-950">Dola ! (Bienvenue)</h2>
                <p className="text-gray-600 max-w-md mx-auto leading-relaxed">Je suis le gardien de la mémoire Vodun.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {suggestedQuestions.map((question, index) => (
                  <button key={index} onClick={() => append({ role: 'user', content: question })} className="p-4 bg-white border border-amber-100 rounded-xl text-left text-sm text-amber-900 hover:bg-amber-50 transition-all shadow-sm">
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-5 shadow-sm leading-relaxed ${m.role === 'user' ? 'bg-amber-900 text-white rounded-br-none' : 'bg-white border border-amber-50 text-gray-800 rounded-bl-none'}`}>
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-amber-500 text-sm animate-pulse ml-4">Le Sage réfléchit...</div>}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7] to-transparent pt-10 pb-6 px-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="relative shadow-lg rounded-full">
            <input className="w-full p-4 pl-6 pr-12 bg-white border border-amber-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500" value={input} placeholder="Interrogez la sagesse de Ouidah..." onChange={handleInputChange} />
            <button type="submit" aria-label="Envoyer" disabled={isLoading || !input.trim()} className="absolute right-2 top-2 p-2 bg-amber-900 text-white rounded-full hover:bg-amber-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" /></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}